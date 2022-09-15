module.exports = (sequelize) => {
  const bcrypt = require("bcrypt");
  return {
    async create(accounts) {
      const { Accounts } = sequelize.models;
      try {
        await Accounts.create(accounts);
      } catch (err) {
        throw err;
      }
    },
    async validator({ userName, password }) {
      const { Accounts } = sequelize.models;
      try {
        const user = await Accounts.findOne({
          where: {
            userName,
          },
        });
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            return user;
          } else {
            throw new Error("Incorrect username or password");
          }
        } else {
          throw new Error("Incorrect username or password");
        }
      } catch (err) {
        throw err;
      }
    },
    async getUserbyId(id) {
      const { Accounts } = sequelize.models;
      try {
        const user = await Accounts.findByPk(id);
        return user;
      } catch (err) {
        throw err;
      }
    },
  };
};
