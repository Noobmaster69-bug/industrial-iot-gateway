export const upProtocol = {
  mqtt: [
    { name: "host", default: "", isAdvance: false },
    { name: "port", default: "", isAdvance: false },
    { name: "qos", default: 2, isAdvance: false },
    { name: "protocol", default: "", isAdvance: true },
    { name: "wsOption", default: "", isAdvance: true },
    { name: "keepalive", default: "", isAdvance: true },
    { name: "reschedulePings", default: "", isAdvance: true },
    { name: "reconnectPeriod", default: "", isAdvance: true },
    { name: "connectTimeout", default: "", isAdvance: true },
    { name: "username", default: "", isAdvance: true },
    { name: "password", default: "", isAdvance: true },
    { name: "queueQoZero", default: "", isAdvance: true },
  ],
};
export const downProtocol = {
  modbusRTU: [
    { name: "path", default: "", isAdvance: false },
    { name: "unitId", default: "", isAdvance: false },
    { name: "baudRate", default: "", isAdvance: false },
    { name: "parity", default: "", isAdvance: false },
    { name: "stopBits", default: "", isAdvance: true },
    { name: "dataBits", default: "", isAdvance: true },
  ],
  modbusTCP: [
    { name: "host", default: "", isAdvance: false },
    { name: "port", default: "", isAdvance: false },
    { name: "unitId", default: "", isAdvance: false },
  ],
};
