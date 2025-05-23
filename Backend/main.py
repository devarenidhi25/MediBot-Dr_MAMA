from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

# ONLY include light routes for now
from routers import reminder_route, hospital_route, auth_route  # omit whisper & rag

app = FastAPI(title="MediBot Minimal API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://dr-mama.vercel.app", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return RedirectResponse(url="/docs")

# Only essential routers
app.include_router(reminder_route.router, prefix="/reminder", tags=["Reminders"])
app.include_router(hospital_route.router, prefix="/hospital", tags=["Hospital Finder"])
app.include_router(auth_route.router, prefix="/api", tags=["Authentication"])

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)
