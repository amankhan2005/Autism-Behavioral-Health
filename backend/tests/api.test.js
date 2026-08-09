import { test, before, mock } from 'node:test';
import assert from 'node:assert/strict';

// Configure test env BEFORE importing the app.
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/abh-test';
process.env.CLIENT_ORIGIN = 'http://localhost:5173';
process.env.RATE_LIMIT_MAX = '4';
process.env.RATE_LIMIT_WINDOW_MS = '60000';

const { createApp } = await import('../src/app.js');
const request = (await import('supertest')).default;

const app = createApp();

const validContact = {
  fullName: 'Jordan Rivera',
  email: 'jordan@example.com',
  phone: '(555) 123-4567',
  message: 'I would love to learn more about ABA services for my child.',
  consent: true,
};

test('GET /api/v1/health → 200 with status ok', async () => {
  const res = await request(app).get('/api/v1/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'ok');
  assert.ok('db' in res.body);
});

test('security headers present (helmet)', async () => {
  const res = await request(app).get('/api/v1/health');
  assert.ok(res.headers['x-content-type-options'], 'x-content-type-options set');
  assert.ok(res.headers['x-dns-prefetch-control'] !== undefined);
});

test('unknown route → 404 with success:false', async () => {
  const res = await request(app).get('/api/v1/nope');
  assert.equal(res.status, 404);
  assert.equal(res.body.success, false);
});

test('POST contact with invalid body → 400 with field errors', async () => {
  const res = await request(app).post('/api/v1/contact').send({ email: 'not-an-email' });
  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
  assert.ok(res.body.errors.fullName, 'reports missing fullName');
  assert.ok(res.body.errors.email, 'reports invalid email');
});

test('honeypot field → 200 and submission dropped (Model.create not called)', async () => {
  const { ContactMessage } = await import('../src/models/ContactMessage.js');
  const createMock = mock.method(ContactMessage, 'create', async () => ({ _id: 'x' }));
  const res = await request(app).post('/api/v1/contact').send({ ...validContact, company: 'spam-bot' });
  assert.equal(res.status, 200);
  assert.equal(createMock.mock.callCount(), 0, 'create must not run for a trapped bot');
  createMock.mock.restore();
});

test('POST valid contact → 201 (model mocked; email no-ops without RESEND key)', async () => {
  const { ContactMessage } = await import('../src/models/ContactMessage.js');
  const createMock = mock.method(ContactMessage, 'create', async (doc) => ({ _id: 'abc123', ...doc }));

  const res = await request(app).post('/api/v1/contact').send(validContact);
  assert.equal(res.status, 201);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.id, 'abc123');
  assert.equal(createMock.mock.callCount(), 1);

  createMock.mock.restore();
});

test('rate limiter → 429 after the configured max', async () => {
  const agent = request(app);
  let status;
  for (let i = 0; i < 6; i++) {
    // invalid bodies still count toward the limiter (it runs first)
    const r = await agent.post('/api/v1/insurance-inquiry').send({});
    status = r.status;
  }
  assert.equal(status, 429, 'eventually rate-limited');
});
