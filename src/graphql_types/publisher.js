import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from "graphql";

export const PublisherType = new GraphQLObjectType({
  name: "Publisher",
  description: "This is the type that represents the game publisher details",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    name: { type: GraphQLNonNull(GraphQLString) },
    headquarters: { type: GraphQLNonNull(GraphQLString) },
    founders: { type: GraphQLNonNull([GraphQLString]) },
    founded: { type: GraphQLNonNull([GraphQLString]) },
  }),
});
