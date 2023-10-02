import { Transaction } from "./transaction";
import { randomUUID } from "node:crypto";

export class Account {
  readonly transactions: Transaction[];

  readonly code: string;
  readonly name: string;

  constructor(values: { code?: string; name: string }) {
    this.transactions = [];
    this.code = values.code ?? randomUUID();
    this.name = values.name;
  }

  getBalance(): number {
    let amount = 0;
    this.transactions.forEach((transaction) => {
      amount += transaction.amount;
    });
    return amount;
  }

  debit(amount: number, numberInstallments: number): void {
    const transaction = new Transaction(
      randomUUID(),
      -Math.abs(amount),
      numberInstallments
    );
    this.transactions.push(transaction);
  }

  credit(amount: number) {
    const transaction = new Transaction(randomUUID(), amount, 1);
    this.transactions.push(transaction);
  }
}
