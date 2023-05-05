"use strict";
var App = {
    ViewController: {
        // View controller members
        locale: 'de-DE',
        translations: {},
        notes: [],
        sort: 'dueDateDesc',
        showFinish: false,
        importances: ['1', '2', '3', '4', '5'],
        styles: [{name: 'Light', key: 'style-1'}, {name: 'Dark', key: 'style-2'}],
        style: 'style-1',
        message: {
            text: '',
            type: ''
        },

        // APP Init Methods     --------------------------------------------------------
        // =============================================================================

        // Init all required settings for the app
        init: function () {
            var self = this;

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve("foo");
                }, 300);
            });
        },

        // Show the page desired based on the action url parameter
        // This method is called after the application is initialized completely
        show: function () {
            console.log('show app');
        },


    },


    // Init method for the app
    init: function () {
        // Init the controller
        $.when(App.ViewController.init()).done(function (loaded) {
                // Show the view after init the app
                App.ViewController.show();
            }
        );
    }
};

// initialize the app
App.init();
