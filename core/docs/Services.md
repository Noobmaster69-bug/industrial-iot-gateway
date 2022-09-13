```javascript
const Services = {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  script: {
    type: STRING,
  },
  cwd: {
    type: STRING,
  },
  out_file: {
    type: STRING,
  },
  error_file: {
    type: STRING,
  },
  isManaged: {
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  type: {
    type: ENUM,
    values: ["upService", "downService"],
    allowNull: false,
  },
};
```
