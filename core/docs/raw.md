# DownServices

Down Services are services which provide apis to communicate with devices in real world. A down service will take request from core device and excecute, respone to the request.

There are two kind of request:

1. **Command**

   These requests are sent periodly by `core` and ask `down service` to read data from sensors or control actuators. Reading data from sensor will be name as `get command` or `set` and Controlling actuators will be name as `set command` or `set`. One `down service` should have only one `set command` and `one get command`

2. **Get somes kind of infomation**

   These requests are sent by core while user are configuring gateway. to get infomation about configuration such as list com port, etc.

Down Service can be managed by `core` via `pm2` or run manually by user.

```javascript
const downService = {
  name: STRING,
  script: STRING,
  cwd: STRING,
  out_file: STRING,
  error_file: STRING,
  isManaged: BOOLEAN,
  APIs: [API],
};
```
