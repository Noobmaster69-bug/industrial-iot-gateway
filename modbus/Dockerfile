FROM tranuyson/cross-compiler:debian9.13 AS cc
LABEL stage=builder
RUN arm-linux-gnueabihf-gcc -v
COPY .. /tmp/ds-modbus
WORKDIR /tmp/ds-modbus
RUN npm run clean
RUN sh compile.sh
RUN cat package.json | grep -A 3 "targets" | grep node | cut -d '-' -f 3| cut -d '"' -f1
WORKDIR /tmp/
RUN tar -zcvf DSmodbus.tar.gz ds-modbus
FROM scratch AS export-stage
COPY --from=cc /tmp/ds-modbus/dist/modbus modbus 
COPY --from=cc /tmp/DSmodbus.tar.gz modbus.tar.gz