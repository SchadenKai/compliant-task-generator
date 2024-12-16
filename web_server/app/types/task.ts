// types/task.ts
export interface TaskRequest {
    title: string;
    description: string;
  }
  
  export interface TaskResponse {
    title: string;
    description: string;
    acceptance_criteria: string[];
    risks: string[];
    risk_management: string[];
    dependencies: string[];
    third_party_apis: string[];
    error?: string;
  }  