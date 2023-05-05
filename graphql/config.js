const graphql = require("graphql");
const sqlite3 = require('sqlite3').verbose();
const database = new sqlite3.Database("./database/todos.db");
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;



const ContactType = GraphQLObjectType({
    name: "Contact",
    fields: {
        id: { type: graphql.GraphQLID },
        title: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString }
    }
});

const queryType = GraphQLObjectType({
    name: 'Query',
    fields: {
        contacts: {
            type: graphql.GraphQLList(ContactType),
            resolve: (root, args, context, info) => {
                return new Promise((resolve, reject) => {

                    database.all("SELECT * FROM todos;", function (err, rows) {
                        if (err) {
                            reject([]);
                        }
                        resolve(rows);
                    });
                });

            }
        },
        contact: {
            type: ContactType,
            args: {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                }
            },
            resolve: (root, {
                id
            }, context, info) => {
                return new Promise((resolve, reject) => {

                    database.all("SELECT * FROM todos WHERE id = (?);", [id], function (err, rows) {
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

const mutationType = GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createContact: {
            type: ContactType,
            args: {
                title: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
                description: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                }
            },
            resolve: (root, {
                title,
                description
            }) => {
                return new Promise((resolve, reject) => {
                    database.run('INSERT INTO todos (title, description) VALUES (?,?,?);', [title, description], (err) => {
                        if (err) {
                            reject(null);
                        }
                        database.get("SELECT last_insert_rowid() as id", (err, row) => {

                            resolve({
                                id: row["id"],
                                title: title,
                                description: description
                            });
                        });
                    });
                })

            }
        },
        updateContact: {
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
                }
            },
            resolve: (root, {
                id,
                title,
                description
            }) => {
                return new Promise((resolve, reject) => {
                    database.run('UPDATE contacts SET title = (?), description = (?) WHERE id = (?);', [title, description, id], (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(`Contact #${id} updated`);

                    });
                })
            }
        },
        deleteContact: {
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
                    database.run('DELETE from contacts WHERE id =(?);', [id], (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(`Contact #${id} deleted`);

                    });
                })

            }
        }
    }
});

const schema = GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

module.exports = {
    queryType,
    mutationType,
    schema
};
