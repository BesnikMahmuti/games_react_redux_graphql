const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,

  GraphQLInt,
} = require("graphql");
const { publishers, games } = require("./dummy_data.json");
const app = express();

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents a book written by an author",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find((author) => author.id === book.id);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents an author of a book",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find((author) => author.id === book.id);
      },
    },
  }),
});

const GameType = new GraphQLObjectType({
  name: "Game",
  description: "This is the type that represents the game details",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    name: { type: GraphQLString },
    published_date: { type: GraphQLString },
    platforms: { type: GraphQLString },
    banner_url: { type: GraphQLString },
    publisher: {
      type: PublisherType,
      resolve: (game) => {
        return publishers.find(
          (publisher) => publisher.developer_id === game.developer_id
        );
      },
    },
  }),
});

const TotalGames = new GraphQLObjectType({
  name: "GamesPaginationDetails",
  description: "This is the type that represents the Games Pagination Details",
  fields: () => ({
    total: { type: GraphQLInt },
  }),
});

const PublisherType = new GraphQLObjectType({
  name: "Publisher",
  description: "This is the type that represents the game publisher details",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },
    name: { type: GraphQLNonNull(GraphQLString) },
    headquarters: { type: GraphQLString },
    founders: { type: GraphQLString },
    founded: { type: GraphQLString },
  }),
});

// const authors = [
//   { id: 1, name: "J. K. ROWLING" },
//   {
//     id: 3,
//     name: "Bent Weeks",
//   },
// ];

// const books = [
//   { id: 1, name: "Harry Potter and the Chamber of Secrets", authorId: 1 },
//   { id: 2, name: "Harry Potter and the Prisoner of Azkaban", authorId: 3 },
// ];

const rootQuery = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    // book: {
    //   type: BookType,
    //   description: "A single book",
    //   args: {
    //     id: { type: GraphQLInt },
    //   },
    //   resolve: (parent, args) => books.find((book) => book.id === args.id),
    // },
    // books: {
    //   type: new GraphQLList(BookType),
    //   description: "List of all books",
    //   resolve: () => books,
    // },
    // authors: {
    //   type: new GraphQLList(AuthorType),
    //   description: "List of all authors",
    //   resolve: () => authors,
    // },
    games: {
      type: new GraphQLList(GameType),
      description: "List of all games",
      args: {
        limit: { type: GraphQLNonNull(GraphQLInt) },
        offset: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        console.log(parent, args, games);
        const paginatedGames = [...games];
        return paginatedGames.splice(args.offset, args.limit);
      },
    },
    gamespagination: {
      type: new GraphQLList(TotalGames),
      description: "Games pagination details",
      resolve: () => {
        return [{ total: games.length }];
      },
    },
    publishers: {
      type: new GraphQLList(PublisherType),
      description: "List of all publishers",
      resolve: () => publishers,
    },
  }),
});

const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Root mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a book",
      args: {
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        };
        books.push(book);
        return book;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

app.use(cors());

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.listen(5000, () => console.log("Server listening on port 5000...."));
