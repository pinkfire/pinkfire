#!/bin/sh

curl -H 'Content-type: application/json' \
    -d '{"path": "/123/456", "application": "appli 1", "message": "Call appli 2", "context": {}}' \
    -X POST http://localhost:3000/threads

curl -H 'Content-type: application/json' \
    -d '{"path": "/123", "application": "Container 1", "message": "This is a container defined after the call of appli 1", "level": "primary", "context": {"headers": {"host": "localhost", "referer": "/"}}}' \
    -X POST http://localhost:3000/threads

curl -H 'Content-type: application/json' \
    -d '{"path": "/123/456/789", "application": "appli 2", "message": "I am appli 2", "level": "danger", "context": {}}' \
    -X POST http://localhost:3000/threads

curl -H 'Content-type: application/json' \
    -d '{"path": "/123", "context": {"headers": {"host": "127.0.0.1"}}}' \
    -X PATCH http://localhost:3000/threads

curl -H 'Content-type: application/json' \
    -d '{"path": "/123/456/789", "context": {"headers": {"host": "127.0.0.1"}}}' \
    -X PATCH http://localhost:3000/threads
