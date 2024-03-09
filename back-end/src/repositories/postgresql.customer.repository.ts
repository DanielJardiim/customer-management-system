import { Pool } from 'pg';
import { ICustomerProps } from '../interfaces/customer.entity.interface';
import { ICustomerRepository } from '../interfaces/customer.repository.interface';

export class PostgresqlCustomerRepository implements ICustomerRepository {
  constructor(private readonly pool: Pool) {}

  async getAll(): Promise<ICustomerProps[]> {
    const result = await this.pool.query(`SELECT * FROM customers`);
    return result.rows;
  }

  async getByFilter(
    filterkey: string,
    filtervalue: any
  ): Promise<ICustomerProps[]> {
    const result = await this.pool.query(
      `SELECT * FROM customers WHERE ${filterkey} = $1`,
      [filtervalue]
    );
    return result.rows;
  }

  async create(customer: ICustomerProps): Promise<ICustomerProps> {
    const result = await this.pool.query(
      `INSERT INTO customers (name, email, phonenumber, coordinates) VALUES ($1, $2, $3, POINT($4, $5)) RETURNING *`,
      [
        customer.name,
        customer.email,
        customer.phonenumber,
        customer.coordinates.x,
        customer.coordinates.y,
      ]
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<void> {
    await this.pool.query(`DELETE FROM customers WHERE id = $1`, [id]);
  }
}
