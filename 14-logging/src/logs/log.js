import logger from "./winston.js";

const logProcess = (req, res, next) => {
  // console.log({
  //   method: req.method,
  //   url: req.url,
  //   path: req.path,
  // });

  logger.error("Ini adalah Error");
  logger.warn("Ini adalah Warn");
  logger.info("Ini adalah Info");
  logger.http("ini adalah http");
  logger.verbose("Ini adalah verbose");
  logger.debug("Ini adalah debug");
  logger.silly("Ini adalah silly");
  next();
};

export default logProcess;
