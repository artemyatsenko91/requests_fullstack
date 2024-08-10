import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app/app.module';
import * as request from 'supertest';
import { Server } from 'http';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server: Server;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    server = app.getHttpServer();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api (POST) should return the index from the request body', async () => {
    const data = { index: 42 };
    const response = await request(server).post('/api').send(data).expect(201);

    expect(response.status).toEqual(201);
    expect(response.body).toEqual(data);
  });

  it('should return 429 Too Many Requests when more than 50 requests are made in 10 seconds', async () => {
    const requests = [];
    const throttlerExceptions = [];

    for (let i = 0; i <= 51; i++) {
      const req = request(app.getHttpServer())
        .post('/api')
        .send({ index: i + 1 });

      requests.push(req);
    }

    const responses = await Promise.allSettled(requests);

    responses.forEach((response) => {
      if (response.status === 'fulfilled') {
        if (response.value.body.statusCode === 429)
          throttlerExceptions.push(response.value.body);
      }
    });

    expect(throttlerExceptions.length).toBeGreaterThan(0);
  });
});
