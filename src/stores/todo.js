import { defineStore } from "pinia";

// init todolist store
export const useTodoStore = defineStore({
  id: "todo",
  state: () => {
    if (localStorage.getItem("list"))
      return { list: JSON.parse(localStorage.getItem("list")) };
    return {
      list: [],
    };
  },

  getters: {
    // get number task active
    getTaskActive() {
      const taskUnCompleted = this.list.filter((el) => el.completed !== true);
      return taskUnCompleted.length;
    },

    // get number task completed
    checkTaskCompleted() {
      return this.list.some((el) => el.completed === true);
    },

    tasksActive() {
      return (isActive) =>
        this.list.filter((el) => {
          if (isActive) return el.completed !== true;

          return el.completed === true;
        });
    },
  },

  actions: {
    // action add task list
    onAddTask(payload) {
      this.list.push(payload);
    },

    // toggle status todolist
    onToggleComplete() {
      const taskUnCompleted = this.list.some((el) => el.completed === false);

      this.list.forEach((el) => {
        if (el.completed !== true) {
          el.completed = true;
        }

        if (!taskUnCompleted) {
          el.completed = false;
        }
      });
    },

    // action delete task by id
    onDeleteTask(id) {
      this.list = this.list.filter((el) => el.id !== id);
    },

    // action clear task completed
    onClearCompleted() {
      this.list = this.list.filter((el) => el.completed !== true);
    },

    // action change task name by id
    onChangeNameTask(payload) {
      const { id, name: newName } = payload;

      if (newName !== "") {
        this.list.forEach((el) => {
          if (el.id == id) {
            el.name = newName;
            return;
          }
        });
      } else {
        this.list = this.list.filter((el) => el.id !== id);
      }
    },
  },
});
