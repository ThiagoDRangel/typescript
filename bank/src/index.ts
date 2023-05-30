import Conta from './entities/Conta';
import ContaPoupanca from './entities/ContaPoupanca';
import Email from './entities/Email';
import Pagamento from './entities/Pagamento';
import Transferencia from './entities/Transferencia';
import { Transacao } from './interfaces/Transacao';

const contaDaFani = new Conta({
  dataCriacao: new Date('2022-10-10'),
  email: new Email('fani@email.com'),
  saldo: 200,
});

const contaDoTomas = new ContaPoupanca(
  0.5,
  {
    dataCriacao: new Date('2023-01-01'),
    email: new Email('tomas@gmail.com'),
    saldo: 300,
  },
);

const contaDoRogerio = new ContaPoupanca(
  0.05,
  {
    email: new Email('rogerio@gmail.com'),
    saldo: 500,
  },
);

console.log('Essa é a conta do Thomas', contaDoTomas.preverRendimento());
console.log('Rogério na Área!', contaDoRogerio.preverRendimento());

const pagamentoNetFlix = new Pagamento({
  origem: contaDaFani,
  destino: contaDoTomas,
  valor: 50,
  dataDePagamento: new Date('2022-12-12'),
  dataDeVencimento: new Date('2021-01-01'),
});

const transferenciaBurgao = new Transferencia({
  destino: contaDoRogerio,
  origem: contaDaFani,
  valor: 10,
});

function efetivarTransacoes(transacoes: Transacao[]) {
  transacoes.forEach((transacao) => transacao.efetivar());
}

efetivarTransacoes([
  transferenciaBurgao,
  pagamentoNetFlix,
]);

console.log('Fani', contaDaFani.getSaldo());
console.log('Tomas', contaDoTomas.getSaldo());
console.log('Rogerio', contaDoRogerio.getSaldo());
console.log('FINALIZOU');