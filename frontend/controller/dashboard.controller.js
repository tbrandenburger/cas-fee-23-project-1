'use strict';
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
      const todos = result.data.todos;
      console.log('todos', todos);

      App.ViewController.todos = result.notes;

      // todo: --> self.sortNotes(App.ViewController.sort);

      const data = {
        todos,
        style: App.ViewController.style
      };

      if (App.ViewController.message.text) {
        data.message = {
          text: App.ViewController.message.text,
          type: App.ViewController.message.type
        };
      }

      self.renderView(data);
    },
    setView: function () {
      // register eventhandlers for buttons
      // todo: --> App.DashboardController.registerEventHandler();

      if (App.ViewController.showFinish) {
        $('#dashboard-display-all').addClass('label-active');
        $('#dashboard-display-open').removeClass('label-active');
      } else {
        $('#dashboard-display-all').removeClass('label-active');
        $('#dashboard-display-open').addClass('label-active');
      }
    },
    renderView: function (data) {
      const self = this;
      $.when(App.ViewController.compileHandlebar(this.template, data)).done(function (compiledHtml) {
        $('#main-container').html(compiledHtml);
        self.setView();
      });
    }
  };
});
