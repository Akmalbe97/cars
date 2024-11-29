const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, prettyPrint, colorize } = format;
const path = require("path");
require('winston-mongodb');

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});



////////////////////////// Dinamik fayl yaratish 
const getLogFileName = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-log.json`;
};

/////////////////////////////////////////// Logger
const logger = createLogger({
  format: combine(
    timestamp(),
    prettyPrint(),
  ),

  //////////////////////// har birini alohida papka va faylda saqlash va dinamik nom berish
  transports: [
    new transports.Console({
      level: 'debug',
      format: colorize({all: true}),
      myFormat,
    }),
    new transports.File({
      filename: path.join(__dirname, 'error', getLogFileName()),
      level: 'error',
    }),
    new transports.File({
      filename: path.join(__dirname, 'warn', getLogFileName()),
      level: 'warn',
    }),
    new transports.File({
      filename: path.join(__dirname, 'info', getLogFileName()),
      level: 'info'
    }),
    new transports.File({
      filename: path.join(__dirname, 'debug', getLogFileName()),
      level: 'debug',
    }),

    ///////////////////////////////////////// mongoDB ga yozib qo'yish
    new transports.MongoDB({db: process.env.MONGOURI, level: 'error'})
  ]
})

module.exports = logger