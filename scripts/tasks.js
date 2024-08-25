export class TaskRecord {
  taskItems;
  #localStorageKey;
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.taskItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  addTask(taskName, taskDesc = '', taskRepeat, taskRepeatEvery) {
    if (arguments.length === 3) {
      this.taskItems.push(new Task(taskName, '', taskDesc, taskRepeat));
    } else {
      this.taskItems.push(new Task(taskName, taskDesc, taskRepeat, taskRepeatEvery));
    }
    this.saveToStorage();
  }

  removeTask(index) {
    this.taskItems.splice(index, 1);
  }

  toggleDone(index) {
    this.taskItems[index].updateTaskCompletion();
    this.saveToStorage();
  }

  updateTask (index, taskDetails) {
    if (taskDetails.hasOwnProperty('taskName')) {
      this.taskItems[index].taskName = taskDetails.taskName;
    } 
    if (taskDetails.hasOwnProperty('taskDesc')) {
      this.taskItems[index].taskDesc = taskDetails.taskDesc;
    } 
    if (taskDetails.hasOwnProperty('taskRepeat')) {
      this.taskItems[index].taskRepeat = taskDetails.taskRepeat;
    } 
    if (taskDetails.hasOwnProperty('taskRepeatEvery')) {
      this.taskItems[index].taskRepeatEvery = taskDetails.taskRepeatEvery;
    }
    this.saveToStorage();
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.taskItems));
  }
}

export class Task {
  taskName;
  taskDesc;
  taskRepeat;
  taskRepeatEvery;
  done = false;

  constructor(taskName, taskDesc = '', taskRepeat, taskRepeatEvery) {
    this.taskName = taskName;
    this.taskDesc = taskDesc;
    this.taskRepeat = taskRepeat;
    this.taskRepeatEvery = taskRepeatEvery;
  }

  updateTaskCompletion() {
    this.done = this.done ? false : true;
  }
}