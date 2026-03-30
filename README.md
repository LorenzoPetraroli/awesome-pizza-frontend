# Awesome Pizza Frontend

Awesome Pizza is a React frontend that consumes the Quarkus backend for customer ordering
and kitchen workflow management.
Customers can create an order without registration, receive a public order code, and track
its status from the browser session. The kitchen can inspect the live queue, start one order
at a time, mark it as ready, and complete it manually.

## Tech stack

- React 19
- TypeScript
- Vite
- Material UI
- React Router
- Yarn 4

## Frontend features

- Browse the pizza menu from the backend
- Create a new customer order without registration
- Show customer order details before submission
- Save created order codes in local storage for the current browser
- Poll tracked orders by code
- Show the kitchen live queue from the backend summary
- Start one queued order at a time
- Mark an order as ready
- Complete a ready order
- Use polling only, with no WebSocket integration

## Run locally

Install dependencies and start the Vite dev server:

```powershell
yarn install
yarn dev
```

The frontend runs on `http://localhost:3000`.

By default, the frontend expects the backend API on `http://localhost:8081`.

## Environment variables

Create a local environment file if needed:

```powershell
Copy-Item .env.example .env.local
```

Available variable:

```env
VITE_API_URL=http://localhost:8081
```

The value is consumed at build time by Vite, so it must be set before running `yarn dev`
or building the Docker image.

## Quality checks

```powershell
yarn lint
yarn typecheck
yarn check
```

## Demo with Docker Compose

Docker files are stored in the [`docker`](docker) folder.

Build and start the frontend container:

```powershell
yarn docker:up
```

The container serves the app on:

```text
http://localhost:3000
```

Useful Docker scripts:

```powershell
yarn docker:build
yarn docker:up
yarn docker:down
yarn docker:logs
```

The Docker setup builds the Vite app and serves the static output through Nginx with SPA
route fallback enabled.

## Backend integration

The frontend consumes these backend endpoints:

- `POST /api/orders`
- `GET /api/orders/{code}`
- `GET /api/pizzas`
- `GET /api/kitchen/summary`
- `POST /api/kitchen/orders/{code}/start`
- `PATCH /api/kitchen/orders/{code}/ready`
- `PATCH /api/kitchen/orders/{code}/complete`

## Frontend architecture

The project is split into focused frontend layers:

- `api`
  HTTP clients for customer and kitchen endpoints
- `components`
  Reusable UI components for customer, kitchen, and layout
- `contexts`
  Shared UI data sources such as the pizza menu
- `hooks`
  Page orchestration, polling, and form state
- `lib`
  Formatting helpers and browser storage utilities
- `pages`
  Route-level pages
- `types`
  Shared API response and request types

## Functional flow

### Customer area

1. Load the menu from the backend.
2. Select pizzas and quantities.
3. Create an order with customer name and requested items.
4. Store the returned order code in browser local storage.
5. Poll tracked orders until they reach `COMPLETED`.

### Kitchen area

1. Poll the kitchen summary from the backend.
2. Show only active orders in the operational view.
3. Allow the pizzaiolo to advance the workflow manually:
   `PLACED -> IN_PREPARATION -> READY -> COMPLETED`
4. Keep the backend as the source of truth for order state.
