import { Account } from "@/domain/entities/account";

export interface AccountRepository {
  save(account: Account): Promise<void>;
  get(code: string): Promise<Account>;
}
