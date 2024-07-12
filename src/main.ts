import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configEnvs } from './config';
import { ValidationExceptionFilter } from './filter/validation-exception.filter';
import { ConflictExceptionFilter } from './filter/conflict-exception.filter';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Loan')
    .setDescription('The Loan API description')
    .setVersion('1.0')
    .addTag('Loan')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const messages = errors.map(
          (error) =>
            `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints).join(', ')}`,
        );
        return new BadRequestException(messages);
      },
    }),
  );
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalFilters(new ConflictExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();
  await app.listen(configEnvs.port);
}
bootstrap();
