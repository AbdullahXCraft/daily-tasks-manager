export class TaskRecord {
  taskItems;
  #localStorageKey;
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.taskItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{"taskName":"Do Laundry","taskDesc":"Ps don't forget to clean the ropes","taskRepeat":"day","taskRepeatEvery":null,"done":['01/09/2024']}];
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

  removeTask(index) {
    this.taskItems.splice(index, 1);
  }

  toggleDone(index) {
    if (this.taskItems[index].done.includes(dayjs().format('DD/MM/YYYY'))) {
      this.taskItems[index].done.splice(this.taskItems[index].done.indexOf(dayjs().format('DD/MM/YYYY')), 1);
    } else {
      this.taskItems[index].done.push(dayjs().format('DD/MM/YYYY'));
    }
    console.log(this.taskItems[index].done);
    this.saveToStorage();
  }

  test() {
    console.log(dayjs());
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.taskItems));
  }
}