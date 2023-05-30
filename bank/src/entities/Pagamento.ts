import { Transacao } from '../interfaces/Transacao';
import Conta from './Conta';

type pagamentoParams = {
  valor: number,
  origem: Conta,
  destino: Conta,
  dataDeVencimento: Date,
  dataDePagamento: Date,
};

class Pagamento implements Transacao {
  private _valor: number;
  private _origem: Conta;
  private _destino: Conta;
  private _dataDeVencimento: Date;
  private _dataDoPagamento: Date;

  constructor(params: pagamentoParams) {
    this._valor = params.valor;
    this._origem = params.origem;
    this._destino = params.destino;
    this._dataDeVencimento = params.dataDeVencimento;
    this._dataDoPagamento = params.dataDePagamento;
  }

  public efetivar() {
    const valorFinal = this.calcularValorFinal();

    this._origem.debitar(valorFinal);
    this._destino.creditar(valorFinal);
  }

  private calcularValorFinal(): number {
    if (this.estaVencido()) {
      return this._valor * 1.2;
    }
    return this._valor;
  }

  private estaVencido(): boolean {
    return this._dataDeVencimento.getTime() < this._dataDoPagamento.getTime();
  }
}

export default Pagamento;