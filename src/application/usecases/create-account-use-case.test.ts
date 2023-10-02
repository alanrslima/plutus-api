import { AccountMemoryRepository } from "@/infra/repositories/account-memory-repository";
import { CreateAccountUseCase } from "./create-account-use-case";

describe("Create account use case", () => {
  test("Should create an account", async () => {
    const accountMemoryRepository = new AccountMemoryRepository();
    const createAccountUseCase = new CreateAccountUseCase(
      accountMemoryRepository
    );
    await createAccountUseCase.execute({ name: "Banco do Brasil" });
    expect(accountMemoryRepository.accounts[0].name).toBe("Banco do Brasil");
  });
});
