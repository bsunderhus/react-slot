use crate::slot::JSXSlotElement;
use swc_core::{
    common::errors::HANDLER,
    ecma::{
        ast::*,
        visit::{VisitMut, VisitMutWith},
    },
};

pub struct ReactSlotVisitor;

impl ReactSlotVisitor {
    pub fn new() -> Self {
        Self
    }
}

impl VisitMut for ReactSlotVisitor {
    fn visit_mut_jsx_element(&mut self, element: &mut JSXElement) {
        element.visit_mut_children_with(self);

        element.children.retain(|child| {
            if let JSXElementChild::JSXElement(child) = child {
                if !JSXSlotElement::is_jsx_slot_element(child) {
                    return true;
                }
                match JSXSlotElement::try_from(child.clone()) {
                    Ok(slot) => {
                        element.opening.attrs.push(slot.into());
                    }
                    Err(error_string) => {
                        HANDLER.with(|handler| {
                            handler.struct_span_err(child.span, &error_string).emit();
                        });
                    }
                }
                return false;
            }
            true
        });
    }
}
