import os
import json
import time

from backend.utils.gemma_client import client

PROMPT_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "prompts",
    "interview_prompt.txt"
)


def generate_interview(candidate_data):

    print("=" * 60)
    print("Interview generation started...")

    with open(PROMPT_PATH, "r", encoding="utf-8") as file:
        prompt_template = file.read()

    prompt = prompt_template.replace(
        "{candidate_data}",
        json.dumps(candidate_data, indent=4)
    )

    print("Prompt prepared.")
    print("Calling Google AI...")

    start = time.time()

    response = client.models.generate_content(
        model="models/gemma-4-26b-a4b-it",
        contents=prompt
    )

    end = time.time()

    print(f"Google AI responded in {end-start:.2f} seconds.")

    text = response.text.strip()

    print("Raw Response:")
    print(text)

    if text.startswith("```"):
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

    result = json.loads(text)

    print("Interview generation completed.")
    print("=" * 60)

    return result