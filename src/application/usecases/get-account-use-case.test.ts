import { AccountMemoryRepository } from "@/infra/repositories/account-memory-repository";
import { GetAccountUseCase } from "./get-account-use-case";
import { CreateAccountUseCase } from "./create-account-use-case";

describe("Get account use case", () => {
  test("Should return an error if account not exists", async () => {
    try {
      const accountMemoryRepository = new AccountMemoryRepository();
      const getAccountUseCase = new GetAccountUseCase(accountMemoryRepository);
      await getAccountUseCase.execute({ code: "123" });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error?.message).toBe("Account not found");
    }
  });

  test("Should return an account if exists", async () => {
    const accountMemoryRepository = new AccountMemoryRepository();

    const createAccountUseCase = new CreateAccountUseCase(
      accountMemoryRepository
    );
    createAccountUseCase.execute({ name: "Banco do Brasil" });
    const createdAccount = accountMemoryRepository.accounts[0];

    const getAccountUseCase = new GetAccountUseCase(accountMemoryRepository);
    const account = await getAccountUseCase.execute({
      code: createdAccount.code,
    });
    expect(account.name).toBe("Banco do Brasil");
    expect(account.code).toBe(createdAccount.code);
  });
});
