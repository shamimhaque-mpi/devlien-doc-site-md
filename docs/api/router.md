# Router API

The Router is the core routing component of Devlien, responsible for handling HTTP requests and directing them to the appropriate handlers.

## Router Class

### Creating a Router

```typescript
import { Router } from 'devlien'

const router = new Router()
```

The Router class provides methods for defining routes for different HTTP methods and managing middleware.

## HTTP Method Routes

### `get(path, ...handlers)`

Register a route that responds to GET requests.

**Parameters:**
- `path` (string | RegExp) - The route path or pattern
- `...handlers` (RouteHandler | Middleware[]) - One or more handler functions

**Returns:** `Router` - The router instance for chaining

**Example:**

```typescript
router.get('/users', (req, res) => {
  res.json({ users: [] })
})

// With multiple handlers (middleware chain)
router.get('/users/:id', authenticate, authorize, (req, res) => {
  res.json({ id: req.params.id })
})
```

### `post(path, ...handlers)`

Register a route that responds to POST requests.

**Parameters:**
- `path` (string | RegExp) - The route path or pattern
- `...handlers` (RouteHandler | Middleware[]) - One or more handler functions

**Returns:** `Router` - The router instance for chaining

**Example:**

```typescript
router.post('/users', (req, res) => {
  const user = req.body
  res.status(201).json(user)
})
```

### `put(path, ...handlers)`

Register a route that responds to PUT requests.

**Parameters:**
- `path` (string | RegExp) - The route path or pattern
- `...handlers` (RouteHandler | Middleware[]) - One or more handler functions

**Returns:** `Router` - The router instance for chaining

**Example:**

```typescript
router.put('/users/:id', (req, res) => {
  const { id } = req.params
  const updates = req.body
  res.json({ id, ...updates })
})
```

### `delete(path, ...handlers)`

Register a route that responds to DELETE requests.

**Parameters:**
- `path` (string | RegExp) - The route path or pattern
- `...handlers` (RouteHandler | Middleware[]) - One or more handler functions

**Returns:** `Router` - The router instance for chaining

**Example:**

```typescript
router.delete('/users/:id', (req, res) => {
  const { id } = req.params
  res.status(204).send()
})
```

### `patch(path, ...handlers)`

Register a route that responds to PATCH requests.

**Parameters:**
- `path` (string | RegExp) - The route path or pattern
- `...handlers` (RouteHandler | Middleware[]) - One or more handler functions

**Returns:** `Router` - The router instance for chaining

**Example:**

```typescript
router.patch('/users/:id', (req, res) => {
  const { id } = req.params
  const updates = req.body
  res.json({ id, ...updates })
})
```

### `all(path, ...handlers)`

Register a route that responds to all HTTP methods.

**Parameters:**
- `path` (string | RegExp) - The route path or pattern
- `...handlers` (RouteHandler | Middleware[]) - One or more handler functions

**Returns:** `Router` - The router instance for chaining

**Example:**

```typescript
router.all('/debug', (req, res) => {
  res.json({
    method: req.method,
    path: req.url
  })
})
```

## Middleware

### `use(middleware)` / `use(path, middleware)`

Apply middleware to the router. Can be used globally or for specific paths.

**Parameters:**
- `path` (string | RegExp, optional) - The route path or pattern
- `middleware` (Middleware | Middleware[]) - One or more middleware functions

**Returns:** `Router` - The router instance for chaining

**Examples:**

```typescript
// Global middleware (applies to all routes)
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// Path-specific middleware
router.use('/admin', authenticate, authorize)

// Multiple middleware
router.use([logger, cors, helmet])
```

## Route Patterns

The router supports several path pattern formats:

### String Paths

Simple static paths:

```typescript
router.get('/users', handler)
router.get('/api/products', handler)
```

### Route Parameters

Dynamic segments using `:paramName` syntax:

```typescript
router.get('/users/:id', (req, res) => {
  const { id } = req.params
  res.send(`User ID: ${id}`)
})

// Multiple parameters
router.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params
  res.json({ userId, postId })
})
```

### Regular Expressions

Advanced pattern matching:

```typescript
// Match numeric IDs only
router.get(/^\/users\/(\d+)$/, (req, res) => {
  res.send('User with numeric ID')
})

// Match file extensions
router.get(/\.(jpg|png|gif)$/, (req, res) => {
  res.send('Image file')
})
```

### Wildcard Patterns

Using wildcards for flexible matching:

```typescript
// Match any path starting with /api/
router.get('/api/*', handler)
```

## Method Chaining

Router methods return the router instance, allowing method chaining:

```typescript
router
  .get('/users', getAllUsers)
  .post('/users', createUser)
  .get('/users/:id', getUser)
  .put('/users/:id', updateUser)
  .delete('/users/:id', deleteUser)
```

## Type Definitions

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

### Router Methods

```typescript
interface Router {
  get(path: string | RegExp, ...handlers: Array<RouteHandler | Middleware>): Router
  post(path: string | RegExp, ...handlers: Array<RouteHandler | Middleware>): Router
  put(path: string | RegExp, ...handlers: Array<RouteHandler | Middleware>): Router
  delete(path: string | RegExp, ...handlers: Array<RouteHandler | Middleware>): Router
  patch(path: string | RegExp, ...handlers: Array<RouteHandler | Middleware>): Router
  all(path: string | RegExp, ...handlers: Array<RouteHandler | Middleware>): Router
  use(middleware: Middleware | Middleware[]): Router
  use(path: string | RegExp, middleware: Middleware | Middleware[]): Router
}
```

## Complete Example

```typescript
import { Router, Request, Response, NextFunction } from 'your-framework'

const router = new Router()

// Middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`)
  next()
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // Authentication logic
  next()
}

// Apply global middleware
router.use(logger)

// Define routes with chaining
router
  .get('/users', (req, res) => {
    res.json({ users: [] })
  })
  .post('/users', authenticate, (req, res) => {
    const user = req.body
    res.status(201).json(user)
  })
  .get('/users/:id', (req, res) => {
    const { id } = req.params
    res.json({ id, name: 'John Doe' })
  })
  .put('/users/:id', authenticate, (req, res) => {
    const { id } = req.params
    const updates = req.body
    res.json({ id, ...updates })
  })
  .delete('/users/:id', authenticate, (req, res) => {
    res.status(204).send()
  })

export default router
```

## See Also

- [Request API](/api/request) - Request object properties and methods
- [Response API](/api/response) - Response object properties and methods
- [Routing Guide](/guide/routing) - Comprehensive routing tutorial
- [Middleware Guide](/guide/middleware) - Middleware concepts and patterns
- [Core API](/api/core) - Application core functionality
