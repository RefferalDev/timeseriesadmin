import gql from 'graphql-tag';
import storage from './storage';

export const getConnections = (cache: any) => {
  const { connections } = cache.readQuery({
    query: gql`
      {
        connections @client {
          id
          url
          u
          p
          db
          unsafeSsl
        }
      }
    `,
  });
  if (!connections) {
    // initialize if empty
    return [];
  }
  return connections;
};

export const updateConnections = (cache: any, connections: {}[]) => {
  storage.set('connections', JSON.stringify(connections));
  cache.writeData({
    data: {
      connections,
    },
  });
};
