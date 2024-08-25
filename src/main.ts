import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get<number>('port');

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    await app.listen(port);

    Logger.log(`🚀 Server is running on: ${await app.getUrl()}`, 'API');
}
bootstrap();
