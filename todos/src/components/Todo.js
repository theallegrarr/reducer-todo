import React, { useReducer } from 'react';
import uuid from 'uuid';

const MARK = 'MARK';
const ADD = 'ADD';
const ON_INPUT_CHANGE = 'ON_INPUT_CHANGE';

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
          complete: action.payload.isComplete,
        };
      });
    case ADD:
      return state.concat({
          id: uuid(),
          name: action.payload.name,
          complete: action.payload.isComplete,
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
        complete: false 
      },
    });
  }

  const onValueChange = event => {
    console.log(formValues);
    formDispatch({
      type: ON_INPUT_CHANGE,
      payload: { name: event.target.name, value: event.target.value },
    });
  };

  return (
    <div className='component'>
      {
        todos.map((todo) => (
          <div key={todo.id} style={{ color: !todo.complete ? 'red' : 'green' }}>
            {todo.name}
            <br></br>
            <button onClick={markTodo(todo.id, true)}>Mark complete </button>
            <button onClick={markTodo(todo.id, false)}>Mark incomplete </button>
          </div>
        ))
      }
      <form className='component' onSubmit={addTodo}>
        <label>Description: <br />
          <input value={formValues.name} onChange={onValueChange} name='name' />
        </label><br />
      <input type='submit' />
    </form>
    </div>
  );
}
