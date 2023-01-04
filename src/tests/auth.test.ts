import request from 'supertest';
import App from "../app"
import { CreateUserDto } from '../dtos/users.dto';
import AuthRoute from '../routes/auth.route';

describe('Testing Auth', () => {
  let authRoute: any = null
  let app: any = null
  let server: any = null

  beforeAll(async () => {
    authRoute = new AuthRoute();
    app = new App([authRoute]);

    await app.db.sequelize.sync({ force: true });

    server = app.getServer()
  });

  describe('[POST] /signup', () => {
    it('response should have the Create userData', () => {
      const userData: CreateUserDto = {
        email: 'example@email.com',
        password: 'password',
      };

      return request(server)
        .post('/signup')
        .send(userData)
        .expect(201)
    });
  });

  describe('[POST] /login', () => {
    it('response should have the 200 status code', () => {
      const userData: CreateUserDto = {
        email: 'example@email.com',
        password: 'password',
      };

      return request(server)
        .post('/login')
        .send(userData)
        .expect(200)
    });
  });

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
  });
});
