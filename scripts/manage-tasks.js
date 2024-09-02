import { TaskRecord } from "./tasks.js";

$(function () {
  const tasks = new TaskRecord('tasks');
  loadTasks();
  $( "#dialog-confirm" ).dialog({
    autoOpen: false,
    resizable: false,
    height: "auto",
    width: 'min(90%, 600px)',
    modal: true,
    show: { effect: "scale", duration: 200 },
    hide: { effect: "scale", duration: 200 }
  });
  $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 500,
    minWidth: 500,
    minHeight: 500,
    width: 'min(90%, 500px)',
    modal: true,
    open: function() {
      $('.alert').fadeOut(0);
      $('#dialog-form #task-repeat').selectmenu({
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
          const taskRepeatEveryElem = $('#dialog-form #task-repeat-every');
          const taskRepeatVal = $('#dialog-form #task-repeat').val();
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
      $('#dialog-form #task-repeat-every').selectmenu({
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
    },
    show: { effect: "clip", duration: 200},
    hide: { effect: "clip", duration: 200 }
  });
  $('.input-fields button:last-child').on('click', () => {
    $( "#dialog-form" ).dialog("close");
  });
  function loadTasks () {
    $('main').html('');
    tasks.taskItems.forEach(taskItem => {
      $('main').append(`
          <section class="task-info">
            <div class="task-details">
              <div>
                <h3 id="task-name">${taskItem.taskName}</h6>
                <p id="task-desc">${taskItem.taskDesc}</p>
              </div>
              <div>
                <h3 id="task-repeat">Every ${tasks.capitalize(taskItem.taskRepeat)}</h6>
                <p id="task-repeat-every">${tasks.getRepeatEvery(taskItem)}</p>
              </div>
            </div>
            <div class="action-list">
              <button class="edit-action">Edit</button>
              <button class="move-up-action"><i class="fa-solid fa-angle-up"></i></button>
              <button class="remove-action">Remove</button>
              <button class="move-down-action"><i class="fa-solid fa-angle-down"></i></button>
            </div>
          </section>
        `);
    });
    $('.remove-action').each((index, element) => {
      $(element).on('click', () => {
        $( "#dialog-confirm" ).dialog( "option", "buttons", 
          [
            {
              text: "Remove",
              click: function() {
                tasks.removeTask(index);
                loadTasks();
                $( this ).dialog( "close" );
              }
            },
            {
              text: "Cancel",
              click: function() {
                $( this ).dialog( "close" );
              }
            }
          ]
        ).dialog("open");
      });
    });
    $('.move-up-action').each((index, element) => {
      $(element).on('click', () => {
        tasks.moveUp(index);
        if (index !== 0) {
          loadTasks();
        }
      });
    });
    $('.move-down-action').each((index, element) => {
      $(element).on('click', () => {
        tasks.moveDown(index);
        if (index !== tasks.taskItems.length - 1) {
          loadTasks();
        }
      });
    });
    $('.edit-action').each((index, element) => {
      $(element).on('click', () => {
        $( "#dialog-form" ).dialog("open");
        $('.input-fields #task-name-input').val(tasks.taskItems[index].taskName);
        $('.input-fields #task-desc-input').val(tasks.taskItems[index].taskDesc === 'No description.' ? '' : tasks.taskItems[index].taskDesc);
        $('.input-fields #task-repeat').val(tasks.taskItems[index].taskRepeat).triggerHandler('change');
        $('.input-fields #task-repeat').selectmenu( "refresh" );
        if (tasks.taskItems[index].taskRepeat !== 'day') {
          const taskRepeatEveryElem = $('#dialog-form #task-repeat-every');
          const taskRepeatVal = $('#dialog-form #task-repeat').val();
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
          $('.input-fields #task-repeat-every').val(tasks.taskItems[index].taskRepeatEvery).triggerHandler('change');
          $('.input-fields #task-repeat-every').selectmenu( "refresh" );
        }
        $('.input-fields button:first-of-type').off('click');
        $('.input-fields button:first-of-type').on('click', () => {
          const isValidInput = $('.input-fields #task-repeat').val() === 'day' && $('.input-fields #task-name-input').val() && $('.input-fields #task-repeat').val() || $('.input-fields #task-name-input').val() && $('.input-fields #task-repeat').val() && $('.input-fields #task-repeat-every').val();
          if (isValidInput) {
            tasks.editTask(index, $('.input-fields #task-name-input').val(), $('.input-fields #task-desc-input').val(), $('.input-fields #task-repeat').val(), $('.input-fields #task-repeat-every').val());
            loadTasks();
            $( "#dialog-form" ).dialog("close");
          } else {
            if ($('.alert').queue().length === 0) {
              $('.alert').slideDown(300).delay( 2000 ).slideUp(1000);
            }
          }
        });
      });
    });
  }
});