// components/TaskInput.tsx
import React, { useState } from 'react';
import { TaskRequest } from '../types/task';

interface TaskInputProps {
  onGenerate: (data: TaskRequest) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onGenerate }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <h2>Input Task Details</h2>
      <div>
        <label>Task Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>
      <div>
        <label>Task Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          required
        />
      </div>
      <button type="submit">Generate Task</button>
    </form>
  );
};

export default TaskInput;
