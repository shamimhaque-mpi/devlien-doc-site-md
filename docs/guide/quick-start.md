# Quick Start

This guide will walk you through building your first application with Devlien.

## Create Your First App

Let's build a simple REST API:

### 1. Initialize the Application

```typescript
import { createApp } from 'devlien'

const app = createApp()
```

### 2. Define Routes

```typescript
// GET request
app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ])
})

// GET request with parameter
app.get('/users/:id', (req, res) => {
  const { id } = req.params
  res.json({ id, name: 'John Doe' })
})

// POST request
app.post('/users', (req, res) => {
  const user = req.body
  res.status(201).json({ id: 3, ...user })
})
```

### 3. Add Middleware

```typescript
// Built-in middleware
app.use(app.json())
app.use(app.cors())

// Custom middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})
```

### 4. Start the Server

```typescript
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
```

## Complete Example

Here's everything together:

```typescript
import { createApp } from 'devlien'

const app = createApp()

// Middleware
app.use(app.json())
app.use(app.cors())

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Your Framework!')
})

app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ])
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params
  res.json({ id: Number(id), name: 'John Doe' })
})

app.post('/users', (req, res) => {
  const user = req.body
  res.status(201).json({ id: 3, ...user })
})

// Start server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
```

## Testing Your API

Use curl or any API client to test:

```bash
# Get all users
curl http://localhost:3000/users

# Get specific user
curl http://localhost:3000/users/1

# Create user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"New User"}'
```

## Next Steps

- Learn about [Routing](/guide/routing) in detail
- Explore [Middleware](/guide/middleware) options
- Set up [Controllers](/guide/controllers) for better organization
