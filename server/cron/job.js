const { schedule } = require("node-cron");
const db = require("../models/db");

const deletion = schedule("0 0 * * *", async () => {
  try {
    console.log("Job is running every day at midnight");
    const links = await db.link.findAll({
      where: {
        userId: null,
      },
    });
    const ids = links.map((link) => link.id);
    await db.link.destroy({ where: { id: ids } });
    console.log("Deleted links at", new Date().toString());
  } catch (e) {
    console.error("Something went wrong, Cron stopped working", e);
    deletion.stop();
  }
});
