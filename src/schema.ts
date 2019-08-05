import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import sampleController from './controllers/sample';
import SampleType from './types/sample';

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'The query root of Nert.',
  fields: () => ({
    sample: {
      type: SampleType,
      description: 'A sample root schema',
      resolve: () => sampleController(),
    },
  }),
});

const schema = new GraphQLSchema({
  query,
});

export default schema;
