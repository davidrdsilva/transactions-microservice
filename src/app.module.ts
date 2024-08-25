import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/constants/general.config';
import { typeOrmAsyncConfig } from './config/constants/typeorm.config';
import { TransactionModule } from './transaction/modules/transaction.module';
import { AuthModule } from './auth/modules/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        AuthModule,
        TransactionModule,
    ],
})
export class AppModule {}
