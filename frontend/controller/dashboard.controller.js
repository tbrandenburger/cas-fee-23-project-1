"use strict";
$(document).ready(function(){
    App.DashboardController = {

        template: 'dashboard',

        init: function() {

            /* if (localStorage.getItem('noteShowFinish') !== null){
                App.ViewController.showFinish = localStorage.getItem('noteShowFinish');
            } */

            this.getAllNotes();
        },

        getAllNotes: function () {
            var self = this;

            console.log('getallnotes')
        }
    }
});




