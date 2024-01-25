use std::path::PathBuf;
use swc_core::ecma::{transforms::testing::test_fixture, visit::as_folder};
use swc_ecma_parser::{Syntax, TsConfig};
use swc_plugin_react_slot::*;

#[testing::fixture("tests/fixture/**/input.tsx")]
fn fixture_swc(input: PathBuf) {
    let output = input.parent().unwrap().join("output.tsx");

    test_fixture(
        Syntax::Typescript(TsConfig {
            tsx: true,
            decorators: false,
            dts: false,
            no_early_errors: true,
            disallow_ambiguous_jsx_like: true,
        }),
        &|_| as_folder(ReactSlotVisitor),
        &input,
        &output,
        Default::default(),
    );
}
