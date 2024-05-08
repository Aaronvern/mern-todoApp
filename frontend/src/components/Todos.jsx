import React from 'react'; 
const Todos = ({ todos }) => {

  const updateTodo = (todoId) => { 
    try {
      const todo = todos.find(todo => todo._id === todoId); 
      if (!todo) {
        throw new Error('Todo not found');
      }

      fetch(`http://localhost:3000/completed`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": JSON.stringify({ completed: true }).length.toString()
        },
        body: JSON.stringify({
          completed: true,
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update todo');
        }
       
      })
      .catch(error => {
        console.error('Error updating todo:', error);
        
      });
    } catch (error) {
      console.error('Error updating todo:', error);
      
    }
  };

  return (
    <div className="flex items-center justify-center pt-5">
      <div className="flex flex-col bg-white bg-opacity-5 border-2 border-white p-3 rounded-lg shadow-lg">
        {todos.map((todo, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <div className="font-semibold text-lg">Title: {todo.title}</div>
            <div className="text-gray-700">Description: {todo.description}</div>
            <button
              className={`mt-2 py-1 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white`}
              onClick={() => updateTodo(todo._id)} 
            >
              {todo.completed ? 'Completed' : 'Mark as Completed'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;

