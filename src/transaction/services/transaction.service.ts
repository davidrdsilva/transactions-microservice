import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from '../dtos/transaction.dto';
import { Transaction } from '../entities/transaction.entity';
import { TransactionServiceInterface } from '../interfaces/transaction.service.interface';
import { isUUID } from 'class-validator';

@Injectable()
export class TransactionService implements TransactionServiceInterface {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        private readonly userService: UserService,
    ) {}

    async create(createTransactionDto: CreateTransactionDto): Promise<{ status: string }> {
        const senderUser = await this.userService.findById(createTransactionDto.senderUser);
        const receiverUser = await this.userService.findById(createTransactionDto.receiverUser);

        const newTransaction = this.transactionRepository.create(<Transaction>{
            amount: createTransactionDto.amount,
            description: createTransactionDto.description,
            senderUser: senderUser,
            receiverUser: receiverUser,
        });

        await this.transactionRepository.save(newTransaction);

        return { status: 'Transaction successful' };
    }

    async findOne(transactionId: string): Promise<Transaction> {
        if (!isUUID(transactionId)) {
            throw new BadRequestException('The provided parameter transactionId is not a valid UUID.');
        }

        const transaction = await this.transactionRepository.findOneBy({ id: transactionId });

        if (!transaction) {
            throw new NotFoundException('Transaction not found.');
        }

        return transaction;
    }

    async findByUserId(userId: string): Promise<Transaction[]> {
        if (!isUUID(userId)) {
            throw new BadRequestException('The provided parameter userId is not a valid UUID.');
        }

        return await this.transactionRepository.findBy({ senderUser: { id: userId } });
    }

    getHello(): string {
        return 'Hello World!';
    }
}
