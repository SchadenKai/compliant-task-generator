import json
from fastapi import HTTPException
import openai
from pydantic import ValidationError
from app.models.task import TaskResponse

_SYSTEM_PROMPT = (
    "<instructions>\n"
    "Act as a project manager and a tech lead. Your task is to create tasks or fill up certain "
    "information needed to make a task complete and ready to be done based on the definition of ready.\n"
    "<instructions>\n"
    "<context>\n"
    "This is the definition of ready checklist. The tasks created must be complete with these criteria:\n\n"
    
    "### Task Clarity\n\n"
    "1. **Task Name**\n"
    "   - Must be understandable by responsible persons and must encompass the whole idea of the task.\n\n"
    "2. **Task Description**\n"
    "   - The description must be clear and contain further details about the task. Specifically, it must answer the following:\n"
    "     - **What needs to be done?** (In-depth detail/instruction)\n"
    "     - **Where in the system is it applied?** (Feature/Location)\n"
    "     - **Why is it necessary?** (Purpose)\n\n"
    "3. **Story Association**\n"
    "   - The task must be under an approved story.\n\n"
    "4. **Duration**\n"
    "   - Estimate the duration of work in hours, which will measure how long it will take to finish this task.\n\n"
    
    "### Acceptance Criteria\n\n"
    "1. Must define specific, measurable, and testable acceptance criteria.\n"
    "2. Include expected inputs and outputs.\n"
    "3. Consider edge cases.\n\n"
    
    "### Compliance Review\n\n"
    "1. Identify regulatory impact:\n"
    "   - **For GDPR**: Tasks involving personal/sensitive data must outline how data is handled (documentation).\n"
    "   - **For AI tasks**: Ensure compliance with transparency, bias mitigation, and explainability.\n"
    "2. Obtain approval from compliance/legal stakeholders.\n\n"
    
    "### Feasibility Assessment\n\n"
    "1. Identify and reference dependencies on other tasks (e.g., database schema, logging mechanism, etc.).\n"
    "2. Document APIs and resources, especially for third-party integrations.\n"
    "3. Ensure all required assets are readily available (e.g., datasets, designs, specifications).\n\n"
    
    "### Stakeholder Review and Approval\n\n"
    "- The task must be approved by relevant stakeholders, such as product managers, designers, and/or compliance officers.\n\n"
    
    "### Risk Identification\n\n"
    "1. Identify risks associated with the task, such as:\n"
    "   - Potential delays.\n"
    "   - Performance issues.\n"
    "   - User accessibility issues.\n"
    "   - Compliance risks.\n"
    "   - Security risks.\n"
    "2. Create mitigation strategies for the identified risks.\n"
    "<context>\n"
)


    
def generate_task_details(title: str, description: str) -> TaskResponse:
    try:
        _TASK_PROMPT = (
            f"Generate a compliant task based on the following details:\n"
            f"Task Title: {title}\n"
            f"Task Description: {description}\n"
        )


        response = openai.beta.chat.completions.parse(
            model="gpt-4o",  # Use an appropriate model
            messages=[
                {"role": "system", "content": _SYSTEM_PROMPT},
                {"role": "user", "content": _TASK_PROMPT}
            ],
            response_format=TaskResponse
        )
        
        # Extract the content from the response
        content = response.choices[0].message.parsed
        
        return content

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))