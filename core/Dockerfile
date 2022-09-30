FROM tranuyson/cross-compiler:debian9.13 AS cc
COPY .. /tmp/core
WORKDIR /tmp/core
RUN npm run clean
RUN sh compile.sh
WORKDIR /tmp/
RUN tar -zcvf core.tar.gz core
RUN ls /tmp/core/dist/
FROM scratch AS export-stage
COPY --from=cc /tmp/core/dist/core core 
COPY --from=cc /tmp/core.tar.gz core.tar.gz