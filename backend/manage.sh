#!/bin/bash

# if air is not installed, install it
if ! [ -x "$(command -v air)" ]; then
  curl -sSfL https://raw.githubusercontent.com/air-verse/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin
fi

air --build.cmd "go build -o bin/api cmd/main.go" --build.bin "./bin/api"