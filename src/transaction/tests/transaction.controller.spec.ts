import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from '../controllers/transaction.controller';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto } from '../dtos/transaction.dto';
import { Transaction } from '../entities/transaction.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/entities/user.entity';

describe('TransactionController', () => {
    let transactionController: TransactionController;
    let transactionRepository: Repository<Transaction>;
    let userService: UserService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [TransactionController],
            providers: [
                TransactionService,
                UserService,
                {
                    provide: getRepositoryToken(Transaction),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOneBy: jest.fn(),
                    },
                },
                {
                    provide: UserService,
                    useValue: {
                        findById: jest.fn(),
                        findOneBy: jest.fn(),
                    },
                },
            ],
        }).compile();

        transactionController = app.get<TransactionController>(TransactionController);
        transactionRepository = app.get<Repository<Transaction>>(getRepositoryToken(Transaction));
        userService = app.get<UserService>(UserService);
    });

    describe('create', () => {
        it('should create a new transaction and return success status', async () => {
            const createTransactionDto: CreateTransactionDto = {
                amount: 100,
                description: 'Payment for services',
                senderUser: 'sender-uuid',
                receiverUser: 'receiver-uuid',
            };

            const senderUser: User = { id: 'sender-uuid' } as User;
            const receiverUser: User = { id: 'receiver-uuid' } as User;

            const newTransaction: Transaction = {
                id: 'transaction-uuid',
                amount: createTransactionDto.amount,
                description: createTransactionDto.description,
                senderUser: senderUser,
                receiverUser: receiverUser,
            } as Transaction;

            // Mocking findById to return users
            (userService.findById as jest.Mock).mockResolvedValueOnce(senderUser);
            (userService.findById as jest.Mock).mockResolvedValueOnce(receiverUser);

            // Mocking create and save methods
            (transactionRepository.create as jest.Mock).mockReturnValue(newTransaction);
            (transactionRepository.save as jest.Mock).mockResolvedValue(newTransaction);

            const result = await transactionController.create(createTransactionDto);

            expect(userService.findById).toHaveBeenCalledWith(createTransactionDto.senderUser);
            expect(userService.findById).toHaveBeenCalledWith(createTransactionDto.receiverUser);
            expect(transactionRepository.create).toHaveBeenCalledWith({
                amount: createTransactionDto.amount,
                description: createTransactionDto.description,
                senderUser: senderUser,
                receiverUser: receiverUser,
            });
            expect(transactionRepository.save).toHaveBeenCalledWith(newTransaction);
            expect(result).toEqual({ status: 'Transaction successful' });
        });
    });
});
