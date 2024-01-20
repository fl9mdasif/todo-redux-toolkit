import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface TToDo {
  id: string;
  title: string;
  description: string;
  priority: string;
  isCompleted?: false;
}

// Define the initial state using that type
// Your initial state might look like this
const initialState: {
  todos: TToDo[];
  filter: string;
  filterTodos: TToDo[];
} = {
  todos: [],
  filter: "",
  filterTodos: [], // Initial filter is empty
};

const applyFilter = (todos: TToDo[], filter: string): TToDo[] => {
  return filter ? todos.filter((item) => item.priority === filter) : todos;
};

export const todoSlice = createSlice({
  name: "todo",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // addToDo: (state, action: PayloadAction<TToDo>) => {
    //   state.todos.push({ ...action.payload });
    //   state.filterTodos = applyFilter(state.todos, state.filter);
    // },

    // removeTodo: (state, action: PayloadAction<string>) => {
    //   state.todos = state.todos.filter((item) => item.id !== action.payload);
    //   state.filterTodos = applyFilter(state.todos, state.filter);
    // },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      const task = state.todos.find((item) => {
        console.log("item: ", item);
        console.log("payload: ", taskId);
        item._id === taskId;
      });
      if (task) {
        task.isCompleted = !task.isCompleted;
        state.todos.sort((a, b) => {
          if (a.isCompleted && !b.isCompleted) return 1;
          if (!a.isCompleted && b.isCompleted) return -1;
          return 0;
        });
        state.filterTodos = applyFilter(state.todos, state.filter);
      }
    },

    filterTodo: (state, action: PayloadAction<string>) => {
      if (action.payload === "all") {
        // If "All" is selected, show all todos
        state.filterTodos = state.todos;
      } else {
        // Filter todos based on priority
        state.filter = action.payload;
        state.filterTodos = applyFilter(state.todos, action.payload);
      }
    },
  },
});

export const { toggleComplete, filterTodo } = todoSlice.actions;

export default todoSlice.reducer;
