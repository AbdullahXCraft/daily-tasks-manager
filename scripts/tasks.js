export class TaskRecord {
  taskItems;
  #localStorageKey;
  #days = {
    'sun': 'Sunday',
    'mon': 'Monday',
    'tue': 'Tuesday',
    'wed': 'Wednesday',
    'thu': 'Thursday',
    'fri': 'Friday',
    'sat': 'Saturday'
  };
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.taskItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{"taskName":"Do Laundry","taskDesc":"Ps don't forget to clean the ropes","taskRepeat":"day","taskRepeatEvery":null,"done":['2024-09-01']}];
  }

  addTask(taskName, taskDesc, taskRepeat, taskRepeatEvery) {
    if (!taskDesc) {
      taskDesc = 'No description.';
    }
    const newTask = {
      taskName,
      taskDesc,
      taskRepeat,
      taskRepeatEvery,
      done: []
    }
    this.taskItems.push(newTask);
    this.saveToStorage();
  }

  editTask(index, taskName, taskDesc, taskRepeat, taskRepeatEvery) {
    if (!taskDesc) {
      taskDesc = 'No description.';
    }
    const editedTask = {
      taskName,
      taskDesc,
      taskRepeat,
      taskRepeatEvery,
      done: []
    }
    this.taskItems[index] = editedTask;
    this.saveToStorage();
  }

  removeTask(index) {
    this.taskItems.splice(index, 1);
    this.saveToStorage();
  }

  moveUp(index) {
    if (index !== 0) {
      const temp = this.taskItems[index];
      this.taskItems[index] = this.taskItems[index - 1];
      this.taskItems[index - 1] = temp;
      this.saveToStorage();
    }
  }

  moveDown(index) {
    if (index !== this.taskItems.length - 1) {
      const temp = this.taskItems[index];
      this.taskItems[index] = this.taskItems[index + 1];
      this.taskItems[index + 1] = temp;
      this.saveToStorage();
    }
  }

  toggleDone(index) {
    if (this.taskItems[index].done.includes(dayjs().format('YYYY-MM-DD'))) {
      this.taskItems[index].done.splice(this.taskItems[index].done.indexOf(dayjs().format('YYYY-MM-DD')), 1);
    } else {
      this.taskItems[index].done.push(dayjs().format('YYYY-MM-DD'));
    }
    this.saveToStorage();
  }

  capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  getRepeatEvery(task) {
    if (task.taskRepeat === 'day') {
      return '';
    } else if (task.taskRepeat === 'week') {
      return 'Every ' + this.#days[task.taskRepeatEvery];
    } else if (task.taskRepeat === 'month') {
      let ordinalSuffix = 'th';
      if (task.taskRepeatEvery == 1) {
        ordinalSuffix = 'st';
      } else if (task.taskRepeatEvery == 2) {
        ordinalSuffix = 'nd';
      } else if (task.taskRepeatEvery == 3) {
        ordinalSuffix = 'rd';
      }
      return 'Every ' + task.taskRepeatEvery + ordinalSuffix;
    }
  }

  getTaskData(index) {
    let values = [];
    this.taskItems[index].done.forEach(element => {
      values.push([element, 1]);
    });
    return values;
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.taskItems));
  }
}