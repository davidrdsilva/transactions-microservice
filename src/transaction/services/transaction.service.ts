import { Injectable } from '@nestjs/common';
import { TransactionServiceInterface } from '../interfaces/transaction.service.interface';
import { CreateTransactionDto } from '../dtos/transaction.dto';
import { Transaction } from '../entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class TransactionService implements TransactionServiceInterface {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        private readonly userService: UserService,
    ) {}

    async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        const senderUser = await this.userService.findById(createTransactionDto.senderUser);
        const receiverUser = await this.userService.findById(createTransactionDto.receiverUser);

        const newTransaction = this.transactionRepository.create(<Transaction>{
            amount: createTransactionDto.amount,
            description: createTransactionDto.description,
            senderUser: senderUser,
            receiverUser: receiverUser,
        });

        return await this.transactionRepository.save(newTransaction);
    }

    findById(transactionId: string): Promise<Transaction> {
        throw new Error('Method not implemented.');
    }

    findByUserId(userId: string): Promise<Transaction[]> {
        throw new Error('Method not implemented.');
    }

    getHello(): string {
        return 'Hello World!';
    }
}
