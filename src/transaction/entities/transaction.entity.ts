import { User } from 'src/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'float8' })
    amount: number;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.sentTransactions)
    @JoinColumn({ name: 'sender_user_id' })
    senderUser: User;

    @ManyToOne(() => User, (user) => user.transactionsReceived)
    @JoinColumn({ name: 'receiver_user_id' })
    receiverUser: User;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
