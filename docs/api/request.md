# Request API

The Request object represents the HTTP request and contains properties for the request query string, parameters, body, headers, and more.

## Overview

The Request object is automatically passed as the first argument to route handlers and middleware functions.

```typescript
import { Request } from 'devlien'

app.get('/users/:id', (req: Request, res) => {
  // req is the Request object
  console.log(req.params.id)
  console.log(req.query)
  console.log(req.body)
})
```

## Properties

### `req.params`

An object containing route parameters (named URL segments).

**Type:** `Record<string, string>`

**Example:**

```typescript
// Route: /users/:userId/posts/:postId
app.get('/users/:userId/posts/:postId', (req, res) => {
  console.log(req.params.userId)  // "123"
  console.log(req.params.postId)  // "456"
  res.send(`User ${req.params.userId}, Post ${req.params.postId}`)
})

// Request: GET /users/123/posts/456
```

### `req.query`

An object containing the URL query string parameters.

**Type:** `Record<string, string | string[]>`

**Example:**

```typescript
app.get('/search', (req, res) => {
  console.log(req.query.q)        // "javascript"
  console.log(req.query.page)     // "2"
  console.log(req.query.filters)  // ["new", "popular"]

  res.json({
    query: req.query.q,
    page: parseInt(req.query.page),
    filters: req.query.filters
  })
})

// Request: GET /search?q=javascript&page=2&filters=new&filters=popular
```

### `req.body`

Contains the parsed request body. Requires body-parser middleware.

**Type:** `any`

**Example:**

```typescript
// Enable JSON body parsing
app.use(app.json())

app.post('/users', (req, res) => {
  console.log(req.body.name)   // "John Doe"
  console.log(req.body.email)  // "john@example.com"

  const user = {
    id: Date.now(),
    ...req.body
  }

  res.status(201).json(user)
})

// Request: POST /users
// Body: { "name": "John Doe", "email": "john@example.com" }
```

### `req.headers`

An object containing request headers.

**Type:** `Record<string, string | string[]>`

**Example:**

```typescript
app.get('/api/data', (req, res) => {
  console.log(req.headers['content-type'])    // "application/json"
  console.log(req.headers['authorization'])   // "Bearer token123"
  console.log(req.headers['user-agent'])      // "Mozilla/5.0..."

  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  res.json({ data: 'sensitive data' })
})
```

### `req.method`

The HTTP method of the request.

**Type:** `string`

**Values:** `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`, `"PATCH"`, etc.

**Example:**

```typescript
app.all('/debug', (req, res) => {
  console.log(req.method)  // "GET", "POST", etc.

  res.json({
    method: req.method,
    message: `Received ${req.method} request`
  })
})
```

### `req.url`

The full request URL path including query string.

**Type:** `string`

**Example:**

```typescript
app.get('*', (req, res) => {
  console.log(req.url)  // "/users/123?sort=name"

  res.json({
    url: req.url,
    path: req.path
  })
})

// Request: GET /users/123?sort=name
```

### `req.path`

The path part of the request URL (without query string).

**Type:** `string`

**Example:**

```typescript
app.get('*', (req, res) => {
  console.log(req.path)  // "/users/123"
  console.log(req.url)   // "/users/123?sort=name"

  res.send(`Path: ${req.path}`)
})

// Request: GET /users/123?sort=name
```

### `req.protocol`

The request protocol (`http` or `https`).

**Type:** `string`

**Example:**

```typescript
app.get('/', (req, res) => {
  console.log(req.protocol)  // "http" or "https"

  if (req.protocol !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`)
  }

  res.send('Secure connection')
})
```

### `req.hostname`

The hostname from the `Host` header.

**Type:** `string`

**Example:**

```typescript
app.get('/', (req, res) => {
  console.log(req.hostname)  // "example.com"

  res.send(`Welcome to ${req.hostname}`)
})

// Request: GET / with Host: example.com
```

### `req.ip`

The remote IP address of the request.

**Type:** `string`

**Example:**

```typescript
app.get('/api/data', (req, res) => {
  console.log(req.ip)  // "192.168.1.1"

  // Log the request
  console.log(`Request from ${req.ip} to ${req.path}`)

  res.json({ success: true })
})
```

### `req.cookies`

An object containing cookies. Requires cookie-parser middleware.

**Type:** `Record<string, string>`

**Example:**

```typescript
app.get('/dashboard', (req, res) => {
  console.log(req.cookies.sessionId)  // "abc123"
  console.log(req.cookies.theme)      // "dark"

  const sessionId = req.cookies.sessionId
  if (!sessionId) {
    return res.status(401).send('No session found')
  }

  res.send('Welcome back!')
})
```

## Methods

### `req.get(header)`

Get a request header value (case-insensitive).

**Parameters:**
- `header` (string) - The header name

**Returns:** `string | undefined`

**Example:**

```typescript
app.get('/api/data', (req, res) => {
  const contentType = req.get('Content-Type')
  const auth = req.get('authorization')
  const userAgent = req.get('User-Agent')

  console.log(contentType)  // "application/json"
  console.log(auth)         // "Bearer token123"

  res.json({ contentType, auth })
})
```

### `req.is(type)`

Check if the request's `Content-Type` matches the given MIME type.

**Parameters:**
- `type` (string) - MIME type or extension

**Returns:** `boolean`

**Example:**

```typescript
app.post('/upload', (req, res) => {
  if (req.is('application/json')) {
    console.log('JSON data received')
  }

  if (req.is('multipart/form-data')) {
    console.log('File upload detected')
  }

  if (req.is('json')) {
    // Shorthand also works
    console.log('JSON request')
  }

  res.send('Upload received')
})
```

### `req.accepts(types)`

Check if the specified content types are acceptable based on the `Accept` header.

**Parameters:**
- `types` (string | string[]) - MIME type(s) or extension(s)

**Returns:** `string | false`

**Example:**

```typescript
app.get('/data', (req, res) => {
  const acceptsJSON = req.accepts('json')
  const acceptsHTML = req.accepts('html')

  if (req.accepts('json')) {
    return res.json({ data: 'JSON response' })
  }

  if (req.accepts('html')) {
    return res.send('<h1>HTML response</h1>')
  }

  res.status(406).send('Not Acceptable')
})
```

## Type Definition

```typescript
interface Request {
  // Properties
  params: Record<string, string>
  query: Record<string, string | string[]>
  body: any
  headers: Record<string, string | string[]>
  method: string
  url: string
  path: string
  protocol: string
  hostname: string
  ip: string
  cookies: Record<string, string>

  // Methods
  get(header: string): string | undefined
  is(type: string): boolean
  accepts(types: string | string[]): string | false
}
```

## Common Patterns

### Extracting Route Parameters

```typescript
app.get('/users/:id', (req, res) => {
  const { id } = req.params

  // Convert to number if needed
  const userId = parseInt(id)

  res.json({ userId })
})
```

### Parsing Query Strings

```typescript
app.get('/search', (req, res) => {
  const { q, page = '1', limit = '10' } = req.query

  const results = {
    query: q,
    page: parseInt(page),
    limit: parseInt(limit)
  }

  res.json(results)
})
```

### Accessing Request Body

```typescript
app.use(app.json())

app.post('/users', (req, res) => {
  const { name, email, age } = req.body

  // Validation
  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required'
    })
  }

  const user = { id: Date.now(), name, email, age }
  res.status(201).json(user)
})
```

### Reading Headers

```typescript
app.get('/api/data', (req, res) => {
  const token = req.get('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  // Verify token...
  res.json({ data: 'protected data' })
})
```

### Content Negotiation

```typescript
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ]

  if (req.accepts('json')) {
    return res.json(users)
  }

  if (req.accepts('html')) {
    const html = users.map(u => `<li>${u.name}</li>`).join('')
    return res.send(`<ul>${html}</ul>`)
  }

  res.status(406).send('Not Acceptable')
})
```

### Complete Example

```typescript
import { createApp, Request, Response } from 'devlien'

const app = createApp()

app.use(app.json())

app.post('/api/users/:id/posts', (req: Request, res: Response) => {
  // Route parameters
  const { id } = req.params
  console.log('User ID:', id)

  // Query parameters
  const { publish = 'false' } = req.query
  console.log('Publish:', publish)

  // Request body
  const { title, content } = req.body
  console.log('Title:', title)
  console.log('Content:', content)

  // Headers
  const contentType = req.get('Content-Type')
  const auth = req.get('Authorization')
  console.log('Content-Type:', contentType)
  console.log('Auth:', auth)

  // Request metadata
  console.log('Method:', req.method)      // "POST"
  console.log('Path:', req.path)          // "/api/users/123/posts"
  console.log('Protocol:', req.protocol)  // "http" or "https"
  console.log('IP:', req.ip)              // Client IP

  // Validation
  if (!title || !content) {
    return res.status(400).json({
      error: 'Title and content are required'
    })
  }

  // Create post
  const post = {
    id: Date.now(),
    userId: parseInt(id),
    title,
    content,
    published: publish === 'true',
    createdAt: new Date()
  }

  res.status(201).json(post)
})

app.listen(3000)
```

## See Also

- [Response API](/api/response) - Response object properties and methods
- [Router API](/api/router) - Routing and route handlers
- [Core API](/api/core) - Application and middleware
- [Routing Guide](/guide/routing) - Routing tutorial
