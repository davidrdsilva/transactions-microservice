import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { CreateTransactionDto } from '../dtos/transaction.dto';
import { Transaction } from '../entities/transaction.entity';
import { TransactionService } from '../services/transaction.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enums/role.enum';

@ApiTags('transactions')
@ApiBearerAuth()
@Controller('transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    @Roles(Role.User)
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
    @Roles(Role.User)
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
    @Roles(Role.Admin)
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
