import config from '../config/config';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Gatby RSS reader API',
    version: '0.0.1',
    description: 'Anti-Social RSS Reader',
    license: {
      name: 'MIT',
      url: 'https://github.com/d-line/toro.git',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'Development Server',
    },
  ],
};

export default swaggerDefinition;
