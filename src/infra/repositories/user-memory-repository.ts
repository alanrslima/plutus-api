import { UserRepository } from "@/application/contracts/user-repository";
import { User } from "@/domain/entities/user";

export class UserMemoryRepository implements UserRepository {
  readonly users: {
    firstName: string;
    lastName: string;
    email: string;
  }[];

  constructor() {
    this.users = [];
  }

  async get(email: string): Promise<User> {
    const userData = this.users.find((user) => user.email === email);
    if (!userData) throw new Error("User not found");
    return new User({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
  }

  async save(user: User): Promise<void> {
    const userData = this.users.find((item) => item.email === user.email);
    if (userData) throw new Error("User already exists");
    this.users.push({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }
}
