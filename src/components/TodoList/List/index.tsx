import React from 'react'
import { ITodo } from '../typings'

import IdItem from './Item'

interface Iprops {
  todoList:ITodo[];
  removeTodo:(id: number) => void
  toggleTodo:(id: number) => void
}

const TdList = ({todoList,removeTodo,toggleTodo}:Iprops) => {
  return (
    <div className="td-list">
      {
        todoList && todoList.map( (todo:ITodo) => {
          return (
            <IdItem 
            key={todo.id}
            todo={todo}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
            />
          )
        })
      }
    </div>
  )
}

export default TdList