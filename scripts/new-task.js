import { TaskRecord } from "./tasks.js";
$(function () {
  const tasks = new TaskRecord('tasks');
  $('#task-repeat').selectmenu({
    icons: { 
      button: "ui-icon-caret-1-s" 
    },
    open: (event) => {
      $(event.target).selectmenu( "option", "icons", { button: "ui-icon-caret-1-n" } );
    },
    close: (event) => {
      $(event.target).selectmenu( "option", "icons", { button: "ui-icon-caret-1-s" } );
    },
    change: () => {
      const taskRepeatEveryElem = $('#task-repeat-every');
      const taskRepeatVal = $('#task-repeat').val();
      if (taskRepeatVal === 'week') {
        taskRepeatEveryElem.html(`
          <option disabled="" selected="">Week day</option>
          <option value="sun">Every Sunday</option>
          <option value="mon">Every Monday</option>
          <option value="tue">Every Tuesday</option>
          <option value="wed">Every Wednesday</option>
          <option value="thu">Every Thursday</option>
          <option value="fri">Every Friday</option>
          <option value="sat">Every Saturday</option>
      `).selectmenu('enable');
      } else if (taskRepeatVal === 'month') {
        let options = '<option disabled="" selected="">Month day</option>';
        for (let index = 1; index < 30; index++) {
          let ordinalSuffix = 'th';
          if (index === 1) {
            ordinalSuffix = 'st';
          } else if (index === 2) {
            ordinalSuffix = 'nd';
          } else if (index === 3) {
            ordinalSuffix = 'rd';
          }
          options += `<option value="${index}">Every ${index}${ordinalSuffix} day</option>`;
        } 
        taskRepeatEveryElem.html(options).selectmenu('enable');
      } else if (taskRepeatVal === 'day') {
        taskRepeatEveryElem.html('<option value="day" disabled="" selected="">Unavailable</option>').selectmenu('disable');
      }
      taskRepeatEveryElem.selectmenu( "refresh" );
    }
  });
  $('#task-repeat-every').selectmenu({
    disabled: true,
    icons: { 
      button: "ui-icon-caret-1-s" 
    },
    open: (event) => {
      $(event.target).selectmenu( "option", "icons", { button: "ui-icon-caret-1-n" } );
    },
    close: (event) => {
      $(event.target).selectmenu( "option", "icons", { button: "ui-icon-caret-1-s" } );
    }
  }).selectmenu( "menuWidget" ).addClass( "overflow" );
  $('input[type="text"]').on('keyup', () => {
    if (!$('#task-name').val()) {
      $('#preview-name').html('Preview Name');
    } else {
      $('#preview-name').html($('#task-name').val());
    }
    if (!$('#task-desc').val()) {
      $('#preview-desc').html('Preview Description');
    } else {
      $('#preview-desc').html($('#task-desc').val());
    }
  });
  $('button').on('click', () => {
    console.log($('#task-repeat-every').val());
    if ($('#task-repeat').val() === 'day') {
      if ($('#task-name').val() && $('#task-repeat').val()) {
        tasks.addTask($('#task-name').val(), $('#task-desc').val(), $('#task-repeat').val(), $('#task-repeat-every').val());
      } else {
        console.log('All non optional fields must be filled');
      }
    } else {
      if ($('#task-name').val() && $('#task-repeat').val() && $('#task-repeat-every').val()) {
        tasks.addTask($('#task-name').val(), $('#task-desc').val(), $('#task-repeat').val(), $('#task-repeat-every').val());
      } else {
        console.log('All non optional fields must be filled');
      }
    }
    console.log(tasks.taskItems);
  });
});