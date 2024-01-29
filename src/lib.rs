#![feature(extract_if)]
mod slot;
mod visitor;

use swc_core::{
    ecma::{ast::Program, visit::VisitMutWith},
    plugin::{plugin_transform, proxies::TransformPluginProgramMetadata},
};

pub use visitor::ReactSlotVisitor;

#[plugin_transform]
fn process_transform(mut program: Program, _: TransformPluginProgramMetadata) -> Program {
    program.visit_mut_with(&mut ReactSlotVisitor::new());
    program
}
