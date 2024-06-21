<template>
  <div class="l-todoList">
    <h1 class="p-title">todos</h1>
    <Form />
    <template v-if="todo.list.length > 0">
      <div v-if="filterCurrent === 'all'">
        <template v-for="task in todo.list">
          <TaskItem :task="task" />
        </template>
      </div>
      <div v-else-if="filterCurrent === 'active'">
        <template v-for="task in todo.tasksActive(true)">
          <TaskItem :task="task" />
        </template>
      </div>
      <div v-else>
        <template v-for="task in todo.tasksActive()">
          <TaskItem :task="task" />
        </template>
      </div>
      <Action :filterCurrent="filterCurrent" @filter="changeFilter" />
    </template>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useTodoStore } from "@/stores/todo";
import TaskItem from "@/components/task";
import Form from "@/components/form";
import Action from "@/components/action";

export default defineComponent({
  components: {
    TaskItem,
    Form,
    Action,
  },

  setup() {
    const todo = useTodoStore();
    //actions from store
    const { onFilterTaskList } = todo;
    const filterCurrent = ref("all");

    const changeFilter = (value) => {
      filterCurrent.value = value;
    };

    return {
      todo,
      Form,
      Action,
      TaskItem,
      filterCurrent,
      onFilterTaskList,
      changeFilter,
    };
  },
});
</script>
