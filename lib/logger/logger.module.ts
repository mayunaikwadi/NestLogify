import { DynamicModule, Module } from '@nestjs/common';
import { LoggerFactory } from './logger.factory';
import { ILogger, LoggerOptions } from './logger.interface';

@Module({})
export class LoggerModule {
  static forRoot(loggerOptions : LoggerOptions): DynamicModule {
    const loggerService = LoggerFactory.createLogger(loggerOptions);

    return {
      module: LoggerModule,
      providers: [
        {
          provide: 'LOGGER_SERVICE',
          useValue: loggerService,
        },
      ],
      exports: ['LOGGER_SERVICE'],
    };
  }
}
