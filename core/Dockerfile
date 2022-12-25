FROM tranuyson/cross-compiler:debian9.13 AS cc

COPY .. /tmp/core
WORKDIR /tmp/core

RUN export AR=\"arm-linux-gnueabihf-ar\" && export CC=\"arm-linux-gnueabihf-gcc\" && export CXX=\"arm-linux-gnueabihf-g++\" &&export LINK=\"arm-linux-gnueabihf-g++\"&&npm install --build-from-source --target_arch=arm --omit=dev
RUN pkg . --no-bytecode --public-packages "*" --public -d


FROM scratch AS export-stage
COPY --from=cc /tmp/core/build/out/core core 