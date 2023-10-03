import { Account } from "@/domain/entities/account";
import { AccountRepository } from "../contracts";

export class CreateAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(input: Input): Promise<void> {
    const account = new Account({ name: input.name });
    await this.accountRepository.save(account, input.userId);
  }
}

type Input = {
  name: string;
  userId: string;
};
