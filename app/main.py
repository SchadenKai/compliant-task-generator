from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os

from app.controller.task_generation import generate_task_details
from app.models.task import TaskRequest, TaskResponse


@asynccontextmanager
async def lifespan(app: FastAPI):
    openai.api_key = os.getenv("OPENAI_API_KEY")
    print(openai.api_key)
    yield

# Initialize the FastAPI app
app = FastAPI(
    title="Compliannt Task Generator", version="v0.1", lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to the list of allowed origins if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/generate_task_details")
async def generate_task_details_api(request: TaskRequest):
    return generate_task_details(request.title, request.description)