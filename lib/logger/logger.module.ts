import { DynamicModule, Module } from '@nestjs/common';
import { LoggerFactory } from './logger.factory';
import { ILogger } from './logger.interface';

@Module({})
export class LoggerModule {
  static forRoot(type: 'pino' | 'winston'): DynamicModule {
    const loggerService = LoggerFactory.createLogger(type);

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
