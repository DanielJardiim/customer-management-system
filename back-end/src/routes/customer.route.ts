import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {
  calculateOptimalRouteCustomerController,
  createCustomerController,
  deleteCustomerController,
  getAllCustomerController,
  getByFilterCustomerController,
} from '../dependencies/customer.dependencyInjection';

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await createCustomerController.handle(request, reply);
  });

  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await getAllCustomerController.handle(request, reply);
  });

  fastify.get(
    '/filter',
    async (request: FastifyRequest, reply: FastifyReply) => {
      await getByFilterCustomerController.handle(request, reply);
    }
  );

  fastify.delete('/', async (request: FastifyRequest, reply: FastifyReply) => {
    await deleteCustomerController.handle(request, reply);
  });

  fastify.get(
    '/calculate-optimal-route',
    async (request: FastifyRequest, reply: FastifyReply) => {
      await calculateOptimalRouteCustomerController.handle(request, reply);
    }
  );
};
