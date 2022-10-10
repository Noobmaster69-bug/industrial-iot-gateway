## Table of Contents

- [Introduction](#introduction)
  - [Feature](#feature)
  - [Supported function](#supported-function)
- [Requirement](#requirement)
- [Installation Guide](#installation-guide)
- [APIs](#apis)

---

# Introduction

ds-modbus stand for device service modbus. This service provide RESTfuls API to communicate with modbus devices.

## Feature:

- Faster read with auto grouping consecutives address register.
- Tranform data from raw buffer to its data type.
- ModbusRTU:

  - List serial ports.
  - Modbus commands will exec faster by holding serial port opening. You can set holding time by setting env.
  - Queue commands

- ModbusTCP:

  - Cache TCP connection

## Supported function:

- [ ] Read Coil (fc = 01)
- [ ] Read Discrete Input (fc = 02)
- [x] Read Holding Registers (fc = 03)
- [ ] Read Input Registers (fc = 04)
- [ ] Write Single Coil (fc = 05)
- [ ] Write Single Holding Register (fc = 06)
- [ ] Write Multiple Coils (fc = 15)
- [ ] Write Multiple Holding Registers (fc = 16)

# Requirement:

## Development enviroment:

- node v14 lts or above
- [optional] docker for build executable file

## Production enviroment

### For index.js

Same as development enviroment

### For executable file

- glibc 2.29 or above
- glibcxx 3.4.26 or above

# Installation Guide

## Development enviroment:

```bash
npm run setup
```

## Production enviroment:

Change target attribute of pkg property in package.json

```json
    "targets": [
      "node16-[os]-[target]"
    ],
```

Then run

```bash
npm run build
```

### Output:

Output file will be placed at dist folder.
There are two file will be exported:

- executable file: You can run this file without installling node js
- .tar.gz: the compressed project folder, you can run app after uncompresse this file with `node index.js` command in case of executable can not run. However, nodejs is required.

### OS list:

- linux
- win
- macos
- alpine
- linuxstatic

### Target list:

- x64
- arm64
- armv7 (best effort version)
- armv6 (not recommended)

# Deploying Guide

See list below

- [Moxa Deploying Guide](docs/deploying/moxa.md)

# APIs:

## Status:

### Request:

- URL:

  ```http
  GET /status
  ```

### Responce:

| Status | Body | Description          |
| :----- | :--- | :------------------- |
| 200    |      | ds-modbus is running |

## Serial Port:

### Request:

- URL:

  ```http
  GET /RTU/SerialPort
  ```

### Responce:

| Status | Body    | Description      |
| :----- | :------ | :--------------- |
| 200    | `array` | Serial Port list |

- Body:

  ```javascript
  [
    {
      path: string,
      manufacturer: string,
      pnpId: string,
      vendorId: string,
      productionId: string,
    },...
  ];
  ```

## Modbus RTU:

### Request:

- url:

  ```http
  POST /RTU
  ```

- body:
  | Property | Description |
  | :-------- | :-------------------- |
  | slaveID | |
  | path | path to serial port |
  | baudRate | |
  | parity | `none`, `even`, `odd` |
  | stopBits | `8` |
  | startBits | `1`, `1.5`, `2` |
  | channels | array of channels |
  | other | other properties |

  **Channels:**

  ```javascript
  [
    {
      name: string,
      addr: number,
      dataType: string,
      fc: string, // `03`
      ...others: object
    },
  ];
  ```

### Responce:

| Status | Body                                                                                                                                         | Description |
| :----- | :------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| `200`  | `Modbus Data`                                                                                                                                |             |
| `408`  | Device has disconnected                                                                                                                      |             |
| `400`  | `Modbus Error `                                                                                                                              |             |
| `503`  | "Permission denied,run sudo chmod 666 `path`. <br /> For more detail, please search about how to <br /> gain serialport permission on linux" |             |

**Modbus Data:**

```javascript
  {
    name: string //device name
    ...other_properties : object // other properties in request
    channels : [
      {
        name: string //channel name
        data: number/string
        ...other: object //others in request
      }
    ]
  }
```

**Modbus Error:**

| Body                                          | Code |
| :-------------------------------------------- | :--- |
| Illegal Function                              | 1    |
| Illegal Data Address                          | 2    |
| Illegal Data Value                            | 3    |
| Slave Device Failure                          | 4    |
| Acknowledge                                   | 5    |
| Slave Device Busy                             | 6    |
| Negative Acknowledge                          | 7    |
| Memory Parity Error                           | 8    |
| Gateway Path Unavailable                      | 10   |
| Gateway Target Device Failed <br/> to Respond | 11   |
