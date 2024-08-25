import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/transaction.dto';
import { Transaction } from '../entities/transaction.entity';
import { TransactionService } from '../services/transaction.service';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        return await this.transactionService.create(createTransactionDto);
    }

    @Get(':transactionId')
    @HttpCode(200)
    async findOne(@Param('transactionId') transactionId: string): Promise<Transaction> {
        return await this.transactionService.findOne(transactionId);
    }

    @Get('/user/:userId')
    @HttpCode(200)
    async findByUserId(@Param('userId') userId: string): Promise<Transaction[]> {
        return await this.transactionService.findByUserId(userId);
    }

    @Get()
    getHello(): string {
        return this.transactionService.getHello();
    }
}
