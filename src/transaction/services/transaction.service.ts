import { Injectable } from '@nestjs/common';
import { TransactionServiceInterface } from '../interfaces/transaction.service.interface';
import { CreateTransactionDto } from '../dtos/transaction.dto';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionService implements TransactionServiceInterface {
    create(createTransaction: CreateTransactionDto): Transaction {
        throw new Error('Method not implemented.');
    }
    findById(transactionId: string): Transaction {
        throw new Error('Method not implemented.');
    }
    findByUserId(userId: string): Transaction[] {
        throw new Error('Method not implemented.');
    }
    getHello(): string {
        return 'Hello World!';
    }
}
