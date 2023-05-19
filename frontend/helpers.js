'use strict';
const Helpers = {
  // Get a specific url parameter
  getQueryVariable: function (variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');

    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (pair[0] === variable) {
        return pair[1];
      }
    }
  },

  checkInputDateFormat: function (dateString) {
    let checkPassed = false;
    const pattern = new RegExp(/^\d{1,2}([.\/-])\d{1,2}([.\/-])\d{4}$/);
    checkPassed = pattern.test(dateString);

    return checkPassed;
  },

  isoStringToUtcString: function (dateTimeString) {
    try {
      let dateStringParts = dateTimeString.split(' ');
      const dateString = dateStringParts[0];
      const timeString = dateStringParts[1];
      dateStringParts = dateString.split('.');
      const timeStringParts = timeString.split(':');

      const year = Number(dateStringParts[2]);
      const month = Number(dateStringParts[1]) - 1;
      const day = Number(dateStringParts[0]);
      const hour = Number(timeStringParts[0]);
      const minutes = Number(timeStringParts[1]);
      const seconds = 0;

      const dateObject = new Date(year, month, day, hour, minutes, seconds);

      return dateObject.toUTCString();
    } catch (err) {
      return dateTimeString;
    }
  },

  setImportance: function (element) {
    const importance = element.data('importance');
    const noteId = element.data('note-id');

    $('span[data-note-id="' + noteId + '"] .material-icons.importance').each(function () {
      const currentElement = $(this);
      currentElement.data('selectedimportance', importance);
    });
  },

  hoverImportance: function (element) {
    const importance = element.data('importance');
    const noteId = element.data('note-id');

    $('span[data-note-id="' + noteId + '"] .material-icons.importance').each(function () {
      const currentElement = $(this);

      if (currentElement.data('importance') <= importance) {
        currentElement.addClass('importance-selected');
        currentElement.html('star');
      } else {
        currentElement.removeClass('importance-selected');

        if (currentElement.data('importance') > importance) {
          currentElement.html('star_border');
        }
      }
    });
  },

  hoverImportanceClear: function (element, importance) {
    const noteId = element.data('note-id');

    $('span[data-note-id="' + noteId + '"] .material-icons.importance').each(function () {
      const currentElement = $(this);
      const importance = currentElement.data('importance');
      const selectedimportance = currentElement.data('selectedimportance');

      currentElement.removeClass('importance-selected');

      if (importance <= selectedimportance) {
        currentElement.html('star');
      } else {
        currentElement.html('star_border');
      }
    });
  }
};
