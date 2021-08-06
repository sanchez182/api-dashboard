import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    credentials: true,
    origin: '  https://virtual-menu.herokuapp.com/',
  });

  /*   const options = new DocumentBuilder()
    .setTitle(config.swaggerApiTitle)
    .setDescription(config.swaggerApiDescription)
    .setVersion('1.0')
    .addTag(config.swaggerApiTitle)
    .build(); */
  /*   const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); */
  const port: number = parseInt(`${process.env.PORT}`) || 4000;
  await app.listen(port);
}
bootstrap();
