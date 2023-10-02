import { Account } from "@/domain/entities/account";
import { AccountRepository } from "@/application/contracts";

export class AccountMemoryRepository implements AccountRepository {
  readonly accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  async get(code: string): Promise<Account> {
    const account = this.accounts.find((account) => account.code === code);
    if (!account) throw new Error("Account not found");
    return account;
  }

  async save(account: Account): Promise<void> {
    this.accounts.push(account);
  }
}
