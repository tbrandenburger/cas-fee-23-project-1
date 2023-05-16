const graphql = require('graphql');
const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database('./database/todos.db');
const { GraphQLObjectType, GraphQLSchema, GraphQLList } = graphql;
const { dateTimeScalar } = require('./datetime');

const TodoType = new GraphQLObjectType({
  name: 'todos',
  fields: {
    id: { type: graphql.GraphQLID },
    title: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    importance: { type: graphql.GraphQLInt },
    dueDate: { type: dateTimeScalar },
    createDate: { type: dateTimeScalar },
    finishDate: { type: dateTimeScalar }
  }
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    todos: {
      type: new GraphQLList(TodoType),
      resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
          database.all('SELECT * FROM todos;', function (err, rows) {
            if (err) {
              reject([]);
            }
            resolve(rows);
          });
        });
      }
    },
    todo: {
      type: TodoType,
      args: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLID)
        }
      },
      resolve: (root, {
        id
      }, context, info) => {
        return new Promise((resolve, reject) => {
          database.all('SELECT * FROM todos WHERE id = (?);', [id], function (err, rows) {
            if (err) {
              reject(null);
            }
            resolve(rows[0]);
          });
        });
      }
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTodo: {
      type: TodoType,
      args: {
        title: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        description: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        importance: {
          type: graphql.GraphQLInt
        },
        dueDate: {
          type: new graphql.GraphQLNonNull(dateTimeScalar)
        },
        createDate: {
          type: new graphql.GraphQLNonNull(dateTimeScalar)
        },
        finishDate: {
          type: dateTimeScalar
        }
      },
      resolve: (root, {
        title,
        description,
        importance,
        dueDate,
        createDate,
        finishDate
      }) => {
        return new Promise((resolve, reject) => {
          console.log(title);
          database.run('INSERT INTO todos (title, description, importance, dueDate, createDate, finishDate) VALUES (?,?,?,?,?,?);', [title, description, importance, dueDate, createDate, finishDate], (err) => {
            if (err) {
              reject(null);
            }
            database.get('SELECT last_insert_rowid() as id', (err, row) => {
              resolve({
                id: row.id,
                title,
                description,
                importance,
                dueDate,
                createDate,
                finishDate
              });
            });
          });
        });
      }
    },
    updateTodo: {
      type: graphql.GraphQLString,
      args: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLID)
        },
        title: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        description: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        importance: {
          type: graphql.GraphQLInt
        },
        dueDate: {
          type: dateTimeScalar
        },
        createDate: {
          type: dateTimeScalar
        },
        finishDate: {
          type: dateTimeScalar
        }
      },
      resolve: (root, {
        id,
        title,
        description,
        importance,
        dueDate,
        createDate,
        finishDate
      }) => {
        return new Promise((resolve, reject) => {
          database.run('UPDATE todos SET title = (?), description = (?), importance = (?), dueDate = (?), createDate = (?), finishDate = (?) WHERE id = (?);', [title, description, importance, dueDate, createDate, finishDate, id], (err) => {
            if (err) {
              reject(err);
            }
            resolve(`Todo #${id} updated`);
          });
        });
      }
    },
    deleteTodo: {
      type: graphql.GraphQLString,
      args: {
        id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLID)
        }
      },
      resolve: (root, {
        id
      }) => {
        return new Promise((resolve, reject) => {
          database.run('DELETE from todos WHERE id =(?);', [id], (err) => {
            if (err) {
              reject(err);
            }
            resolve(`Todo #${id} deleted`);
          });
        });
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

module.exports = {
  queryType,
  mutationType,
  schema
};
