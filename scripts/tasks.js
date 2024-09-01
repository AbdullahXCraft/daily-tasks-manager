export class TaskRecord {
  taskItems;
  #localStorageKey;
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.taskItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{"taskName":"Do Laundry","taskDesc":"Ps don't forget to clean the ropes","taskRepeat":"day","taskRepeatEvery":null,"done":true}];
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
      done: false
    }
    this.taskItems.push(newTask);
    this.saveToStorage();
  }

  removeTask(index) {
    this.taskItems.splice(index, 1);
  }

  toggleDone(index) {
    this.taskItems[index].done = taskItems[index].done ? false : true;
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