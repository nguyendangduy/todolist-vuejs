<template>
  <form @submit.prevent="onSubmit" class="p-form">
    <button
      type="button"
      class="c-button-toggle"
      @click="onToggleComplete"
    ></button>
    <div class="p-form__field-wrapper">
      <input
        type="text"
        v-model="inputTask"
        class="c-text-field c-text-field--form"
        placeholder="What needs to be done?"
      />
    </div>
  </form>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useTodoStore } from "@/stores/todo";
import { v4 as uuid } from "uuid";

export default defineComponent({
  setup() {
    const inputTask = ref("");
    const todo = useTodoStore();
    const { onToggleComplete, onAddTask } = todo;

    const onSubmit = () => {
      const taskName = inputTask.value.trim();

      if (taskName) {
        const task = {
          id: uuid(),
          name: taskName,
          completed: false,
        };

        inputTask.value = "";
        onAddTask(task);
      }
    };

    return { inputTask, onSubmit, onToggleComplete };
  },
});
</script>
