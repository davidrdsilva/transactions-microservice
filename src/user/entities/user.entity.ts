import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity({ synchronize: false })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @OneToMany(() => Role, (role) => role.user)
    roles: Role[];

    @OneToMany(() => Transaction, (transaction) => transaction.senderUser)
    sentTransactions: Transaction[];

    @OneToMany(() => Transaction, (transaction) => transaction.receiverUser)
    transactionsReceived: Transaction[];
}
