from src import main_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
# from fastapi.staticfiles import StaticFiles
# from os import makedirs

# STATIC_FILES_PATH = "./src/data/"

app = FastAPI(root_path="/api")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# makedirs(f"{STATIC_FILES_PATH}images/@test_images", exist_ok=True)
app.include_router(main_router)

# app.mount("/files", StaticFiles(directory=STATIC_FILES_PATH), name="files_dierectory")