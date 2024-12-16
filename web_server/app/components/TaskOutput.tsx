// components/TaskOutput.tsx
import React from 'react';
import { TaskResponse } from '../types/task';

interface TaskOutputProps {
  output: TaskResponse | null;
}

const TaskOutput: React.FC<TaskOutputProps> = ({ output }) => {
  if (!output) {
    return <div className="task-output">No output yet. Fill in the details and generate a task.</div>;
  }

  if (output.error) {
    return <div className="task-output error">{output.error}</div>;
  }

  return (
    <div className="task-output">
      <h2>Generated Task Details</h2>
      <pre>{JSON.stringify(output, null, 2)}</pre>
    </div>
  );
};

export default TaskOutput;
