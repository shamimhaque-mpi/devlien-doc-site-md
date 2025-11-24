# Routing

Routing refers to how your application responds to client requests to specific endpoints (URIs) and HTTP methods.

## Basic Routing

Routes are defined using methods corresponding to HTTP verbs:

```typescript
// GET request
app.get('/path', (req, res) => {
  res.send('GET request')
})

// POST request
app.post('/path', (req, res) => {
  res.send('POST request')
})

// PUT request
app.put('/path', (req, res) => {
  res.send('PUT request')
})

// DELETE request
app.delete('/path', (req, res) => {
  res.send('DELETE request')
})

// Handle all HTTP methods
app.all('/path', (req, res) => {
  res.send('Any HTTP method')
})
```

## Route Parameters

Capture dynamic values in the URL:

```typescript
// Single parameter
app.get('/users/:id', (req, res) => {
  const { id } = req.params
  res.send(`User ID: ${id}`)
})

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params
  res.json({ userId, postId })
})
```

## Query Parameters

Access query string parameters:

```typescript
// URL: /search?q=nodejs&limit=10
app.get('/search', (req, res) => {
  const { q, limit } = req.query
  res.json({ query: q, limit })
})
```

## Route Groups

Organize related routes with prefixes:

```typescript
const apiRouter = app.router()

apiRouter.get('/users', (req, res) => {
  // GET /api/users
})

apiRouter.post('/users', (req, res) => {
  // POST /api/users
})

app.use('/api', apiRouter)
```

## Route Middleware

Apply middleware to specific routes:

```typescript
// Single middleware
app.get('/protected', authMiddleware, (req, res) => {
  res.send('Protected route')
})

// Multiple middleware
app.get('/admin', [authMiddleware, adminMiddleware], (req, res) => {
  res.send('Admin route')
})
```

## Regular Expressions

Use regex patterns for advanced routing:

```typescript
// Match paths like /user123, /user456
app.get(/^\/user(\d+)$/, (req, res) => {
  res.send('User route with regex')
})
```

## Next Steps

- Learn about [Middleware](/guide/middleware)
- Explore [Controllers](/guide/controllers)
