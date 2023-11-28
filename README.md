# HOWHY-Frontend

React Frontend for the Howhy platform. React SPA using vite.js.

## Introduction

Howhy is a React Webapp with a Laravel Backend, that can display educational Videos with interactive questions. The Progress of the Users can be stored and the users can unlock prizes. The Videos a stored on a third party Platform.

## Architecture

The Howhy-Platform is made up of the Backend and Frontend that are seperated in different repositorys. Both can be run in the Servere with Docker Compose. An additional reverse Proxy is neccesary to assign different subdirectorys of the Domain to backend and frontend.

## customization

## How to run

This App can be startet either locally when node is installed or with docker.

### run locally

- run `npm i && npm run dev`

### run with docker

- run `docker compose up`

## deploy with docker

- set the correct subdirectory with the 'base' option in vite.config.js
- run `cp .env.example .env` and set the correct api url
- run `docker compose -f docker-compose-prod.yml up`
- this commands builds the app and starts an nginx server on port 4173

## misc

Locally the Project only works with axios version 1.5.1 or lower because in later Versions this vulnurability is fixed: <https://github.com/advisories/GHSA-wf5p-g6vw-rhxx>

I suspect it will run fine with a later version of axios on a server because the root domains of frontend and backend are the same. Locally the domains are different because of the port in the frontend domain.

### Trademark

"HOWHY" is a registered Trademark in Germany. Please beware of that if you are using this Project.
