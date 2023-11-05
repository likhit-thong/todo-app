import { config } from './utils/config';
import { createServer } from './utils/createServer';
import { connectToDb, disconnectFromDb } from './utils/db';
import { logger } from './utils/logger';

const signals = ['SIGINT', 'SIGTERM', 'SIGHUP'] as const;
type GracefullShutdownInput = {
  signal: (typeof signals)[number];
  server: Awaited<ReturnType<typeof createServer>>;
};

async function gracefulShutdown({ signal, server }: GracefullShutdownInput) {
  logger.info(`Got Server ${signal}. Good bye`);
  await server.close();
  await disconnectFromDb();
  process.exit(1);
}

async function startServer() {
  const server = await createServer();
  server.listen({
    port: config.PORT,
    host: config.HOST,
  });

  await connectToDb();

  logger.info(`App is listening`);

  for (let i = 0; i < signals.length; i++) {
    process.on(signals[i], () =>
      gracefulShutdown({
        signal: signals[i],
        server,
      }),
    );
  }
}

startServer();
