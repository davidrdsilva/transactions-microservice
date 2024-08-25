import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/transaction.dto';
import { Transaction } from '../entities/transaction.entity';
import { TransactionService } from '../services/transaction.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    @HttpCode(201)
    @ApiOperation({
        summary: 'Inicia uma nova transferência.',
        description: 'Inicia uma nova transferência e, se bem sucedida, retorna o status da operação.',
    })
    @ApiResponse({
        status: 201,
        description: 'A transferência foi realizada com sucesso.',
        schema: {
            example: { status: 'Transaction successful' },
        },
    })
    async create(@Body() createTransactionDto: CreateTransactionDto): Promise<{ status: string }> {
        return await this.transactionService.create(createTransactionDto);
    }

    @Get(':transactionId')
    @HttpCode(200)
    @ApiOperation({
        summary: 'Retorna detalhes de uma transferência específica.',
        description: 'Retorna detalhes de uma transferência específica. É necessário informar o ID da transferência.',
    })
    @ApiResponse({ status: 200, description: 'A transferência foi encontrada na base de dados.' })
    @ApiResponse({ status: 404, description: 'Nenhuma transferência foi encontrada na base de dados.' })
    @ApiParam({ name: 'transactionId', description: 'O ID da transferência.' })
    async findOne(@Param('transactionId') transactionId: string): Promise<Transaction> {
        return await this.transactionService.findOne(transactionId);
    }

    @Get('/user/:userId')
    @HttpCode(200)
    @ApiOperation({
        summary: 'Lista de transferências de um usuário específico.',
        description: 'Lista de transferências de um usuário específico. É necessário informar o ID do usuário.',
    })
    @ApiResponse({ status: 200, description: 'Foram encontradas transferências para o usuário especificado.' })
    @ApiResponse({ status: 404, description: 'Nenhuma transferência foi encontrada para o usuário especificado.' })
    @ApiParam({ name: 'userId', description: 'O ID do usuário.' })
    async findByUserId(@Param('userId') userId: string): Promise<Transaction[]> {
        return await this.transactionService.findByUserId(userId);
    }
}
