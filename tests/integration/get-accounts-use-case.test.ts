import { AccountMemoryRepository } from "@/infra/repositories/account-memory-repository";
import { GetAccountsUseCase } from "../../src/application/usecases/get-accounts-use-case";
import { CreateAccountUseCase } from "../../src/application/usecases/create-account-use-case";

test("Should get logged user accounts", async () => {
  const userIdOne = "123";
  const userIdTwo = "987";
  const accountMemoryRepository = new AccountMemoryRepository();

  const createAccountUseCase = new CreateAccountUseCase(
    accountMemoryRepository
  );
  createAccountUseCase.execute({ name: "account 1", userId: userIdOne });
  createAccountUseCase.execute({ name: "account 2", userId: userIdOne });
  createAccountUseCase.execute({ name: "account 3", userId: userIdTwo });

  const getAccountsUseCase = new GetAccountsUseCase(accountMemoryRepository);
  const output = await getAccountsUseCase.execute({ userId: userIdOne });
  expect(output).toHaveLength(2);
  expect(output[0].name).toBe("account 1");
  expect(output[1].name).toBe("account 2");
});
