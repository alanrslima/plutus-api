import { Account } from "@/domain/entities/account";

export interface AccountRepository {
  save(account: Account, userId: string): Promise<void>;
  get(code: string, userId: string): Promise<Account>;
  list(userId: string): Promise<Account[]>;
}
