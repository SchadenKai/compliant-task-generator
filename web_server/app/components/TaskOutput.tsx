"use client";

// components/TaskOutput.tsx
import React from "react";
import { TaskResponse } from "../types/task";
import { Badge } from "@/components/ui/badge";

interface TaskOutputProps {
  output: TaskResponse | null;
}

const TaskOutput: React.FC<TaskOutputProps> = ({ output }) => {
  if (!output) {
    return (
      <div className="text-gray-500">
        No output yet. Fill in the details and generate a task.
      </div>
    );
  }

  if (output.error) {
    return <div className="text-destructive">{output.error}</div>;
  }

  return (
    <div className="max-w-[800px] w-full">
      <Badge variant="success">Generated Task Details</Badge>
      <div className="bg-gray-100 p-4 rounded-lg my-4">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="font-semibold">Title:</td>
              <td>{output.title}</td>
            </tr>
            <tr>
              <td className="font-semibold">Description:</td>
              <td>{output.description}</td>
            </tr>
            <tr>
              <td className="font-semibold">Acceptance Criteria:</td>
              <td>
                <ul>
                  {output.acceptance_criteria.map((ac, index) => (
                    <li key={index}>{ac}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Risks:</td>
              <td>
                <ul>
                  {output.risks.map((risk, index) => (
                    <li key={index}>{risk}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Risk Management:</td>
              <td>
                <ul>
                  {output.risk_management.map((rm, index) => (
                    <li key={index}>{rm}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Dependencies:</td>
              <td>
                <ul>
                  {output.dependencies.map((dep, index) => (
                    <li key={index}>{dep}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td className="font-semibold">Third Party APIs:</td>
              <td>
                <ul>
                  {output.third_party_apis.map((api, index) => (
                    <li key={index}>{api}</li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskOutput;
