import Email from './Email';

export type ContaParams = {
  email: Email,
  saldo: number,
  dataCriacao?: Date
};

class Conta {
  private _email: Email;
  private _saldo: number;
  private _dataCriacao: Date;

  constructor(params: ContaParams) {
    this._email = params.email;
    this._saldo = params.saldo;
    this._dataCriacao = params.dataCriacao || new Date();
  }

  public debitar(valor: number): void {
    if (valor <= 0) {
      throw new Error('Valor inválido');
    }
    if (valor > this._saldo) {
      throw new Error('Saldo insuficiente');
    }
    this._saldo -= valor;
  }

  public creditar(valor: number): void {
    this._saldo += valor;
  }

  public getSaldo(): number {
    return this._saldo;
  }

  public setEmail(email: Email): void {
    this._email = email;
  }

  public get email(): Email {
    return this._email;
  }

  public set email(email: Email) {
    this._email = email;
  }
}

export default Conta;