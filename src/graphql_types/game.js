import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
} from "graphql";
import exports from "webpack";
import { publishers } from "../dummyData.json";

export const GameType = new GraphQLObjectType({
  name: "Game",
  description: "This is the type that represents the game details",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    name: { type: GraphQLNonNull(GraphQLString) },
    published_date: { type: GraphQLNonNull(GraphQLString) },
    publisher: {
      type: PublisherType,
      resolve: (game) => {
        return publishers.find(
          (publisher) => publisher.developer_id === game.id
        );
      },
    },
  }),
});
