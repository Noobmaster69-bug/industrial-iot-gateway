module.exports = (sequelize) => {
  return {
    async create(task) {
      const { channels } = task;
      const { RecurringTasks, Channels } = sequelize.models;
      const createdTask = await RecurringTasks.create(task);
      for (const { id } of channels) {
        const channel = await Channels.findByPk(id);
        await createdTask.setChannels(channel);
      }
    },
  };
};
