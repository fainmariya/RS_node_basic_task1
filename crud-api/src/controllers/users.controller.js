import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  } from '../db/users.repository.js';
  import { parseJsonBody } from '../utils/parseBody.js';
  import { validateUserPayload, isValidUuid } from '../utils/validate.js';
  
  // ---------- /api/users ----------
  export async function handleUsersCollection(req, res) {
    const method = req.method;
  
    // GET /api/users
    if (method === 'GET') {
      const users = getAllUsers();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(users));
      return;
    }
  
    // POST /api/users
    if (method === 'POST') {
      let body;
  
      try {
        body = await parseJsonBody(req);
      } catch (err) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ message: 'Invalid JSON body' }));
        return;
      }
  
      const validation = validateUserPayload(body);
      if (!validation.valid) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(
          JSON.stringify({
            message: `Invalid user data: ${validation.message}`
          })
        );
        return;
      }
  
      const newUser = createUser(body);
  
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(newUser));
      return;
    }
  
    // остальные методы для /api/users
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ message: 'Method not allowed' }));
  }
  
  // ---------- /api/users/:id ----------
  export async function handleUserItem(req, res, userId) {
    const method = req.method;
  
    // проверяем UUID
    if (!isValidUuid(userId)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ message: 'Invalid userId (not a UUID)' }));
      return;
    }
  
    // GET /api/users/:id
    if (method === 'GET') {
      const user = getUserById(userId);
  
      if (!user) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
      }
  
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(user));
      return;
    }
  
    // PUT /api/users/:id
    if (method === 'PUT') {
      let body;
  
      try {
        body = await parseJsonBody(req);
      } catch (err) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ message: 'Invalid JSON body' }));
        return;
      }
  
      const validation = validateUserPayload(body);
      if (!validation.valid) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(
          JSON.stringify({
            message: `Invalid user data: ${validation.message}`
          })
        );
        return;
      }
  
      const existing = getUserById(userId);
      if (!existing) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
      }
  
      const updated = updateUser(userId, body);
  
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(updated));
      return;
    }
  
    // DELETE /api/users/:id
    if (method === 'DELETE') {
      const deleted = deleteUser(userId);
  
      if (!deleted) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
      }
  
      res.statusCode = 204;
      res.end();
      return;
    }
  
    // остальные методы
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ message: 'Method not allowed' }));
  }