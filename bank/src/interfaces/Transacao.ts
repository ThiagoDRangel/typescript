export interface Transacao {
  efetivar(): void;
}

export interface TransacaoComSaldo extends Transacao {
  getSaldo(): number;
}