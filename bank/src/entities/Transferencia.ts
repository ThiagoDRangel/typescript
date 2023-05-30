import { Transacao } from '../interfaces/Transacao';
import Conta from './Conta';

type TransferenciaParams = {
  origem: Conta,
  destino: Conta,
  valor: number
};

export default class Transferencia implements Transacao {
  private _origem: Conta;
  private _destino: Conta;
  private _valor: number;

  constructor(params: TransferenciaParams) {
    this._origem = params.origem;
    this._destino = params.destino;
    this._valor = params.valor;
  }

  efetivar(): void {
    this._origem.debitar(this._valor);
    this._destino.creditar(this._valor);
  }
}