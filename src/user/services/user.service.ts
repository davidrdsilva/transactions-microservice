import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserServiceInterface } from '../interfaces/user.service.interface';

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findById(userId: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({
            select: ['id', 'email', 'roles'],
            where: { email: email },
            relations: { roles: true },
        });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }
}
