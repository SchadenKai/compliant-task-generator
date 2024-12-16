"use client";

// components/TaskOutput.tsx
import React, { useEffect } from "react";
import { TaskResponse } from "../types/task";
import useLocalStorage from "../hooks/useLocalStorage";
import { Badge } from "@/components/ui/badge";
import { LucideCheck, LucideCheckCircle } from "lucide-react";

interface TaskOutputProps {
  output: TaskResponse | null;
}

const TaskOutput: React.FC<TaskOutputProps> = ({ output }) => {
  const [storedOutput, setStoredOutput] = useLocalStorage("taskOutput", null);

  useEffect(() => {
    if (output) {
      setStoredOutput(output);
    }
  }, [output, setStoredOutput]);

  const displayOutput = storedOutput || output;

  if (!displayOutput) {
    return null;
  }

  if (displayOutput.error) {
    return <div className="text-destructive">{displayOutput.error}</div>;
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg my-4">
      <Badge variant="success" className="mb-4 gap-3 py-1 px-2">
        <LucideCheckCircle size={16}/>Task Generated Successfully!
      </Badge>
      <table className="w-full">
        <tbody>
          <tr>
            <td className="font-semibold">Title:</td>
            <td>{displayOutput.title}</td>
          </tr>
          <tr>
            <td className="font-semibold">Description:</td>
            <td>{displayOutput.description}</td>
          </tr>
          <tr>
            <td className="font-semibold">Acceptance Criteria:</td>
            <td>
              <ul>
                {displayOutput.acceptance_criteria.map(
                  (ac: string, index: number) => (
                    <li key={index}>{ac}</li>
                  )
                )}
              </ul>
            </td>
          </tr>
          <tr>
            <td className="font-semibold">Risks:</td>
            <td>
              <ul>
                {displayOutput.risks.map((risk: string, index: number) => (
                  <li key={index}>{risk}</li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <td className="font-semibold">Risk Management:</td>
            <td>
              <ul>
                {displayOutput.risk_management.map(
                  (rm: string, index: number) => (
                    <li key={index}>{rm}</li>
                  )
                )}
              </ul>
            </td>
          </tr>
          <tr>
            <td className="font-semibold">Dependencies:</td>
            <td>
              <ul>
                {displayOutput.dependencies.map(
                  (dep: string, index: number) => (
                    <li key={index}>{dep}</li>
                  )
                )}
              </ul>
            </td>
          </tr>
          <tr>
            <td className="font-semibold">Third Party APIs:</td>
            <td>{displayOutput.third_party_apis}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TaskOutput;
