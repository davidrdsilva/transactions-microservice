import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => Transaction, (transaction) => transaction.senderUser)
    sentTransactions: Transaction[];

    @OneToMany(() => Transaction, (transaction) => transaction.receiverUser)
    transactionsReceived: Transaction[];
}
