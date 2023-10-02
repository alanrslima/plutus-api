import { Transaction } from "./transaction";

test("Should create an transaction", () => {
  const transaction = new Transaction("123", 1000, 12);
  expect(transaction.code).toBe("123");
  expect(transaction.amount).toBe(1000);
  expect(transaction.installments).toHaveLength(12);
  expect(transaction.installments[0].amount).toBe(83.33);
  expect(transaction.installments[11].amount).toBe(83.37);
});
