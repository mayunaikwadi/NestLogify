# NestLogify

![Node.js version](https://img.shields.io/node/v/nestlogify)
![NPM version](https://img.shields.io/npm/v/nestlogify)
![License](https://img.shields.io/npm/l/nestlogify)

A NestLogify is customizable logger module for NestJS that supports both Pino and Winston logging. This package allows you to easily integrate structured logging into your NestJS applications.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Examples](#examples)
- [API Reference](#api-reference)
- [License](#license)

## Features

- Supports two popular logging libraries: Pino and Winston.
- Configurable logging destinations (console, files).
- Daily log rotation for file logs.
- Simple integration into NestJS applications.
- Type-safe logger interface.

## Installation

To install the package, run the following command:

```bash
npm install nestlogify
```

## Usage
To use the logger in your NestJS application, follow these steps:

Importing the Logger Module
Import the LoggerModule in your application's main module (e.g., ```AppModule```).

```bash
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestlogify';

@Module({
  imports: [
    LoggerModule.forRoot('pino'), // Use 'winston' for Winston logger
  ],
})
export class AppModule {}
```

### Injecting the Logger Service

You can inject the logger service into your services or controllers.

```bash
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('LOGGER_SERVICE') private logger) {}

  getHello(): string {
    this.logger.log('Hello World logged');
    return 'Hello World!';
  }
}
```

## Configuration

You can configure the logger module by passing either 'pino' or 'winston' as a parameter to ```forRoot()```

## Examples

### Pino Logger Example

```bash
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestlogify';

@Module({
  imports: [
    LoggerModule.forRoot('pino'), // Use Pino logger
  ],
})
export class AppModule {}

```

### Winston Logger Example


```bash
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestlogify';

@Module({
  imports: [
    LoggerModule.forRoot('winston'), // Use winston logger
  ],
})
export class AppModule {}

```

## Logging Messages in Services
Here’s how to use the logger in a service:

```bash
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('LOGGER_SERVICE') private logger) {}

  performAction(): void {
    this.logger.log('Performing an action...');
    // Log an error
    this.logger.error('An error occurred');
    // Log a warning
    this.logger.warn('This is a warning');
  }
}
```
## API Reference
Logger Module
```LoggerModule.forRoot(type: 'pino' | 'winston')```: Initializes the logger module with the specified logger type.

## Logger Interface
The logger interface supports the following methods:

- ```log(message: string): void:``` Logs an informational message.
- ```error(message: string): void:``` Logs an error message.
- ```warn(message: string): void:``` Logs a warning message.
- ```info(message: string): void:``` Logs a generic informational message.
- ```debug(message: string): void:``` Logs a debug message 
- ```verbose(message: string): void:``` Logs a verbose message 

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any feature requests or bugs.