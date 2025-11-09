import {
    handleUsersCollection,
    handleUserItem
  } from '../controllers/users.controller.js';
  
  export async function router(req, res) {
    const url = new URL(req.url ?? '', 'http://localhost');
    const { pathname } = url;
  
    const segments = pathname.split('/').filter(Boolean);
    // /api/users
    if (segments[0] === 'api' && segments[1] === 'users' && segments.length === 2) {
      return handleUsersCollection(req, res);
    }
  
    // /api/users/:id
    if (segments[0] === 'api' && segments[1] === 'users' && segments.length === 3) {
      const userId = segments[2];
      return handleUserItem(req, res, userId);
    }
  
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ message: 'Route not found' }));
  }