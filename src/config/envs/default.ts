import { join } from 'path';

export const config = {
  aws: {
    access_key_id: 'access_key_id',
    secret_access_key: 'secret_access_key',
    region: 'region',
  },
  graphql: {
    debug: true,
    playground: {
      settings: {
        'request.credentials': 'include',
      },
    },
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // true,
    autoTransformHttpErrors: true,
    // cors: { credentials: true },
    sortSchema: true,
    buildSchemaOptions: { dateScalarMode: 'timestamp' },
    // installSubscriptionHandlers: true,
  },
  hello: 'world',
  jwtSecret: process.env.JWT_SECRET,
};
