import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return the index from the request body', async () => {
    const requestBody = { index: 42 };

    const result = await appController.handleRequest(requestBody);

    expect(result).toEqual(requestBody);
  });

  it('should simulate a delay between 1ms and 1000ms', async () => {
    const start = Date.now();
    const requestBody = { index: 1 };

    await appController.handleRequest(requestBody);
    const duration = Date.now() - start;

    expect(duration).toBeGreaterThanOrEqual(1);
    expect(duration).toBeLessThanOrEqual(1000);
  });

});
