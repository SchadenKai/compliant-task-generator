from pydantic import BaseModel


class TaskRequest(BaseModel):
    title: str
    description: str

# Pydantic model for the response
class TaskResponse(BaseModel):
    title: str
    description: str
    acceptance_criteria: list[str]
    risks: list[str]
    risk_management: list[str]
    dependencies: list[str]
    third_party_apis: list[str]