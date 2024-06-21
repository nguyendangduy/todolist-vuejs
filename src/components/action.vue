<template>
  <div class="p-action">
    <div class="p-action__task-active">{{ todo.getTaskActive }} item left</div>
    <div class="p-action__filter">
      <button
        :class="[
          'c-button-filter',
          filter.key == filterCurrent && 'c-button-filter--active',
        ]"
        v-for="filter in filterButton"
        @click="onFilter(filter.key)"
      >
        {{ filter.name }}
      </button>
    </div>
    <div class="p-action__clear-completed" v-if="todo.checkTaskCompleted">
      <button class="c-button-clear" @click="onClearCompleted">
        Clear completed
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useTodoStore } from "@/stores/todo";

export default defineComponent({
  props: {
    filterCurrent: String,
  },
  
  setup(props, { emit }) {
    const todo = useTodoStore();
    //actions from store
    const { onClearCompleted } = todo;
    const filterButton = ref([
      {
        name: "All",
        key: "all",
      },
      {
        name: "Active",
        key: "active",
      },
      {
        name: "Completed",
        key: "completed",
      },
    ]);

    const onFilter = (keyFilter) => {
      emit('filter', keyFilter)
    }

    return {
      todo,
      filterButton,
      onClearCompleted,
      onFilter,
    };
  },
});
</script>
