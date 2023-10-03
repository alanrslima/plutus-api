import { CreateUserUseCase } from "@/application/usecases/create-user-use-case";
import { UserMemoryRepository } from "@/infra/repositories/user-memory-repository";

test("Should create an user", async () => {
  const userMemoryRepository = new UserMemoryRepository();
  const createUserUseCase = new CreateUserUseCase(userMemoryRepository);

  await createUserUseCase.execute({
    firstName: "Jose",
    lastName: "Maria",
    email: "jose@email.com",
  });

  expect(userMemoryRepository.users).toHaveLength(1);
  expect(userMemoryRepository.users[0].firstName).toBe("Jose");
  expect(userMemoryRepository.users[0].lastName).toBe("Maria");
  expect(userMemoryRepository.users[0].email).toBe("jose@email.com");
});

test("Should not create a new user if already exists", async () => {
  try {
    const userMemoryRepository = new UserMemoryRepository();
    const createUserUseCase = new CreateUserUseCase(userMemoryRepository);

    await createUserUseCase.execute({
      firstName: "Jose",
      lastName: "Maria",
      email: "jose@email.com",
    });

    await createUserUseCase.execute({
      firstName: "Jose",
      lastName: "Ribas",
      email: "jose@email.com",
    });
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("User already exists");
  }
});
