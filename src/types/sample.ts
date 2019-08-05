import { GraphQLObjectType, GraphQLString } from 'graphql';

const SampleType = new GraphQLObjectType({
  name: 'SampleType',
  description: 'This is a sample graphql type',
  fields: () => ({
    hello: {
      type: GraphQLString,
      description: 'Returns hello world',
    },
  }),
});

export default SampleType;
