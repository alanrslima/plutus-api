import { AccountMemoryRepository } from "@/infra/repositories/account-memory-repository";
import { GetAccountUseCase } from "@/application/usecases/get-account-use-case";
import { CreateAccountUseCase } from "@/application/usecases/create-account-use-case";

test("Should return an error if account not exists", async () => {
  try {
    const accountMemoryRepository = new AccountMemoryRepository();
    const getAccountUseCase = new GetAccountUseCase(accountMemoryRepository);
    await getAccountUseCase.execute({ code: "123", userId: "1" });
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe("Account not found");
  }
});

test("Should return an error if an user try to access another user account", async () => {
  try {
    const userIdOne = "1";
    const userIdTwo = "2";
    const accountMemoryRepository = new AccountMemoryRepository();
    const createAccountUseCase = new CreateAccountUseCase(
      accountMemoryRepository
    );
    await createAccountUseCase.execute({
      name: "Conta 1",
      userId: userIdOne,
    });
    const createdAccount = accountMemoryRepository.accounts[0];
    const getAccountUseCase = new GetAccountUseCase(accountMemoryRepository);
    await getAccountUseCase.execute({
      code: createdAccount.code,
      userId: userIdTwo,
    });
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe(
      "User does not have permission to access this resource"
    );
  }
});

test("Should return an account if exists and user has permissions", async () => {
  const accountMemoryRepository = new AccountMemoryRepository();
  const createAccountUseCase = new CreateAccountUseCase(
    accountMemoryRepository
  );
  createAccountUseCase.execute({ name: "Banco do Brasil", userId: "123" });
  const createdAccount = accountMemoryRepository.accounts[0];
  const getAccountUseCase = new GetAccountUseCase(accountMemoryRepository);
  const account = await getAccountUseCase.execute({
    code: createdAccount.code,
    userId: "123",
  });
  expect(account.name).toBe("Banco do Brasil");
  expect(account.code).toBe(createdAccount.code);
});
