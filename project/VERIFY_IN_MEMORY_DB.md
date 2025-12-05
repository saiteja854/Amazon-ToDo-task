# How to Verify In-Memory Database

This guide explains how to verify that the Todo App uses an **in-memory database** instead of a persistent database.

## What is an In-Memory Database?

An in-memory database stores data in the server's RAM (Random Access Memory) instead of on disk. This means:
- ✅ Data is stored in JavaScript arrays/objects in memory
- ❌ Data is **NOT** saved to files
- ❌ Data is **NOT** stored in external databases (MongoDB, PostgreSQL, etc.)
- ⚠️ Data is **lost** when the server restarts

## Verification Methods

### Method 1: Check the Code Structure

1. **Open the database file:**
   ```
   backend/src/database.ts
   ```

2. **Look for these indicators:**
   - ✅ Private arrays: `private todos: Todo[] = []` and `private categories: Category[] = []`
   - ✅ No file system operations (no `fs.writeFile`, `fs.readFile`)
   - ✅ No database imports (no `mongoose`, `pg`, `sqlite3`, etc.)
   - ✅ Data stored in simple JavaScript arrays

### Method 2: Check for Database Files

1. **Check the backend directory:**
   ```bash
   cd backend
   ls -la
   ```

2. **Verify NO database files exist:**
   - ❌ No `database.db` (SQLite)
   - ❌ No `data.json` (JSON file storage)
   - ❌ No `todos.json` or `categories.json`
   - ❌ No `.env` with database connection strings
   - ❌ No `mongodb` or `postgres` connection files

3. **Check package.json:**
   ```bash
   cat backend/package.json
   ```
   - ✅ Should NOT have database dependencies like:
     - `mongoose`, `mongodb`
     - `pg`, `postgres`, `postgresql`
     - `sqlite3`, `better-sqlite3`
     - `sequelize`, `typeorm`

### Method 3: Test Data Persistence (Easiest Method)

**This is the most reliable way to verify:**

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Create some data:**
   - Open the frontend app
   - Create a few todos and categories
   - Verify they appear in the UI

3. **Stop the server:**
   - Press `Ctrl+C` to stop the backend server

4. **Restart the server:**
   ```bash
   npm run dev
   ```

5. **Check the frontend:**
   - ⚠️ **All your todos and categories should be GONE!**
   - This proves data is NOT persisted to disk
   - If it were a real database, data would still be there

### Method 4: Use the Database Info Endpoint

1. **Start the backend server**

2. **Call the database info endpoint:**
   ```bash
   curl http://localhost:3001/api/db-info
   ```
   
   Or open in browser: `http://localhost:3001/api/db-info`

3. **Expected response:**
   ```json
   {
     "type": "In-Memory Database",
     "description": "Data is stored in JavaScript arrays in server memory",
     "storage": "RAM (Random Access Memory)",
     "persistence": "Data is lost when server restarts",
     "currentStats": {
       "totalTodos": 5,
       "totalCategories": 2,
       "activeTodos": 3,
       "completedTodos": 2
     },
     "verification": {
       "noDatabaseFiles": "No database files (SQLite, JSON, etc.) are created",
       "noExternalConnections": "No connections to external databases (MongoDB, PostgreSQL, etc.)",
       "dataInMemory": "All data stored in private arrays: todos[] and categories[]",
       "location": "backend/src/database.ts"
     }
   }
   ```

### Method 5: Inspect the Code

**Check `backend/src/database.ts`:**

```typescript
// In-memory database
class Database {
  private todos: Todo[] = [];           // ← Stored in memory (RAM)
  private categories: Category[] = [];  // ← Stored in memory (RAM)
  // ... no file operations, no database connections
}
```

**Key indicators:**
- ✅ Uses JavaScript arrays (`[]`)
- ✅ No `fs` (file system) module imports
- ✅ No database client imports
- ✅ Data only exists while the process is running

### Method 6: Check Server Logs

When you start the server, you should see:
```
Server is running on http://localhost:3001
```

**You should NOT see:**
- ❌ "Connected to MongoDB"
- ❌ "Database initialized"
- ❌ "SQLite database opened"
- ❌ Any database connection messages

## Quick Test Script

Run this to quickly verify:

```bash
# 1. Start server
cd backend
npm run dev

# 2. In another terminal, create some data via API
curl -X POST http://localhost:3001/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Category","color":"#ff0000"}'

# 3. Check data exists
curl http://localhost:3001/api/categories

# 4. Stop server (Ctrl+C)

# 5. Restart server
npm run dev

# 6. Check data again - should be empty!
curl http://localhost:3001/api/categories
# Should return: []
```

## Summary

✅ **In-Memory Database Confirmed If:**
- Data is lost on server restart
- No database files exist
- Code uses simple JavaScript arrays
- No database dependencies in package.json
- `/api/db-info` endpoint confirms in-memory storage

❌ **NOT In-Memory If:**
- Data persists after server restart
- Database files exist in the project
- Database dependencies are installed
- Connection strings in environment variables

## Why Use In-Memory Database?

For this assessment/demo:
- ✅ Simple setup (no database installation needed)
- ✅ Fast development
- ✅ No external dependencies
- ✅ Perfect for testing and demonstrations

For production, you would use:
- PostgreSQL, MySQL, MongoDB, etc.
- Data persistence
- Better performance at scale
- Data backup and recovery

