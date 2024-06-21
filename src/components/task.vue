<template>
  <div class="p-task">
    <input
      :class="['c-checkbox-field', showEditField && 'c-checkbox-field--hidden']"
      type="checkbox"
      :data-check="task.completed"
      v-model="task.completed"
    />
    <label
      v-show="!showEditField"
      class="c-task-name"
      @dblclick="onShowEditField(task)"
    >
      {{ task.name }}</label
    >
    <button
      class="c-button-remove"
      type="button"
      @click="onDeleteTask(task.id)"
    ></button>
    <input
      id="task"
      ref="editField"
      v-show="showEditField"
      class="c-text-field c-text-field--task"
      type="text"
      v-on:blur="onHideField(task)"
      v-on:keyup.enter="onSaveNewName(task)"
      v-model="task.name"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useTodoStore } from "@/stores/todo";

export default defineComponent({
  props: {
    task: Object,
  },

  setup() {
    const todo = useTodoStore();
    //actions from store
    const { onChangeNameTask, onDeleteTask, onChangeStatusById } = todo;
    const showEditField = ref(false);
    const editField = ref(null);

    // show edit field and set focus
    const onShowEditField = () => {
      showEditField.value = true;

      setTimeout(() => {
        editField.value.focus();
      }, 0);
    };

    const onHideField = (task) => {
      editField.value.value = task.name;
      showEditField.value = false;
    };

    const onSaveNewName = (task) => {
      showEditField.value = false;
      onChangeNameTask({ id: task.id, name: editField.value.value });
    };

    return {
      todo,
      showEditField,
      editField,
      onDeleteTask,
      onShowEditField,
      onSaveNewName,
      onHideField,
      onChangeStatusById,
    };
  },
});
</script>
