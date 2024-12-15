
from fastapi import APIRouter

from app.controller.task_generation import generate_task_details
from app.models.task import TaskRequest


app = APIRouter(tags=["task"])

@app.get("/generate_task_details")
async def generate_task_details_api(request: TaskRequest):
    return generate_task_details(request.title, request.description)