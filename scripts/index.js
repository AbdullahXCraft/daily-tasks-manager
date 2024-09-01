import { TaskRecord } from "./tasks.js";

$(function () {
  const tasks = new TaskRecord('tasks');
  loadTasks();
  function loadTasks () {
    tasks.taskItems.forEach(taskItem => {
      let displayTask = false;
      if (taskItem.taskRepeat === 'day') {
        displayTask = true;
      } else if (taskItem.taskRepeat === 'week' && dayjs().format('ddd').toLowerCase() === taskItem.taskRepeatEvery) {
        displayTask = true;
      } else if (taskItem.taskRepeat === 'month' && dayjs().format('D') === taskItem.taskRepeatEvery) {
        displayTask = true;
      }
      if (displayTask) {
        $('main').append(`
          <section class="task-info">
            <div class="task-details">
              <h3 id="task-name">${taskItem.taskName}</h6>
              <p id="task-desc">${taskItem.taskDesc}</p>
            </div>
            <label class="container">Done
              <input type="checkbox" ${isDone(taskItem)}>
              <span class="checkmark"></span>
            </label>
          </section>
        `);
      }
    });
  }

  function isDone (task) {
    return task.done.includes(dayjs().format('DD/MM/YYYY')) ? 'checked="checked"' : '';
  }

  $('input[type="checkbox"]').each((index, element) => {
    $(element).on('change', () => {
      tasks.toggleDone(index);
    });
  });
});
