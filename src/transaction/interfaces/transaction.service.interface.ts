import { CreateTransactionDto } from '../dtos/transaction.dto';
import { Transaction } from '../entities/transaction.entity';

export interface TransactionServiceInterface {
    create(createTransaction: CreateTransactionDto): Transaction;
    findById(transactionId: string): Transaction;
    findByUserId(userId: string): Transaction[];
}
