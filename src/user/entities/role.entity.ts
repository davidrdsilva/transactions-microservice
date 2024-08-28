import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from './user.entity';

@Entity({ synchronize: false })
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 10 })
    name: string;

    @ManyToOne(() => User, (user) => user.roles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
