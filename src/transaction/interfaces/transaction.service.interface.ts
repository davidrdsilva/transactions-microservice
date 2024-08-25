import { CreateTransactionDto } from '../dtos/transaction.dto';
import { Transaction } from '../entities/transaction.entity';

export interface TransactionServiceInterface {
    create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    findById(transactionId: string): Promise<Transaction>;
    findByUserId(userId: string): Promise<Transaction[]>;
}
