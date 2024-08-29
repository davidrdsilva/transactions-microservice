import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from '../controllers/transaction.controller';
import { Transaction } from '../entities/transaction.entity';
import { TransactionService } from '../services/transaction.service';
import { UserModule } from 'src/user/modules/user.module';
import { MessagingModule } from 'src/rabbitmq/modules/rabbitmq.module';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction]), UserModule, MessagingModule],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}
