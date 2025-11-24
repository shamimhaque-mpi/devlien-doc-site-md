# Core API

The Core API provides the main application class and functions for creating and configuring Devlien applications.

## Application

### `createApp(options?)`

Creates a new application instance.

**Parameters:**
- `options` (AppOptions, optional) - Configuration options for the application

**Returns:** `App` - The application instance

**Example:**

```typescript
import { createApp } from 'devlien'

const app = createApp({
  port: 3000,
  env: 'development'
})
```

### Application Configuration

#### AppOptions

```typescript
interface AppOptions {
  port?: number
  env?: 'development' | 'production' | 'test'
  cors?: CorsOptions | boolean
  bodyParser?: BodyParserOptions | boolean
  static?: StaticOptions | boolean
}
```

**Properties:**

- `port` (number, optional) - Default port for the server (default: 3000)
- `env` (string, optional) - Application environment (default: process.env.NODE_ENV)
- `cors` (CorsOptions | boolean, optional) - Enable CORS with options or boolean
- `bodyParser` (BodyParserOptions | boolean, optional) - Enable body parsing
- `static` (StaticOptions | boolean, optional) - Enable static file serving

**Example:**

```typescript
const app = createApp({
  port: 8080,
  env: 'production',
  cors: true,
  bodyParser: {
    limit: '10mb'
  }
})
```

## Application Instance

The `App` instance provides methods for routing, middleware, and server lifecycle management.

### HTTP Method Routes

#### `app.get(path, ...handlers)`

Register a GET route handler.

**Parameters:**
- `path` (string | RegExp) - Route path or pattern
- `...handlers` (RouteHandler | Middleware[]) - Handler functions

**Returns:** `App` - The app instance for chaining

**Example:**

```typescript
app.get('/users', (req, res) => {
  res.json({ users: [] })
})
```

#### `app.post(path, ...handlers)`

Register a POST route handler.

**Example:**

```typescript
app.post('/users', (req, res) => {
  res.status(201).json(req.body)
})
```

#### `app.put(path, ...handlers)`

Register a PUT route handler.

**Example:**

```typescript
app.put('/users/:id', (req, res) => {
  res.json({ id: req.params.id, ...req.body })
})
```

#### `app.delete(path, ...handlers)`

Register a DELETE route handler.

**Example:**

```typescript
app.delete('/users/:id', (req, res) => {
  res.status(204).send()
})
```

#### `app.patch(path, ...handlers)`

Register a PATCH route handler.

**Example:**

```typescript
app.patch('/users/:id', (req, res) => {
  res.json({ id: req.params.id, ...req.body })
})
```

#### `app.all(path, ...handlers)`

Register a handler for all HTTP methods.

**Example:**

```typescript
app.all('/debug', (req, res) => {
  res.json({ method: req.method, url: req.url })
})
```

### Middleware

#### `app.use(middleware)` / `app.use(path, middleware)`

Apply middleware to the application.

**Parameters:**
- `path` (string | RegExp, optional) - Path prefix for the middleware
- `middleware` (Middleware | Middleware[] | Router) - Middleware function(s) or router

**Returns:** `App` - The app instance for chaining

**Examples:**

```typescript
// Global middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// Path-specific middleware
app.use('/api', authenticate)

// Mount a router
import userRouter from './routes/users'
app.use('/api/users', userRouter)
```

### Built-in Middleware

#### `app.json(options?)`

Returns JSON body parser middleware.

**Parameters:**
- `options` (object, optional) - JSON parser options

**Example:**

```typescript
app.use(app.json({ limit: '10mb' }))
```

#### `app.cors(options?)`

Returns CORS middleware.

**Parameters:**
- `options` (CorsOptions, optional) - CORS configuration

**Example:**

```typescript
app.use(app.cors({
  origin: 'https://example.com',
  credentials: true
}))
```

#### `app.static(path, options?)`

Serve static files from a directory.

**Parameters:**
- `path` (string) - Directory path to serve files from
- `options` (object, optional) - Static serving options

**Example:**

```typescript
app.use(app.static('public'))
app.use('/assets', app.static('public/assets'))
```

### Server Lifecycle

#### `app.listen(port, callback?)`

Start the HTTP server.

**Parameters:**
- `port` (number) - Port to listen on
- `callback` (function, optional) - Callback executed when server starts

**Returns:** `Server` - The HTTP server instance

**Example:**

```typescript
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
```

#### `app.close(callback?)`

Stop the HTTP server.

**Parameters:**
- `callback` (function, optional) - Callback executed when server stops

**Example:**

```typescript
app.close(() => {
  console.log('Server closed')
})
```

### Router Creation

#### `app.router()`

Create a new router instance.

**Returns:** `Router` - A new router instance

**Example:**

```typescript
const apiRouter = app.router()

apiRouter.get('/users', (req, res) => {
  res.json({ users: [] })
})

app.use('/api', apiRouter)
```

### Application Properties

#### `app.locals`

Application-level variables shared across all routes and middleware.

**Type:** `Record<string, any>`

**Example:**

```typescript
app.locals.appName = 'My Framework App'
app.locals.version = '1.0.0'

app.get('/', (req, res) => {
  res.send(`Welcome to ${app.locals.appName}`)
})
```

#### `app.settings`

Application configuration settings.

**Type:** `AppOptions`

**Example:**

```typescript
console.log(app.settings.port) // 3000
console.log(app.settings.env)  // 'development'
```

## Type Definitions

### App

```typescript
interface App {
  // HTTP methods
  get(path: string | RegExp, ...handlers: Array<RouteHandler | Middleware>): App
  post(path: string | RegExp, ...handlers: Array<RouteHandler | Middleware>): App
  put(path: string | RegExp, ...handlers: Array<RouteHandler | Middleware>): App
  delete(path: string | RegExp, ...handlers: Array<RouteHandler | Middleware>): App
  patch(path: string | RegExp, ...handlers: Array<RouteHandler | Middleware>): App
  all(path: string | RegExp, ...handlers: Array<RouteHandler | Middleware>): App

  // Middleware
  use(middleware: Middleware | Middleware[] | Router): App
  use(path: string | RegExp, middleware: Middleware | Middleware[] | Router): App

  // Built-in middleware
  json(options?: JsonOptions): Middleware
  cors(options?: CorsOptions): Middleware
  static(path: string, options?: StaticOptions): Middleware

  // Server lifecycle
  listen(port: number, callback?: () => void): Server
  close(callback?: () => void): void

  // Router creation
  router(): Router

  // Properties
  locals: Record<string, any>
  settings: AppOptions
}
```

### RouteHandler

```typescript
type RouteHandler = (
  req: Request,
  res: Response
) => void | Promise<void>
```

### Middleware

```typescript
type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>

type NextFunction = (error?: Error) => void
```

## Complete Example

```typescript
import { createApp } from 'devlien'

// Create app with configuration
const app = createApp({
  port: 3000,
  env: 'development'
})

// Application-level settings
app.locals.appName = 'My API'
app.locals.version = '1.0.0'

// Built-in middleware
app.use(app.json())
app.use(app.cors())
app.use(app.static('public'))

// Custom middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// Routes
app.get('/', (req, res) => {
  res.json({
    app: app.locals.appName,
    version: app.locals.version
  })
})

// Router
const apiRouter = app.router()

apiRouter
  .get('/users', (req, res) => {
    res.json({ users: [] })
  })
  .post('/users', (req, res) => {
    res.status(201).json(req.body)
  })

app.use('/api', apiRouter)

// Start server
const PORT = process.env.PORT || app.settings.port

app.listen(PORT, () => {
  console.log(`${app.locals.appName} running on http://localhost:${PORT}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  app.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})
```

## Error Handling

### Global Error Handler

Define a global error-handling middleware with 4 parameters:

```typescript
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  })
})
```

**Note:** Error handlers must be defined after all other middleware and routes.

## See Also

- [Router API](/api/router) - Router class and routing methods
- [Request API](/api/request) - Request object properties and methods
- [Response API](/api/response) - Response object properties and methods
- [Quick Start Guide](/guide/quick-start) - Getting started tutorial
- [Middleware Guide](/guide/middleware) - Middleware concepts and patterns
