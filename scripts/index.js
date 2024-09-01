import { TaskRecord } from "./tasks.js";

$(function () {
  const tasks = new TaskRecord('tasks');
  tasks.taskItems.forEach(taskItem => {
    $('main').append(`
        <section class="task-info">
          <div class="task-details">
            <h3 id="task-name">${taskItem.taskName}</h6>
            <p id="task-desc">${taskItem.taskDesc}</p>
          </div>
          <label class="container">Done
            <input type="checkbox" ${taskItem.done ? 'checked="checked"' : ''}>
            <span class="checkmark"></span>
          </label>
        </section>
      `);
  });
});