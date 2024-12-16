"use client";

import { useState } from "react";
import TaskInput from "./components/TaskInput";
import { TaskRequest, TaskResponse } from "./types/task";
import axios from "axios";
import TaskOutput from "./components/TaskOutput";

const API_SERVER_URL = process.env.API_SERVER_URL;

export default function Home() {
  const [output, setOutput] = useState<TaskResponse | null>(null);

  const generateTaskDetails = async (data: TaskRequest) => {
    try {
      const response = await axios.post<TaskResponse>(
        `${API_SERVER_URL}/generate_task_details`,
        data
      );
      setOutput(response.data);
    } catch (error: unknown) {
      console.error("Error generating task details:", error);
      setOutput({
        error: "Failed to generate task details. Please try again.",
      } as TaskResponse);
    }
  };

  const LeftSide = () => {
    return (
      <div className="h-full w-full flex flex-col items-center justify-start gap-4">
        <h2 className="text-2xl font-bold">Generate Tasks</h2>
        <TaskInput onGenerate={generateTaskDetails} />
      </div>
    );
  };

  const RightSide = () => {
    return (
      <div className="h-full w-full flex flex-col items-center justify-start gap-4">
        <h2 className="text-2xl font-bold">Task Details</h2>
        <TaskOutput output={output} />
      </div>
    );
  };

  return (
    <div className="max-h-screen max-w-screen flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-y-auto">
      <h1 className="text-4xl font-bold">Compliant Task Generator</h1>
      <div className="h-full w-full flex flex-row items-start justify-center gap-16 sm:gap-32">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
}
