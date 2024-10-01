import { ILogger, LoggerOptions } from '../logger.interface';
import pino from 'pino';
import * as fs from 'fs';
import { createStream } from 'rotating-file-stream';

export class PinoLoggerService implements ILogger {
  private logger;

  constructor(loggerOptions : LoggerOptions) {
    if(loggerOptions.logExporter == 'both' || loggerOptions.logExporter == 'file'){

      const logDir = 'logs/pino'; // Directory for Pino logs
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
  
      const rotatingStream = createStream(`pino-${this.getTimestamp}-logs.log`, {
        interval: '1d',
        compress: 'gzip',
        size: '5M',
        path: logDir,
      });

      this.logger = pino({
        level: 'info',
        timestamp: pino.stdTimeFunctions.isoTime,
        formatters: {
          level(label : string) {
            return { level: label };
          },
        }
      }, pino.multistream([
        { level: 'info', stream: process.stdout },
        { level: 'info', stream: rotatingStream },
      ]));
    }else{ //only console
      this.logger = pino({
        level: 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
        timestamp: pino.stdTimeFunctions.isoTime,
        formatters: {
          level(label : string) {
            return { level: label };
          },
        }
      })
    }
   
    
  }

  private get getTimestamp() {
    return new Date().getFullYear() + '-' + new Date().getMonth() +'-' + new Date().getDate();
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
