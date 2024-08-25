import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dtos/transaction.dto';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        return await this.transactionService.create(createTransactionDto);
    }

    @Get()
    getHello(): string {
        return this.transactionService.getHello();
    }
}
