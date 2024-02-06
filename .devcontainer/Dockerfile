FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | bash -s -- -y

ENV PATH="${PATH}:$HOME/.cargo/env"

RUN . "$HOME/.cargo/env" \
    && rustup install nightly \
    && rustup default nightly \
    && cargo install swc_cli \
    && rustup target add wasm32-wasi
