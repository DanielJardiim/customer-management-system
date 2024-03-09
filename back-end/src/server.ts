import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { userRoutes } from './routes/customer.route';

const createApp = (): FastifyInstance => {
  return Fastify({ logger: true });
};

const startApp = async (app: FastifyInstance, port: number) => {
  try {
    await app.listen({ port });
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log('Error starting server:', error);
    process.exit(1);
  }
};

const initializeApp = async () => {
  const app = createApp();

  // Registrar middlewares
  await app.register(cors);
  await app.register(userRoutes, { prefix: '/customers' });

  return app;
};

const main = async () => {
  const port: number = 3333;
  const app: FastifyInstance = await initializeApp();

  await startApp(app, port);
};

main();
