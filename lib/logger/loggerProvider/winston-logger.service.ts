import { ILogger, LoggerOptions } from '../logger.interface';
import * as winston from 'winston';

// Use require for winston-daily-rotate-file
const DailyRotateFile = require('winston-daily-rotate-file');

export class WinstonLoggerService implements ILogger {
  private logger;

  constructor(loggerOptions : LoggerOptions) {

    const transports = [];
    if(loggerOptions.logExporter == 'both' || loggerOptions.logExporter == 'file'){
      const logDir = 'logs/winston';
      transports.push(...[
        new winston.transports.Console(),
        new DailyRotateFile({
          filename: `${logDir}/application-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ]);
    }else{
      transports.push(...[
        new winston.transports.Console(),
      ]);
    }

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
      ),
      transports: transports,
    });
  }

  log(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}
