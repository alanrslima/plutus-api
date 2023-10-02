import { Account } from "./account";

test("Should create an account with no balance", () => {
  const account = new Account({ code: "123", name: "mock account" });
  expect(account.name).toBe("mock account");
  expect(account.code).toBe("123");
  expect(account.getBalance()).toBe(0);
});

test("Should create and credit an account", () => {
  const account = new Account({ code: "123", name: "mock account" });
  expect(account.getBalance()).toBe(0);
  account.credit(1000);
  expect(account.getBalance()).toBe(1000);
});

test("Should create, credit and debit an account", () => {
  const account = new Account({ code: "123", name: "mock account" });
  account.credit(1000);
  account.debit(500, 1);
  expect(account.getBalance()).toBe(500);
});
