#!/bin/bash

## Usage: deploy.sh repo_name 

ENV_FILE="/var/www/$1/.env"
INIT_SCRIPT="/var/www/$1/init.sh"

if test -f "$INIT_SCRIPT"; then
    echo "Running init script."
    source $ENV_FILE && bash $INIT_SCRIPT
else
    echo "No init script found."
fi