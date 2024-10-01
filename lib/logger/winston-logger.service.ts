import { ILogger } from './logger.interface';
import { createLogger, format, transports } from 'winston';
import * as fs from 'fs';
import * as path from 'path';

// Use require for winston-daily-rotate-file
const DailyRotateFile = require('winston-daily-rotate-file');

export class WinstonLoggerService implements ILogger {
  private logger;

  constructor() {
    const today = new Date();
    const dateFolderName = this.getFormattedDate(today); // e.g., '2024-10-01'
    const logDir = path.join(__dirname, `../../logs/winston/${dateFolderName}`);

    // Ensure the log directory exists
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const customFileFormat = format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    });

    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        customFileFormat
      ),
      transports: [
        new transports.Console(),
        new DailyRotateFile({
          level: 'info',
          filename: `${logDir}/app-logs-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '5m',
          maxFiles: '14d',
        }),
      ],
    });
  }

  // Helper function to get date in 'YYYY-MM-DD' format
  private getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

  verbose(message: string): void {
    this.logger.verbose(message);
  }
}
