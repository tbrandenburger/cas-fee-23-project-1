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
    }
  };
});
