# NestLogify

![Node.js version](https://img.shields.io/node/v/@mayunaikwadi/nestlogify)
![NPM version](https://img.shields.io/npm/v/@mayunaikwadi/nestlogify)
![License](https://img.shields.io/npm/l/@mayunaikwadi/nestlogify)

NestLogify is a highly customizable and versatile logger module designed for NestJS, offering seamless integration with both Pino and Winston logging libraries. It empowers developers to implement structured and efficient logging within their NestJS applications, enhancing observability and debugging with minimal effort. The module operates based on two key parameters: ```logProvider```, which specifies the provider ('pino' or 'winston'), and ```logExporter```, which determines how logs are exported ('file', 'console', or 'both'), making it a flexible solution for advanced log management.

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
npm install @mayunaikwadi/nestlogify
```

## Usage
To use the logger in your NestJS application, follow these steps:

Importing the Logger Module
Import the LoggerModule in your application's main module (e.g., ```AppModule```).

```bash
import { Module } from '@nestjs/common';
import { LoggerModule } from '@mayunaikwadi/nestlogify';

@Module({
  imports: [
    // Use 'winston' for Winston logger and logExporter - 'file' | 'console' | 'both'
    LoggerModule.forRoot({ logProvider : 'pino', logExporter : 'both' }),  
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
import { LoggerModule } from '@mayunaikwadi/nestlogify';

@Module({
  imports: [
    // Set the logExporter value to either 'file', 'console', or 'both'.
    LoggerModule.forRoot({ logProvider : 'pino', logExporter : 'both' }),  
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
    // Set the logExporter value to either 'file', 'console', or 'both'.
    LoggerModule.forRoot({ logProvider : 'winston', logExporter : 'both' }),  
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
``` LoggerModule.forRoot({ logProvider : 'winston', logExporter : 'both' }), ```: Initializes the logger module with the specified logger type.

## Logger Parameters

- ``` logProvider : LoggerProvider;```  - This property specifies the provider name. It should be set to either 'pino' or 'winston'.
- ``` logExporter : LogExporter ``` - This property determines the way logs are exported. Set the value to either 'file', 'console', or 'both'.

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