import React, { useCallback, useEffect, useState ,useReducer} from 'react'

import TdInput from './Input'
import TdList from './List'
import { todoReducer } from './reducer'
import { ITodo ,IState, ACTION_TYPE} from './typings'

const initalState:IState = {
  todoList:[]
}

function init( initTodoList:IState):IState{
  return initTodoList
}

const TodoList = () => {

  //useState
  // let [todoList,setTodoList] = useState<ITodo[]>([])

  //useReducer 当useReducer执行时才会执行init(initalState)函数创建初始state,就是惰性初始化
  const [state,dispatch] = useReducer(todoReducer,initalState,init)

  //didMount 从localStorage里获得
  useEffect(()=>{
    const todoList = JSON.parse(localStorage.getItem('todolist') || '[]')

    dispatch({
      type:ACTION_TYPE.INIT_TODOLIST,
      payload:todoList
    })
    
  },[])

  //didUpdate+didMount 更新就修改localStorage
  useEffect(() => {
    localStorage.setItem('todolist',JSON.stringify(state.todoList))
  },[state.todoList])

  //useReducer
  const addTodo = useCallback((todo : ITodo):void => {
    dispatch({
      type:ACTION_TYPE.ADD_TODO,
      payload:todo
    })
  },[])

  const removeTodo = useCallback((id:number):void => {
    dispatch({
      type:ACTION_TYPE.REMOVE_TODO,
      payload:id
    })
  },[])

  const toggleTodo = useCallback((id:number):void => {
    dispatch({
      type:ACTION_TYPE.TOGGLE_TODO,
      payload:id
    })
  },[])

  // useState
  // const addTodo = useCallback((todo : ITodo) => {
  //   //因为这里是个回调函数获得最新todoList的状态，所以依赖项里不需要todoList了
  //   setTodoList(todoList => [...todoList,todo])
  // },[])

  return (
    <div className="todo-list">
      <TdInput 
      addTodo={addTodo} 
      // todoList={todoList} 
      todoList={state.todoList} 
      />

      <TdList 
      todoList={state.todoList}
      removeTodo={removeTodo}
      toggleTodo={toggleTodo}
      
      />
    </div>
  )
}

export default TodoList