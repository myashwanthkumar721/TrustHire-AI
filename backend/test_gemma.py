from utils.gemma_client import client

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Hello! Introduce yourself in one sentence."
)

print(response.text)