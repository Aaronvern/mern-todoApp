import React from 'react';
import {useState} from 'react'
const CreateTodo = () => {
    const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTodo = async () => {
    try {
      const response = await fetch('http://localhost:3000/todo', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          description: description
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const json = await response.json();
      alert("Todo added successfully");
    } catch (error) {
      console.error('Error adding todo:', error);
      alert("Failed to add todo");
    }
  };
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col bg-white bg-opacity-10 border-2 border-white p-6 rounded-lg shadow-lg">
                <input type="text" placeholder='enter todo' className="block border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                    onChange={(e)=>{
                        const value = e.target.value
                        setTitle(value)
                    }}                
                ></input>
                <input type="text" placeholder='enter todo description' className="block border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                    onChange={(e)=>{
                        const value = e.target.value
                        setDescription(value)
                    }}
                ></input>
                <button className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddTodo}                
                >add todo</button>
            </div>
        </div>
    );
};

export default CreateTodo;
