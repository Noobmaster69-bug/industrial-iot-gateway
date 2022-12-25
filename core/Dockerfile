FROM tranuyson/cross-compiler:debian9.13 AS cc


COPY .. /tmp/core
WORKDIR /tmp/core


RUN rm -r node_modules
RUN npm run setup_armhf
RUN pkg . --no-bytecode --public-packages "*" --public -d


FROM scratch AS export-stage
COPY --from=cc /tmp/core/build/out/core core 
