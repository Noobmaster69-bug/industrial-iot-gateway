FROM tranuyson/cross-compiler:debian9.13 AS cc
COPY .. /tmp/ds-mqtt
WORKDIR /tmp/ds-mqtt
RUN npm run clean
RUN sh compile.sh
WORKDIR /tmp/
RUN tar -zcvf DSmqtt.tar.gz ds-mqtt
FROM scratch AS export-stage
COPY --from=cc /tmp/ds-mqtt/dist/mqtt mqtt 
COPY --from=cc /tmp/DSmqtt.tar.gz mqtt.tar.gz