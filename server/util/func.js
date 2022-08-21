const db = require("../models/db");

async function generateURL() {
  // Generate 4 letter random string
  let url = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < 4; i++) {
    url += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  // Fetch from db if already exists
  const link = await db.link.findOne({
    where: { url },
  });
  if (link) {
    return await generateURL();
  }
  return url;
}

function sortFunc(a, b) {
  if (a.confidence < b.confidence) {
    return 1;
  }
  if (a.confidence > b.confidence) {
    return -1;
  }
  return 0;
}

module.exports.generateURL = generateURL;
module.exports.sortFunc = sortFunc;