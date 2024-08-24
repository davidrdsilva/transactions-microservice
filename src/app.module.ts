import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/general.config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { TransactionModule } from './transactions/modules/transaction.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        TransactionModule,
    ],
})
export class AppModule {}
