# Acess API controller

### Start a new project node
```bash
npm init -y
```

### Config file `package.json`
```bash
{
  "name": "solid-2",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "npx ts-node src"
  },
  "license": "ISC",
  "devDependencies": {
    "@types/mysql": "2.15.19",
    "@types/redis": "2.8.32"
  },
  "dependencies": {
    "ts-node": "10.2.1",
    "mysql": "2.18.1",
    "redis": "3.1.2",
    "typescript": "4.4.3"
  }
}
```

### Create `docker-compose.yml`
```bash
version: '3.1'

services:
  mysqldb:
    image: mysql:8.0.26
    container_name: solid_mysqldb_container
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example
    networks: 
      - net1

  redisdb:
    image: redis:6.2.5
    container_name: solid_redisdb_container
    restart: always
    networks: 
      - net2

  solid_node_service:
    image: node:14.17.6
    container_name: solid_node_container
    command: npm install
    working_dir: /home/app
    volumes:
      - ./:/home/app
    networks: 
      - net1
      - net2

networks: 
  net1:
  net2:
```
### Start docker compose
```bash
docker compose up -d
```

### Access container node
```bash
docker compose run solid_node_Service bash
```

### Create folder `src`

### Create files `src/index.ts` and `src/Connector.ts`
```bash
mkdir src && touch src/index.ts src/Connector.ts
```

### Config file `src/Connector.ts`
```bash
// ./src/Connector.ts
import mysql, { Connection } from 'mysql';

interface ConnectorConstructor {
  host: string;
  port: number;
  database?: string;
  user?: string;
  password?: string;
}

export default class MySQLConnector {
  private connection: Connection;

  constructor(config: ConnectorConstructor) {
    this.connection = mysql.createConnection({ ...config, database: undefined });
    this.connection.connect();
    const queries = [
      `CREATE DATABASE IF NOT EXISTS ${config.database};`,
      `USE ${config.database};`,
      'CREATE TABLE IF NOT EXISTS counter (token CHAR(36) UNIQUE, count INT);',
    ];
    queries.forEach((query) => this.connection.query(query));
  }

  public async getCount(token: string): Promise<number> {
    const query = `SELECT count FROM counter WHERE token='${token}';`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, (error, results) => {
        if (error) return reject(error);

        let result = parseInt(results[0].count, 10);
        result = Number.isNaN(result) ? 0 : result;
        resolve(result);
      });
    });
  }

  public incrementCount(token: string): void {
    this.connection.query(`UPDATE counter SET count = count + 1 WHERE token='${token}';`);
  }

  private async updateCount(token: string, value: number) {
    this.connection.query(`UPDATE counter SET count=${value} WHERE token='${token}';`);
  }

  public clearCount(token: string): void {
    this.updateCount(token, 0);
  }

  public firstCount(token: string): void {
    this.connection.query(`INSERT IGNORE INTO counter VALUES('${token}', 0);`);
  }

  public closeConnection(): void {
    this.connection.end();
  }
}
```

### Config file `src/index.ts`
```bash
// ./src/index.ts
import Connector from './Connector';

const token = 'ce42033d-9133-457a-a1a1-41ac0b63a333';
const conn = new Connector({
  host: 'mysqldb',
  port: 3306,
  database: 'counter',
  user: 'root',
  password: 'example',
});

const main = (connector: Connector) => {
  connector.firstCount(token);

  const logCount = async () => {
    try {
      const count = await connector.getCount(token);
      console.log(count);
    } catch (err) {
      console.error(err);
    }
  };

  const doSomeIncrements = () => {
    logCount();
    connector.incrementCount(token);
    connector.incrementCount(token);
    connector.incrementCount(token);
  };

  const incrementsInterval = setInterval(doSomeIncrements, 500);

  setTimeout(() => {
    clearInterval(incrementsInterval);
    logCount();
    connector.clearCount(token);
    connector.closeConnection();
  }, 5500);
};

main(conn);

/*
Saída:
0
3
6
9
12
15
18
21
24
27
30
*/
```

### Test aplication
```bash
npx ts-node src
```