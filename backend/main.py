from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
# Remove the import for Response if not used elsewhere
# from starlette.responses import Response  # Comment out if present

from Database_operations.init_db import init_db
from backend_services.tenant_registration import router as tenant_router

app = FastAPI()

# CORS middleware config (keep as-is, or make origins more specific for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://cautious-palm-tree-7x666j9v66vhx9gx-3000.app.github.dev",
          "https://ostaffsync.vercel.app/",
            "http://localhost:3000",  # frontend
    ],  # Or specify your frontend URL, e.g., ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Validation error handler
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = [err['msg'] for err in exc.errors()]
    return JSONResponse(
        status_code=422,
        content={"success": False, "message": ", ".join(errors)},
    )

# HTTP error handler
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": exc.detail},
    )

# Catch-all error handler
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "An unexpected error occurred."},
    )

# Remove or comment out the custom OPTIONS handler
# @app.options("/{rest_of_path:path}")
# async def options_handler(rest_of_path: str, request: Request):
#     return Response(status_code=200)

# Database initialization at startup
@app.on_event("startup")
def startup_event():
    init_db()

# Include tenant registration routes
app.include_router(tenant_router)