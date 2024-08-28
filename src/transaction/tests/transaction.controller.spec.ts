import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from '../controllers/transaction.controller';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto } from '../dtos/transaction.dto';
import { Transaction } from '../entities/transaction.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

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
                        findBy: jest.fn(),
                    },
                },
                {
                    provide: UserService,
                    useValue: {
                        findById: jest.fn(),
                        findOneBy: jest.fn(),
                    },
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn(),
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

    describe('findOne', () => {
        it('Should return a transaction by its ID', async () => {
            const senderUser: User = { id: 'sender-uuid' } as User;
            const receiverUser: User = { id: 'receiver-uuid' } as User;

            const newTransaction: Transaction = {
                id: '9d3b2c4d-6e2e-4b59-9d83-bd7f2f2c1b64',
                amount: 5000,
                description: 'Freelance service payment',
                senderUser: senderUser,
                receiverUser: receiverUser,
            } as Transaction;

            (transactionRepository.findOneBy as jest.Mock).mockResolvedValueOnce(newTransaction);

            const result = await transactionController.findOne('e7196de0-a7ff-47fa-ae96-4cc76a732224');

            expect(result.id).toEqual('9d3b2c4d-6e2e-4b59-9d83-bd7f2f2c1b64');
            expect(result.amount).toEqual(5000);
            expect(result.description).toEqual('Freelance service payment');
            expect(result.senderUser.id).toEqual('sender-uuid');
            expect(result.receiverUser.id).toEqual('receiver-uuid');
        });
    });

    describe('findByUserId', () => {
        it('should return transactions by user ID', async () => {
            const senderUser: User = { id: 'sender-uuid' } as User;
            const receiverUser: User = { id: 'receiver-uuid' } as User;

            const newTransaction: Transaction[] = [
                {
                    id: '9d3b2c4d-6e2e-4b59-9d83-bd7f2f2c1b64',
                    amount: 5000,
                    description: 'Freelance service payment',
                    senderUser: senderUser,
                    receiverUser: receiverUser,
                },
                {
                    id: '2f5a8e9c-3af1-42b6-9b75-dc8c62e3f1e7',
                    amount: 12000,
                    description: 'Travel expenses reimbursement',
                    senderUser: senderUser,
                    receiverUser: receiverUser,
                },
            ] as Transaction[];

            (transactionRepository.findBy as jest.Mock).mockResolvedValueOnce(newTransaction);

            const result = await transactionController.findByUserId('e7196de0-a7ff-47fa-ae96-4cc76a732224');

            expect(result).toHaveLength(2);

            expect(result[0].id).toEqual('9d3b2c4d-6e2e-4b59-9d83-bd7f2f2c1b64');
            expect(result[1].id).toEqual('2f5a8e9c-3af1-42b6-9b75-dc8c62e3f1e7');

            expect(result[0].amount).toEqual(5000);
            expect(result[1].amount).toEqual(12000);

            expect(result[0].description).toEqual('Freelance service payment');
            expect(result[1].description).toEqual('Travel expenses reimbursement');

            expect(result[0].senderUser).toEqual(senderUser);
            expect(result[0].receiverUser).toEqual(receiverUser);
            expect(result[1].senderUser).toEqual(senderUser);
            expect(result[1].receiverUser).toEqual(receiverUser);
        });
    });
});
