export default class Email {
  private _value: string;

  constructor(email: string) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // regexEmail.test(email)
    if (!email.match(regexEmail)) {
      throw new Error('E-mail inválido');
    }
   
    this._value = email;
  }
}