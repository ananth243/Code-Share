const { ModelOperations } = require("@vscode/vscode-languagedetection");
const { generateURL, sortFunc } = require("../util/func");
const fetch = require("node-fetch");
const { createJWT, decodeJWT } = require("../util/auth");
const db = require("../models/db");

module.exports.getAllURLs = async (req, res, next) => {
  try {
    const { token: jwt } = req.headers;
    const { id } = decodeJWT(jwt, next);
    const links = await db.link.findAndCountAll({ where: { userId: id } });
    res.status(200).json({ links });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { token: access_token } = req.headers;
    const result = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );
    const { name, picture: image, email } = await result.json();
    let user = await db.user.findOne({ where: { email } });
    if (!user) {
      user = await db.user.create({ name, image, email });
    }
    const jwt = createJWT({ name, image, email, id: user.id });
    res.status(200).json({ jwt });
  } catch (error) {
    next(error);
  }
};

module.exports.addURL = async (req, res, next) => {
  try {
    let { content, jwt } = req.body;
    const url = await generateURL();
    const modulOperations = new ModelOperations();
    let result = await modulOperations.runModel(content);
    result.sort(sortFunc);
    const obj = { lang: result[0].languageId, url, code: content };
    if (jwt) {
      const { id } = decodeJWT(jwt, next);
      obj.userId = id;
    }
    await db.link.create(obj);
    res.status(200).json({ url });
  } catch (error) {
    next(error);
  }
};

module.exports.getURL = async (req, res, next) => {
    try {
      const { url } = req.params;
      const link = await db.link.findOne({
        where: { url },
      });
      if (!link){
        let error = new Error("Not found");
        error.status = 404;
        throw error;
      }
      res.status(200).json({ code: link.code, lang: link.lang });
    } catch (error) {
      next(error);
    }
  };
