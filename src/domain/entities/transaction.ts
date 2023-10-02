import { Installment } from "./installment";

export class Transaction {
  readonly installments: Installment[];

  constructor(
    readonly code: string,
    readonly amount: number,
    readonly numberInstallments: number
  ) {
    this.installments = [];
    this.generateInstallments();
  }

  private generateInstallments() {
    let number = 1;
    let amount = parseFloat((this.amount / this.numberInstallments).toFixed(2));
    let diff = parseFloat(
      (this.amount - amount * this.numberInstallments).toFixed(2)
    );
    while (number <= this.numberInstallments) {
      if (number === this.numberInstallments) {
        amount += diff;
      }
      this.installments.push(new Installment(number, amount));
      number++;
    }
  }
}
