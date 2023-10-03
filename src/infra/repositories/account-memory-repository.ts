import { Account } from "@/domain/entities/account";
import { AccountRepository } from "@/application/contracts";

export class AccountMemoryRepository implements AccountRepository {
  readonly accounts: { code: string; name: string; userId: string }[];

  constructor() {
    this.accounts = [];
  }

  async get(code: string, userId: string): Promise<Account> {
    const accountData = this.accounts.find((account) => account.code === code);
    if (!accountData) throw new Error("Account not found");
    if (accountData && accountData.userId !== userId)
      throw new Error("User does not have permission to access this resource");
    return new Account({ name: accountData.name, code: accountData.code });
  }

  async save(account: Account, userId: string): Promise<void> {
    const data = { name: account.name, code: account.code, userId };
    this.accounts.push(data);
  }

  async list(userId: string): Promise<Account[]> {
    const accountsData = this.accounts.filter(
      (account) => account.userId === userId
    );
    const accounts = [];
    accountsData.forEach((accountData) => {
      accounts.push(
        new Account({ code: accountData.code, name: accountData.name })
      );
    });
    return accounts;
  }
}
