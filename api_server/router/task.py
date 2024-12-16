
from fastapi import APIRouter

from controller.task_generation import generate_task_details
from models.task import TaskRequest


app = APIRouter(tags=["task"])

@app.post("/generate_task_details")
async def generate_task_details_api(request: TaskRequest):
    return generate_task_details(request.title, request.description)