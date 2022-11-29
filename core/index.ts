import logger from "logger";
logger.init().then(() => {
  logger
    .query({
      levels: ["info"],
      from: "2022-11-29T05:08:56.876Z",
      until: "2022-11-29T05:11:23.596Z",
      limit: 1,
      order: "asc",
    })
    .then((e) => console.log(e));
});
