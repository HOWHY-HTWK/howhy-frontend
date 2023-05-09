# HOWHY-Frontend

React Frontend for the Howhy platform. React SPA mit vite.js entwickelt.

## How to run

This App can be startet either locally when node is installed or with docker

### run locally

- run `npm i && npm run dev`

### run with docker

- run `docker compose up`

## deploy with docker

- run `cp .env.example .env.` and set the correct api url
- run `docker compose -f docker-compose-prod.yml up`
- this commands builds the app and starts an nginx server on port 4173
