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
  const whitelist = [
    'https://virtual-menu.herokuapp.com/',
    'https://dashboard-menu.herokuapp.com/',
    'http://localhost:3000/',
  ];
  app.enableCors({
    origin: whitelist,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
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
