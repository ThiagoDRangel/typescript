import Conta, { ContaParams } from './Conta';

interface debitavel {
  debitar(valor: number): void;
}

interface Rentavel {
  preverRendimento(): number;
}

export default class ContaPoupanca
  extends Conta
  implements debitavel, Rentavel {
    private _juros: number;

    constructor(juros: number, params: ContaParams) {
      super(params);
      this._juros = juros;
    }

    public preverRendimento(): number {
        return this.getSaldo() * this._juros;
    }
  }
