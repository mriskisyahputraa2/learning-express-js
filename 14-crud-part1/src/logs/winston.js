import winston from "winston"; // import winston library utama untuk logging
import "winston-daily-rotate-file"; // untuk transportasi file log baru setiap hari/setiap saat

// konfigurasi transportasi DailyRotateFile, untuk menyimpan log ke file yang berotasi setiap jam
const transportsDailyRotateFile = new winston.transports.DailyRotateFile({
  level: "silly", // menentukan level log terendah yaitu silly
  filename: "./logs/app-%DATE%.log", // Format nama file untuk file log, menggunakan placeholder %DATE% yang akan digantikan dengan tanggal.
  datePattern: "YYYY-MM-DD-HH", // Pola tanggal untuk mengganti %DATE% dalam nama file.
  zippedArchive: true, //  Log akan diarsipkan dalam format zip.
  maxSize: "1m", // Ukuran maksimal file log adalah 1MB.
  maxFiles: "14d", // Log akan disimpan maksimal selama 14 hari.
  handleExceptions: true,
});

// membuat logger dengan winston
const logger = winston.createLogger({
  level: "silly", // Logger ini akan mencatat semua pesan log dari level silly ke atas.
  //  Menggabungkan beberapa format log seperti JSON, timestamp, label, dan string yang diformat.
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

  // menentukan tempat log yg akan disimpan
  transports: [
    // new winston.transports.Console({
    //   level: "silly",
    //   format: winston.format.combine(winston.format.colorize({ all: true })),
    // }),

    // File transportasi menyimpan log ke file ./logs/app.log
    new winston.transports.File({
      handleExceptions: true, // jika ada kesalahan akan memunculkan pesan error
      level: "silly",
      filename: "./logs/app.log",
    }),

    // dan ./logs/app-error.log.
    new winston.transports.File({
      handleExceptions: true,
      level: "error",
      filename: "./logs/app-error.log",
    }),
    transportsDailyRotateFile, //  Menyimpan log harian yang berputar.
    // new winston.transports.MongoDB({
    //   level: "error",
    //   db: await Promise.resolve(client),
    //   collection: "logs",
    //   capped: true,
    // }),

    // Transportasi kustom yang mencetak log ke console.
    new MyClass({
      level: "silly",
      format: winston.format.combine(winston.format.colorize({ all: true })), // kombinasi data log yang masuk dengan menambahkan warna
    }),
  ],
});

export default logger;
