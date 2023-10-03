import { CreateAccountUseCase } from "@/application/usecases/create-account-use-case";
import { AccountMemoryRepository } from "@/infra/repositories/account-memory-repository";

describe("Create account use case", () => {
  test("Should create an account", async () => {
    const accountMemoryRepository = new AccountMemoryRepository();
    const createAccountUseCase = new CreateAccountUseCase(
      accountMemoryRepository
    );
    await createAccountUseCase.execute({
      name: "Banco do Brasil",
      userId: "123",
    });
    expect(accountMemoryRepository.accounts[0].name).toBe("Banco do Brasil");
  });
});
