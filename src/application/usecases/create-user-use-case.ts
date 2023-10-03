import { User } from "@/domain/entities/user";
import { UserRepository } from "../contracts/user-repository";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<void> {
    const user = new User({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
    });
    await this.userRepository.save(user);
  }
}

type Input = {
  firstName: string;
  lastName: string;
  email: string;
};
