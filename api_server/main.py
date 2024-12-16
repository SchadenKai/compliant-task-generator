from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os

from router.task import app as task_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    openai.api_key = os.getenv("OPENAI_API_KEY")
    yield

# Initialize the FastAPI app
app = FastAPI(
    title="Compliannt Task Generator", version="v0.1", lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://compliant-task-generator-webserver.vercel.app"],  # Change this to the list of allowed origins if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task_router)


@app.get("/health")
def health_check():
    return {"status": "ok"}

