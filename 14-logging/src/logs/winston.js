import winston from "winston";

const logger = winston.createLogger({
  level: "silly",
  format: winston.format.combine(
    winston.format.json({ space: 2 }),
    winston.format.timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    winston.format.label({ label: "[LOGGER]" }),
    winston.format.printf(
      (info) =>
        `${info.label}, ${info.timestamp}, ${info.level} : ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      level: "silly",
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({
      filename: "./log/app.log",
    }),
  ],
});

export default logger;
