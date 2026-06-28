import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { ConfigModule } from '@nestjs/config';
import config from '../src/config/config';

describe('TaskFlow API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('GET /api should return hello world', () => {
    return request(app.getHttpServer()).get('/api').expect(200);
  });

  it('POST /api/auth/register should validate email', () => {
    return request(app.getHttpServer())
      .post('/api/auth/register')
      .send({ email: 'invalid', username: 'test', password: '123456' })
      .expect(400);
  });

  it('GET /api/tasks should return 401 without token', () => {
    return request(app.getHttpServer()).get('/api/tasks').expect(401);
  });

  it('GET /api/users/profile should return 401 without token', () => {
    return request(app.getHttpServer()).get('/api/users/profile').expect(401);
  });

  afterEach(async () => {
    await app.close();
  });
});
