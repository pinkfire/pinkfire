#!/bin/sh

curl -H 'Content-type: application/json' -d '{"id": "1", "message": "Call cordys", "application": "nokia-ui"}' -X POST http://localhost:3000/threads
curl -H 'Content-type: application/json' -d '{"id": "2", "message": "Call ecommerce-api", "application": "marketplace-ui"}' -X POST http://localhost:3000/threads
curl -H 'Content-type: application/json' -d '{"id": "3", "message": "Received call from marketplace-ui", "parent": "2", "application": "ecommerce-api"}' -X POST http://localhost:3000/threads
curl -H 'Content-type: application/json' -d '{"id": "4", "message": "Call catalog-api", "parent": "2", "application": "ecommerce-api"}' -X POST http://localhost:3000/threads
curl -H 'Content-type: application/json' -d '{"id": "5", "message": "Received call from ecommerce-api", "parent": "3", "application": "catalog-api"}' -X POST http://localhost:3000/threads
