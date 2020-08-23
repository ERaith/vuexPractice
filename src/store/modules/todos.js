import axios from "axios";
const URL = "https://jsonplaceholder.typicode.com/todos";

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

//actions take an object commit is a destructure of it
const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(URL);

    commit("setTodos", response.data);
  },
  async addTodo({ commit }, title) {
    const response = await axios.post(URL, {
      title,
      completed: false,
    });
    commit("addTodos", response.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`${URL}/${id}`);
    commit("removeTodo", id);
  },
  async filterTodos({ commit }, e) {
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    const response = await axios.get(`${URL}?_limit=${limit}`);
    commit("setTodos", response.data);
  },
  async updateTodo({ commit }, updTodo) {
    const response = await axios.put(URL+'/' +updTodo.id,updTodo );
    // console.log(response.data)
    commit("updateTodo", response.data);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  addTodos: (state, todo) => (state.todos = [todo, ...state.todos]),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
  updateTodo:(state,updTodo)=> {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    if(index != -1){
      state.todos.splice(index,1,updTodo);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
