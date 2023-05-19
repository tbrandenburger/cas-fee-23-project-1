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
      App.DashboardController.registerEventHandler();

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
    },
    registerEventHandler: function () {
      const self = this;

      $('#dashboard-sort-duedate').on('click', function () {
        if (App.ViewController.sort === 'dueDateDesc') {
          self.sortNotes('dueDateAsc');
        } else if (App.ViewController.sort === 'dueDateAsc') {
          self.sortNotes('dueDateDesc');
        } else {
          self.sortNotes('dueDateDesc');
        }
      });

      $('#dashboard-sort-createdate').on('click', function () {

        if (App.ViewController.sort === 'createDateDesc') {
          self.sortNotes('createDateAsc');
        } else if (App.ViewController.sort === 'createDateAsc') {
          self.sortNotes('createDateDesc');
        } else {
          self.sortNotes('createDateDesc');
        }
      });

      $('#dashboard-sort-importance').on('click', function () {

        if (App.ViewController.sort === 'importanceDesc') {
          self.sortNotes('importanceAsc');
        } else if (App.ViewController.sort === 'importanceAsc') {
          self.sortNotes('importanceDesc');
        } else {
          self.sortNotes('importanceDesc');
        }
      });

      $('#dashboard-display-all').on('click', function () {
        self.displayNotes('all');
      });

      $('#dashboard-display-open').on('click', function () {
        self.displayNotes('open');
      });

      $('#style-switcher').on('change', function () {
        App.ViewController.setStyle($(this).val());
      });

      $('.label-delete').on('click', function () {
        // App.ViewController.deleteNote($(this).data( 'note-id' ));
        self.confirmDelete($(this).data('note-id'));
      });

      $('.confirmDelete').on('click', function () {
        self.deleteNote($(this).data('note-id'));
      });

      $('.dismissDelete').on('click', function () {
        self.dismissDelete($(this).data('note-id'));
      });

      $('.label-done').on('click', function () {
        self.setNoteDone($(this).data('note-id'));
      });

      $('#message').show().delay(3000).fadeOut(1500, 'swing', function () {
        App.ViewController.clearMessage();
      });
    }
  };
});
