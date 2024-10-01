import { ILogger } from './logger.interface';
import pino from 'pino';
import { createStream } from 'rotating-file-stream';
import * as path from 'path';
import * as fs from 'fs';

export class PinoLoggerService implements ILogger {
  private readonly logger;

  constructor() {
    const today = new Date();
    const dateFolderName = this.getFormattedDate(today); // e.g., '2024-10-01'
    const logDir = path.join(__dirname, `../../logs/pino/${dateFolderName}`);

    // Ensure the log directory exists
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Create a rotating log stream for daily logs
    const rotatingStream = createStream('app-logs.log', {
      interval: '1d', // rotate daily
      path: logDir,
      compress: 'gzip',
    });

    this.logger = pino(
      {
        level: 'info', // Default log level
        timestamp: pino.stdTimeFunctions.isoTime,
        formatters: {
          level(label) {
            return { level: label };
          },
        },
        // transport: {
        //   target: 'pino-pretty',
        //   options: {
        //     colorize: true,  // Enable colorized output in the terminal
        //     translateTime: 'SYS:standard',  // Human-readable timestamps
        //     ignore: 'pid,hostname',  // Fields to ignore in logs
        //   },
        // },
      },
      pino.multistream([
        { level: 'info', stream: process.stdout }, // Pretty-print logs in console
        { level: 'info', stream: rotatingStream }, // File logs    
      ])
    );
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

  // verbose(message: string): void {
  //   this.logger.verbose(message);
  // }
}
