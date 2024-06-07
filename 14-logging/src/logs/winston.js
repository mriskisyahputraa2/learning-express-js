import winston from "winston";
import "winston-daily-rotate-file";

// menit 26

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
      level: "silly",
      filename: "./log/app.log",
    }),
    new winston.transports.File({
      level: "error",
      filename: "./log/app-error.log",
    }),
  ],
});

export default logger;
