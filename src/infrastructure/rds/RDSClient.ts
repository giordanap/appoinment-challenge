import mysql from "mysql2/promise";

export class RDSClient {
  private connection: mysql.Connection | null = null;

  constructor(
    private readonly host: string,
    private readonly user: string,
    private readonly password: string,
    private readonly database: string
  ) {}

  async connect(): Promise<mysql.Connection> {
    if (!this.connection) {
      this.connection = await mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database,
        ssl: { rejectUnauthorized: true },
      });
    }
    return this.connection;
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
    }
  }
}
