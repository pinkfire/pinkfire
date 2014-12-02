#!/bin/sh

curl -H 'Content-type: application/json' \
    -d '{"path": "/123/456", "application": "appli 1", "message": "Call appli 2"}' \
    -X POST http://localhost:3000/threads

curl -H 'Content-type: application/json' \
    -d '{"path": "/123", "application": "Container 1", "message": "This is a container defined after the call of appli 1", "level": "primary"}' \
    -X POST http://localhost:3000/threads

curl -H 'Content-type: application/json' \
    -d '{"path": "/123/456/789", "application": "appli 2", "message": "I am appli 2", "level": "danger"}' \
    -X POST http://localhost:3000/threads
