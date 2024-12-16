"use client";

// components/TaskInput.tsx
import React, { useState } from "react";
import { TaskRequest } from "../types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TaskInputProps {
  onGenerate: (data: TaskRequest) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onGenerate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    onGenerate({ title, description });
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <Label>Task Title:</Label>
        <Input
          type="text"
          className="my-2 py-2 px-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>
      <div className="mb-4">
        <Label>Task Description:</Label>
        <Textarea
          rows={20}
          value={description}
          className="my-2 py-2 px-4"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          required
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Generating Task..." : "Generate Task"}
      </Button>
    </form>
  );
};

export default TaskInput;
