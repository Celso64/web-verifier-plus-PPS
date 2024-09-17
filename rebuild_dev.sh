#! /bin/bash

set -e

docker compose -f docker-compose.example.yml down
docker compose -f docker-compose.example.yml build
docker compose -f docker-compose.example.yml up

exit 0