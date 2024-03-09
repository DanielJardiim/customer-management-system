import dotenv from 'dotenv';
import { Pool } from 'pg';
import { PostgresqlCustomerRepository } from '../repositories/postgresql.customer.repository';
import { CreateCustomerController } from '../controllers/create.customer.controller';
import { CreateCustomerUseCase } from '../usecases/create.customer.usecase';
import { GetAllCustomerController } from '../controllers/getAll.customer.controller';
import { GetAllCustomerUseCase } from '../usecases/getAll.customer.usecase';
import { GetByFilterCustomerController } from '../controllers/getByFilter.customer.crontroller';
import { GetByFilterCustomerUseCase } from '../usecases/getByFilter.customer.usecase';
import { DeleteCustomerController } from '../controllers/delete.customer.controller';
import { DeleteCustomerUseCase } from '../usecases/delete.customer.usecase';
import { CalculateOptimalRouteCustomerController } from '../controllers/calculateOptimalRoute.customer.controller';
import { CalculateOptimalRouteCustomerUseCase } from '../usecases/calculateOptimalRoute.customer.usecase';

dotenv.config();

function customerDependencyInjectionConfig(
  Controller: any,
  UseCase: any,
  repository: any
) {
  const useCaseInstance = new UseCase(repository);
  return new Controller(useCaseInstance);
}

// Configurar conexão com o banco de dados
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
});
const postgresqlCustomerRepository = new PostgresqlCustomerRepository(pool);

export const createCustomerController = customerDependencyInjectionConfig(
  CreateCustomerController,
  CreateCustomerUseCase,
  postgresqlCustomerRepository
);

export const getAllCustomerController = customerDependencyInjectionConfig(
  GetAllCustomerController,
  GetAllCustomerUseCase,
  postgresqlCustomerRepository
);

export const getByFilterCustomerController = customerDependencyInjectionConfig(
  GetByFilterCustomerController,
  GetByFilterCustomerUseCase,
  postgresqlCustomerRepository
);

export const deleteCustomerController = customerDependencyInjectionConfig(
  DeleteCustomerController,
  DeleteCustomerUseCase,
  postgresqlCustomerRepository
);

export const calculateOptimalRouteCustomerController =
  customerDependencyInjectionConfig(
    CalculateOptimalRouteCustomerController,
    CalculateOptimalRouteCustomerUseCase,
    postgresqlCustomerRepository
  );
