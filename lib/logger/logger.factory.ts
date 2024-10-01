import { Injectable } from '@nestjs/common';
import { PinoLoggerService } from './pino-logger.service';
import { WinstonLoggerService } from './winston-logger.service';
import { ILogger } from './logger.interface';

@Injectable()
export class LoggerFactory {
  static createLogger(loggerType: 'pino' | 'winston'): ILogger {
    switch (loggerType) {
      case 'pino':
        return new PinoLoggerService();
      case 'winston':
        return new WinstonLoggerService();
      default:
        throw new Error('Invalid logger type');
    }
  }
}
