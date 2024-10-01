import { Injectable } from '@nestjs/common';
import { PinoLoggerService } from './loggerProvider/pino-logger.service';
import { WinstonLoggerService } from './loggerProvider/winston-logger.service';
import { ILogger, LoggerOptions } from './logger.interface';

@Injectable()
export class LoggerFactory {
  static createLogger(loggerOptions : LoggerOptions): ILogger {
    switch (loggerOptions.logProvider) {
      case 'pino':
        return new PinoLoggerService(loggerOptions);
      case 'winston':
        return new WinstonLoggerService(loggerOptions);
      default:
        throw new Error('Invalid logger type');
    }
  }
}
