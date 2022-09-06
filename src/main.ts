import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  const config = new DocumentBuilder()
    .setTitle('SIMPLE')
    .setDescription('SIMPLE CRUD')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Bearer' })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => {
    console.log(
      `Àpplication starting on http://localhost:${port}\n Docs: http://localhost:${port}/api`,
    );
  });
}
bootstrap();
