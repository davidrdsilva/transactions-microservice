import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from '../controllers/app.controller';
import { TransactionService } from '../services/transaction.service';

describe('TransactionController', () => {
    let transactionController: TransactionController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [TransactionController],
            providers: [TransactionService],
        }).compile();

        transactionController = app.get<TransactionController>(TransactionController);
    });

    describe('root', () => {
        it('should return the message "Hello World!"', () => {
            expect(transactionController.getHello()).toBe('Hello World!');
        });
    });
});
