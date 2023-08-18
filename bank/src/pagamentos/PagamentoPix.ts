import Conta from '../contas/Conta';
import Pagamentos from './Pagamentos';

class PagamentoPix extends Pagamentos {
  private _chavePix: string;
  constructor(chave: string, conta: Conta, valor: number, descricao: string) {
    super(conta, valor, descricao);
    this._chavePix = chave;
  }
  protected gerarCodigo(): string {
    return `${this._chavePix}-${this.descricao}`;
  }
  pagar(): void {
    console.log('Comprovante PIX');
    console.log('--------------------');
    console.log(`Saldo anterior: R$ ${this.conta.saldo},00`);
    console.log('Descrição:', this.descricao);
    console.log(`Valor: R$ ${this.valor},00`);
    console.log('Codigo da transação: ', this.gerarCodigo());
    this.conta.debito(this.valor);
    console.log(`Saldo atual:, R$ ${this.conta.saldo},00`);
    console.log('--------------------');
  }
}

export default PagamentoPix;
