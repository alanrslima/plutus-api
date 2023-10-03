export class User {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;

  constructor(values: { firstName: string; lastName: string; email: string }) {
    this.email = values.email;
    this.firstName = values.firstName;
    this.lastName = values.lastName;
  }
}
