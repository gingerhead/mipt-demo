#!/bin/bash

cd "$(dirname "$0")"

env_file="--env-file ../../.env"

base_compose="-f ../compose/base.yml"

docker compose ${env_file} ${base_compose} -p mipt-mis "$@"
