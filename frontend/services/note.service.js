"use strict";
$(document).ready(function(){
    App.NoteServices = {

        apiRoot: 'http://localhost:3000',

        getAllNotes: async function (){

            const response = await fetch(this.apiRoot + '/notes.json');
            const jsonData = await response.json();
            console.log(jsonData);
            return jsonData

        }
    };
});
