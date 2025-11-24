# API Reference Overview

Welcome to the API Reference for Devlien. This section provides detailed documentation for all classes, methods, and interfaces.

## Core Modules

### Application

The main application class that manages routing, middleware, and server lifecycle.

```typescript
import { createApp, App } from 'devlien'

const app: App = createApp(options)
```

**See:** [Core API](/api/core)

### Router

Route management and HTTP request handling.

```typescript
import { Router } from 'devlien'

const router = new Router()
```

**See:** [Router API](/api/router)

### Request

Represents the HTTP request with properties for query strings, parameters, body, headers, etc.

```typescript
interface Request {
  params: Record<string, string>
  query: Record<string, string>
  body: any
  headers: Record<string, string>
  method: string
  url: string
}
```

**See:** [Request API](/api/request)

### Response

Represents the HTTP response with methods for sending data to the client.

```typescript
interface Response {
  send(data: any): void
  json(data: any): void
  status(code: number): Response
  redirect(url: string): void
}
```

**See:** [Response API](/api/response)

## Type Definitions

All types are exported from the main package:

```typescript
import type {
  App,
  Router,
  Request,
  Response,
  Middleware,
  RouteHandler,
  AppOptions
} from 'devlien'
```

## Quick Links

- [Core](/api/core) - Application and core functionality
- [Router](/api/router) - Routing and route handling
- [Request](/api/request) - Request object API
- [Response](/api/response) - Response object API

## Version Information

This documentation is for **Devlien v1.0.0**.

For older versions, see the [version archive](#).
