use swc_core::{
    common::{util::take::Take, Span, Spanned},
    ecma::{
        ast::{
            Expr, Ident, JSXAttr, JSXAttrName, JSXAttrOrSpread, JSXAttrValue, JSXClosingFragment,
            JSXElement, JSXElementChild, JSXElementName, JSXExpr, JSXExprContainer, JSXFragment,
            JSXOpeningFragment, KeyValueProp, Lit, ObjectLit, Prop, PropName, PropOrSpread,
        },
        visit::{VisitMut, VisitMutWith},
    },
};
use tracing::debug;
pub struct ReactSlotVisitor;

impl VisitMut for ReactSlotVisitor {
    fn visit_mut_jsx_element(&mut self, element: &mut JSXElement) {
        element.visit_mut_children_with(self);
        for slot in Slot::extract_slots(element) {
            let attr = element.opening.attrs.iter_mut().find_map(|attr| {
                if let JSXAttrOrSpread::JSXAttr(attr) = attr {
                    if let JSXAttrName::Ident(attr_name) = &attr.name {
                        if attr_name.sym.to_string() == slot.name {
                            return Some(attr);
                        }
                    }
                }
                None
            });
            if let Some(attr) = attr {
                attr.value = slot.into_jsx_attr().value;
            } else {
                element
                    .opening
                    .attrs
                    .push(JSXAttrOrSpread::JSXAttr(slot.into_jsx_attr()));
            }
        }
    }
}

struct Slot {
    name: String,
    fragment: JSXFragment,
}

impl Slot {
    pub fn extract_slots(element: &mut JSXElement) -> Vec<Self> {
        element
            .children
            .extract_if(|child| {
                if let JSXElementChild::JSXElement(slot) = child {
                    Slot::is_slot(slot)
                } else {
                    false
                }
            })
            .map(|slot| {
                if let JSXElementChild::JSXElement(slot) = slot {
                    Slot::try_new(&slot).unwrap_or_else(|| {
                        panic!("failed to convert slot element to slot struct: {:#?}", slot)
                    })
                } else {
                    panic!("failed to convert slot element to slot struct: {:#?}", slot)
                }
            })
            .collect::<Vec<_>>()
    }
    pub fn is_slot(element: &JSXElement) -> bool {
        if let JSXElementName::Ident(name) = &element.opening.name {
            if name.sym.to_string() == "slot" {
                for attr in element.opening.attrs.iter() {
                    if let JSXAttrOrSpread::JSXAttr(attr) = attr {
                        if let JSXAttrName::Ident(name) = &attr.name {
                            if name.sym.to_string() == "name" {
                                return true;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        false
    }
    pub fn try_new(element: &JSXElement) -> Option<Self> {
        Some(Self {
            name: Self::get_slot_name(element)?,
            fragment: JSXFragment {
                span: element.span(),
                children: element.children.clone(),
                opening: JSXOpeningFragment {
                    span: element.opening.span(),
                },
                closing: JSXClosingFragment {
                    span: element.closing.span(),
                },
            },
        })
    }
    /**
     * converts a slot element (<slot name="content">content</slot>)
     * to a jsx attribute equivalent (content={{children: <>content</>}})
     */
    pub fn into_jsx_attr(self) -> JSXAttr {
        JSXAttr {
            span: self.fragment.span(),
            name: JSXAttrName::Ident(Ident::new(self.name.into(), Span::dummy())),
            value: Some(JSXAttrValue::JSXExprContainer(JSXExprContainer {
                span: Span::dummy(),
                expr: JSXExpr::Expr(Box::new(Expr::Object(ObjectLit {
                    span: Span::dummy(),
                    props: vec![PropOrSpread::Prop(Box::new(Prop::KeyValue(KeyValueProp {
                        key: PropName::Ident(Ident::new("children".into(), Span::dummy())),
                        value: Box::new(Expr::JSXFragment(self.fragment)),
                    })))],
                }))),
            })),
        }
    }
    fn get_slot_name(slot: &JSXElement) -> Option<String> {
        if let Some(name) = slot.opening.attrs.iter().find_map(|attr| {
            if let JSXAttrOrSpread::JSXAttr(JSXAttr {
                name: JSXAttrName::Ident(name),
                value: Some(JSXAttrValue::Lit(Lit::Str(value))),
                ..
            }) = attr
            {
                if name.sym.to_string() == "name" {
                    return Some(value.clone().value.to_string());
                }
            }
            None
        }) {
            return Some(name);
        }
        None
    }
}
