#!/bin/bash

## Usage: deploy.sh repo_name 

INIT_SCRIPT="/var/www/$1/init.sh"

if test -f "$INIT_SCRIPT"; then
    echo "Running init script."
    bash $INIT_SCRIPT
else
    echo "No init script found."
fi