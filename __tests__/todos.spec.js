// import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Todos from "../src/components/Todos.vue";
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)


describe("Todos.vue", () => {

  let getters
  let actions
  let store

  beforeEach(()=>{
    getters = {
      allTodos: () => [{
        title:'Test',
        id:42,
        completed:false
      }]
    }

    actions = {
      deleteTodo:jest.fn(),
      updateTodo:jest.fn(),
      fetchTodos:jest.fn()
    }

    store = new Vuex.Store({
      getters,
      actions
    })
  })


  it("Renders the component using Store", () => {
    const wrapper = shallowMount(Todos, {store, localVue})
    const todoText = wrapper.find('div.todo')
    expect(todoText.text()).toBe(getters.allTodos()[0].title)
  });

  it("Dispatches deleteTodo", () => {
    const wrapper = shallowMount(Todos, {store, localVue})
    const deleteTodoBtn = wrapper.find('i')
    deleteTodoBtn.trigger('click')
    expect(actions.deleteTodo).toHaveBeenCalled()
  });
});
