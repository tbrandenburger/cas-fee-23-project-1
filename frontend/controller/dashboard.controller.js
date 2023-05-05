"use strict";
$(document).ready(function () {
    App.DashboardController = {

        template: 'dashboard',

        init: function () {

            /* if (localStorage.getItem('noteShowFinish') !== null){
                App.ViewController.showFinish = localStorage.getItem('noteShowFinish');
            } */

            this.getAllNotes();
        },

        getAllNotes: async function () {
            const self = this;
            const result = await App.NoteServices.getAllNotes();
            console.log('getallnotest', result);
        }
    }
});




