import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTransactionDto {
    @ApiProperty({ description: 'O valor a ser transferido.' })
    @IsNumber()
    amount: number;

    @ApiProperty({ description: 'Uma breve descrição sobre a transferência a ser realizada.' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ description: 'ID do usuário que está realizando a transferência.' })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    senderUser: string;

    @ApiProperty({ description: 'ID do usuário destinatário da transferência.' })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    receiverUser: string;
}
