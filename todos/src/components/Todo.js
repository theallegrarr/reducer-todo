import React, { useReducer } from 'react';
import uuid from 'uuid';

const MARK = 'MARK';
const ADD = 'ADD';
const ON_INPUT_CHANGE = 'ON_INPUT_CHANGE';
const RESET_FORM = 'RESET_FORM';
const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

const initialState = [
  { id: '1', name: "Learn about reducers", completed: false },
  { id: '2', name: "Learn about redux", completed: false },
  { id: '3', name: "Learn about states", completed: false },
];

const initialForm = {
  id: '',
  name: '',
  completed: false,
};

function reducer(state, action) {
  switch (action.type) {
    case MARK:
      return state.map(todo => {
        if (todo.id !== action.payload.id) return todo;
        return {
          id: todo.id,
          name: todo.name,
          completed: action.payload.isComplete,
        };
      });
    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false);
    case ADD:
      return state.concat({
          id: uuid(),
          name: action.payload.name,
          completed: action.payload.isComplete,
          })
    default:
      return state;
  }
}

function formReducer(state, action) {
  switch (action.type) {
    case ON_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case RESET_FORM:
      return initialForm;
    default:
      return state;
  }
}

export default function Todos() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [formValues, formDispatch] = useReducer(formReducer, initialForm);
  
  const markTodo = (id, isComplete) => () => {
    dispatch({
      type: MARK,
      payload: { id, isComplete },
    });
  };

  const addTodo = event => {
    event.preventDefault();
    dispatch({
      type: ADD,
      payload: { 
        name: formValues.name, 
        completed: false 
      },
    });
    formDispatch({
      type: RESET_FORM,
    })
  }

  const onValueChange = event => {
    console.log(formValues);
    formDispatch({
      type: ON_INPUT_CHANGE,
      payload: { name: event.target.name, value: event.target.value },
    });
  };

  const clear = () => {
    dispatch({
      type: CLEAR_COMPLETED,
    })
  }

  return (
    <div className='component'>
      {
        todos.map((todo) => (
          <div className='todo-card' key={todo.id} style={{ color: !todo.completed ? 'red' : 'green' }}>
            {todo.name}
            <br></br>
            <button onClick={markTodo(todo.id, true)} className='complete'>Complete </button>
            <button onClick={markTodo(todo.id, false)} className='uncomplete'>Incomplete </button>
          </div>
        ))
      }
      <form className='component' onSubmit={addTodo}>
        <label>Description: <br />
          <input value={formValues.name} onChange={onValueChange} name='name' />
        </label><br />
        <button className='submit' type='submit'>Submit</button>
    </form><br />
      <button onClick={clear} className='clear'>Clear Completed</button>    
    </div>
  );
}
