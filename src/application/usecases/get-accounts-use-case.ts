import { AccountRepository } from "../contracts";

export class GetAccountsUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(input: Input): Promise<Output> {
    const accounts = await this.accountRepository.list(input.userId);
    return accounts.map((account) => ({
      code: account.code,
      name: account.name,
    }));
  }
}

type Input = {
  userId: string;
};

type Output = { name: string; code: string }[];
