import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from '../controllers/transaction.controller';
import { Transaction } from '../entities/transaction.entity';
import { TransactionService } from '../services/transaction.service';
import { UserModule } from 'src/user/modules/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction]), UserModule],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}
