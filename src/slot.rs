use swc_core::{
    common::{util::take::Take, Span, Spanned},
    ecma::ast::*,
};

#[derive(Clone, Debug)]
pub struct JSXSlotElement {
    pub name: String,
    pub fragment: JSXFragment,
    pub span: Span,
}

impl TryFrom<Box<JSXElement>> for JSXSlotElement {
    // TODO: find out how to properly do error handling in rust
    type Error = String;
    fn try_from(element: Box<JSXElement>) -> Result<Self, Self::Error> {
        Self::try_from_jsx_element(*element)
    }
}

impl Into<JSXAttr> for JSXSlotElement {
    fn into(self) -> JSXAttr {
        self.into_jsx_attr()
    }
}

impl Into<JSXAttrOrSpread> for JSXSlotElement {
    fn into(self) -> JSXAttrOrSpread {
        JSXAttrOrSpread::JSXAttr(self.into_jsx_attr())
    }
}

impl JSXSlotElement {
    /**
     * Check if the element is a slot <slot/> element.
     */
    pub fn is_jsx_slot_element(element: &JSXElement) -> bool {
        if let JSXElementName::Ident(ident) = &element.opening.name {
            ident.sym.to_string() == "slot"
        } else {
            false
        }
    }
    /// Convert a JSXSlotElement into a JSXAttr.
    ///
    /// ```jsx
    /// <slot name="foo">{children}</slot> => foo={<>{children}</>}
    /// ```
    fn into_jsx_attr(self) -> JSXAttr {
        JSXAttr {
            span: self.span,
            name: JSXAttrName::Ident(Ident::new(self.name.clone().into(), Span::dummy())),
            value: Some(JSXAttrValue::JSXExprContainer(JSXExprContainer {
                span: Span::dummy(),
                expr: JSXExpr::Expr(Box::new(Expr::JSXFragment(self.fragment))),
            })),
        }
    }
    /// Try to convert a JSXElement into a JSXSlotElement.
    ///
    /// * If the element **is not** a slot, returns an error.
    /// * If the element **is** a slot, but **does not** have a name attribute, returns an error.
    fn try_from_jsx_element(element: JSXElement) -> Result<Self, String> {
        if !Self::is_jsx_slot_element(&element) {
            return Err(String::from("Not a slot"));
        }
        Ok(Self {
            name: Self::get_name_attr_value(&element)
            .ok_or(String::from("Slot does not have a valid name attribute, provide a literal string as: name=\"slotName\""))?,
            span: element.span(),
            fragment: JSXFragment {
                span: element.span(),
                children: element.children,
                opening: JSXOpeningFragment {
                    span: element.opening.span(),
                },
                closing: JSXClosingFragment {
                    span: element.closing.span(),
                },
            }
        })
    }
    /// Get the value of the `name` attribute.
    ///
    /// ```jsx
    /// <slot name="foo"/> => Some("foo").
    /// ```
    ///
    /// At the moment this lib only supports `String` for the `name` attribute.
    ///
    /// If the `name` attribute is not found, returns None.
    fn get_name_attr_value(element: &JSXElement) -> Option<String> {
        element.opening.attrs.iter().find_map(|attr| {
            if let JSXAttrOrSpread::JSXAttr(JSXAttr {
                name: JSXAttrName::Ident(Ident { sym: name, .. }),
                value: Some(JSXAttrValue::Lit(Lit::Str(value))),
                ..
            }) = attr
            {
                if name.to_string() == "name" {
                    return Some(value.value.to_string());
                }
            }
            None
        })
    }
}
