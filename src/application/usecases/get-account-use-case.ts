import { AccountRepository } from "../contracts";

export class GetAccountUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(input: Input): Promise<Output> {
    const account = await this.accountRepository.get(input.code);
    return { code: account.code, name: account.name };
  }
}

type Input = {
  code: string;
};

type Output = {
  code: string;
  name: string;
};
