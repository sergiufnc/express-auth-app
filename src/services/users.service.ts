import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import db from '@/models';

class UserService {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await db.users.findAll();

    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = await db.users.findByPk(userId);

    // if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async findUserByEmail(email: string): Promise<User> {
    const findUser: User = await db.users.findOne({ where: { email } });

    // if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: User = await db.users.findOne({ where: { email: userData.email } });

    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);

    const createUserData: User = { ...userData, password: hashedPassword };

    const user = await db.users.create(createUserData);

    return user;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User[]> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: User = await db.users.findByPk(userId);

    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);

    const updateUserData: User[] = await db.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<User[]> {
    const findUser: User = await db.users.findByPk(userId);

    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const deleteUserData: User[] = await db.users.destroy({ where: { id: userId } });

    return deleteUserData;
  }
}

export default UserService;
