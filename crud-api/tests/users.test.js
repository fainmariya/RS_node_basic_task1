import {test, before, after} from 'node:test';
import assert from 'assert';
import { server } from '../src/server.js';

const PORT = process.env.PORT ?? 4000;
const BASE_URL = 'http://localhost:4000/api/users';

//helpier

async function requestJson(url, options={}) {
    const res= await fetch(url,options);
    let body  = null;

    if (res.status !== 204){
body = await res.json();
    }
    return {status:res.status,body}
    
}

before(async () => {
    
    const res = await fetch(BASE_URL);
  });
  
  after(() => {
    
    server.close(); // аккуратно гасим сервер
  });
  
  test('full users CRUD flow', async () => {
    // 1. GET /api/users
    // 2. POST /api/users
    // 3. GET /api/users/{id}
    // 4. PUT /api/users/{id}
    // 5. DELETE /api/users/{id}
    // 6. GET /api/users/{id} → 404
// 1. GET /api/users — just checking that this is an array
{
    const { status, body } = await requestJson(BASE_URL);
    assert.equal(status, 200);
    assert.ok(Array.isArray(body));
  }
   
// 2. POST /api/users —  creating a user
  const userPayload = {
    username: 'TestUser',
    age: 30,
    hobbies: ['coding', 'music']
  };
  const { status: createStatus, body: createdUser } = await requestJson(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userPayload)
  });

  assert.equal(createStatus, 201);
  assert.ok(createdUser.id);
  assert.equal(createdUser.username, userPayload.username);

  const userId = createdUser.id;

  // 3. GET /api/users/{id} — should return the created user
  {
    const { status, body } = await requestJson(`${BASE_URL}/${userId}`);
    assert.equal(status, 200);
    assert.equal(body.id, userId);
    assert.equal(body.username, userPayload.username);
  }

  // 4. PUT /api/users/{id} — updating
  const updatedPayload = {
    username: 'UpdatedUser',
    age: 31,
    hobbies: ['reading']
  };

  {
    const { status, body } = await requestJson(`${BASE_URL}/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPayload)
    });

    assert.equal(status, 200);
    assert.equal(body.id, userId);
    assert.equal(body.username, updatedPayload.username);
    assert.equal(body.age, updatedPayload.age);
  }

  // 5. DELETE /api/users/{id}
  {
    const { status } = await requestJson(`${BASE_URL}/${userId}`, {
      method: 'DELETE'
    });

    assert.equal(status, 204);
  }

  // 6. GET /api/users/{id} after delete → 404
  {
    const { status } = await requestJson(`${BASE_URL}/${userId}`);
    assert.equal(status, 404);
  }
});

// 2) GET with a non-existent id (a valid UUID, but such a user does not exist)
test('GET non-existing user returns 404', async () => {
  const fakeId = '00000000-0000-4000-8000-000000000000';

  const { status } = await requestJson(`${BASE_URL}/${fakeId}`);

  assert.equal(status, 404);
});

// 3) POST with an invalid body → 400
test('POST with invalid body returns 400', async () => {
  const badPayload = {
    username: 123,         //  string
    age: 'not a number',   //  number
    hobbies: 'not array'   // array
  };

  const { status, body } = await requestJson(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(badPayload)
  });

  assert.equal(status, 400);
  assert.ok(body.message.includes('Invalid user data'));
});
