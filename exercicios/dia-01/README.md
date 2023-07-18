## Configurações `TypeScript`

> Iniciar um projeto `node`
```bash
npm init -y
```

> Instalar o `TypeScript` localmente
```bash
npm i typescript@4.4
```

> Executar o projeto
```bash
npx tsc hello.ts
```

> O comando irá converter o arquivo `.ts` em `.js`

> Para executar o arquivo `hello.js`
```bash
node hello.js
```
> Instalaro `ts-node` global
```bash
npm install -g ts-node
```
> Crie o arquivo `tsconfig.json`
```bash
tsc --init
```
>Executar o arquivo com o `ts-node`
```bash
ts-node hello.ts
```