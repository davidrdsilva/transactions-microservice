import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './transactions/services/app.service';
import { config } from './config/general.config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { AppController } from './transactions/controllers/app.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
