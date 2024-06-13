import logger from "./winston.js";

const logProcess = (req, res, next) => {
  for (let i = 0; i < 2; i++) {
    logger.error("Ini adalah Error" + i);
    logger.warn("Ini adalah Warn" + i);
    logger.info("Ini adalah Info" + i);
    logger.http("ini adalah http" + i);
    logger.verbose("Ini adalah verbose" + i);
    logger.debug("Ini adalah debug" + i);
    logger.silly("Ini adalah silly" + i);
  }

  next();
};

export default logProcess;
