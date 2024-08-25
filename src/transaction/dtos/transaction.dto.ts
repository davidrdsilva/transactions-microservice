import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTransactionDto {
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    senderUser: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    receiverUser: string;
}
