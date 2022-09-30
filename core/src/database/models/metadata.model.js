module.exports = (sequelize, DataTypes) => {
  sequelize.define(
    "Metadata",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kind: {
        type: DataTypes.ENUM,
        values: ["channel", "protocol"],
        allowNull: false,
        unique: "1",
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "1",
      },
      type: {
        type: DataTypes.ENUM,
        values: [
          "STRING",
          "BOOLEAN",
          "INTERGER",
          "REAL",
          "DECIMAL",
          "DATES",
          "BLOBS",
          "ENUM",
        ],
        allowNull: false,
      },
      values: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("values", JSON.stringify(value));
        },
        validate: {
          isArray(value) {
            if (this.type === "ENUM" && !Array.isArray(JSON.parse(value))) {
              throw new Error("Values of ENUM must be array");
            }
          },
        },
      },
      allowNull: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      defaultValue: {
        type: DataTypes.STRING,
      },
      unique: {
        type: DataTypes.STRING,
      },
      label: {
        type: DataTypes.STRING,
      },
      placeholder: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
