'use strict';
$(document).ready(function () {
  App.NoteServices = {
    apiRoot: 'http://localhost:3000/graphql',

    getAllNotes: async function () {
      const response = await fetch(this.apiRoot, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            query {
              todos {
                  title,
                  description
                }
            }
          `,
          variables: {
            now: new Date().toISOString()
          }
        })
      });

      return await response.json();
    },

    addNote: async function (note) {
      const response = await fetch(this.apiRoot, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation {
              createTodo(title: "date2", description: "test", dueDate: $dueDate, createDate: "2016-07-11T14:32:00.000Z") {
                  id,
                  title,
                  description
                }
            }
          `,
          variables: {
            dueDate: new Date().toISOString()
          }
        })
      });

      return await response.json();
    }
  };
});

