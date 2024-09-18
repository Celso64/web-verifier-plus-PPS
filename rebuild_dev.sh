#!/bin/bash

set -e

docker compose -f docker-compose.example.yml down -v
docker compose -f docker-compose.example.yml up --build --force-recreate

exit 0