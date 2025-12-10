import request from 'supertest';
import mongoose from 'mongoose';
import { jest } from '@jest/globals';
import app from '../server.js';

// --- IMPORT MODELS ---
import { User } from '../backend/models/User.js';
import { Skill, Project, DeveloperService } from '../backend/models/Developer.js';
import { Gallery, Tool, DesignerService } from '../backend/models/Designer.js';
import { Sketch, Book, Thought } from '../backend/models/Creator.js';
import { Snippet, Roadmap, Article } from '../backend/models/Blogger.js';

/* --- CONFIGURATION --- */
const TEST_URI = process.env.MONGO_URI_TEST || "mongodb://127.0.0.1:27017/khilesh-web-test";
let adminToken = '';

const TEST_ADMIN = {
  username: process.env.TEST_ADMIN || 'testadmin',
  password: process.env.TEST_ADMIN_PASSWORD || 'password123'
};

/* --- SETUP & TEARDOWN --- */
beforeAll(async () => {
  // 1. Silence console.error for clean test output (hides intentional DB errors)
  jest.spyOn(console, 'error').mockImplementation(() => {});

  // 2. Force connection to TEST DB
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  await mongoose.connect(TEST_URI);

  // 3. Clean DB before starting
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }

  // 4. EXPLICITLY SEED ADMIN
  await User.create({
    username: TEST_ADMIN.username,
    password: TEST_ADMIN.password
  });
});

afterAll(async () => {
  // 1. Clean up data
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
  
  // 2. Close Connection
  await mongoose.connection.close();
  
  // 3. Restore console logs
  console.error.mockRestore();
});

// =================================================================
// 🧪 DYNAMIC TEST GENERATOR
// =================================================================
const runStandardCrudTests = (resourceName, routePrefix, Model, sampleData, updateData) => {
  describe(`Resource: ${resourceName} (${routePrefix})`, () => {
    let createdId = '';

    // 1. CREATE
    it(`POST ${routePrefix} - should create item (Protected)`, async () => {
      const res = await request(app)
        .post(routePrefix)
        .set('Authorization', adminToken)
        .send(sampleData);
      
      if (res.statusCode !== 201) {
        // We use stdout here because console.error is silenced
        process.stdout.write(`\n❌ Create Failed for ${resourceName}: ${JSON.stringify(res.body)}\n`);
      }

      expect(res.statusCode).toBe(201);
      createdId = res.body._id;
    });

    // 2. GET ALL
    it(`GET ${routePrefix} - should fetch all items`, async () => {
      const res = await request(app).get(routePrefix);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });

    // 3. GET ONE
    it(`GET ${routePrefix}/:id - should fetch single item`, async () => {
      if (!createdId) throw new Error("Skipping test: No ID created in previous step");
      
      const res = await request(app).get(`${routePrefix}/${createdId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(createdId);
    });

    // 4. UPDATE
    it(`PUT ${routePrefix}/:id - should update item (Protected)`, async () => {
      if (!createdId) throw new Error("Skipping test: No ID created in previous step");

      const res = await request(app)
        .put(`${routePrefix}/${createdId}`)
        .set('Authorization', adminToken)
        .send(updateData);

      expect(res.statusCode).toBe(200);
      const key = Object.keys(updateData)[0];
      expect(res.body[key]).toEqual(updateData[key]);
    });

    // 5. DELETE
    it(`DELETE ${routePrefix}/:id - should delete item (Protected)`, async () => {
      if (!createdId) throw new Error("Skipping test: No ID created in previous step");

      const res = await request(app)
        .delete(`${routePrefix}/${createdId}`)
        .set('Authorization', adminToken);
      
      expect(res.statusCode).toBe(200);
    });

    // 6. ERROR HANDLING
    it(`should handle 500 error for ${resourceName}`, async () => {
      // Spy on the Model to force an error
      const spy = jest.spyOn(Model, 'find').mockRejectedValueOnce(new Error('DB Error'));
      
      const res = await request(app).get(routePrefix);
      expect(res.statusCode).toBe(500);
      
      spy.mockRestore(); // Important: Restore original function
    });
  });
};

/* --- MAIN TEST SUITE --- */
describe('🚀 FULL APPLICATION TESTS', () => {

  // 1. AUTHENTICATION
  describe('Authentication', () => {
    it('should login admin and get token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send(TEST_ADMIN); 
      
      if (res.statusCode !== 200) {
        process.stdout.write(`\n❌ Login Failed: ${JSON.stringify(res.body)}\n`);
      }

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      adminToken = res.body.token;
    });
  });

  // ==========================================
  // 2. RUN DYNAMIC TESTS
  // ==========================================
  
  // Developer
  runStandardCrudTests('Developer Skill', '/api/developer/skills', Skill, 
    { category: "LANGUAGES", name: "JavaScript", icon: "Code2", level: 5, xp: "5 Yrs" }, {xp: "5 Yrs"});
  
  runStandardCrudTests('Developer Project', '/api/developer/projects', Project, 
    { title: 'Shop', desc: 'E-com', tech: ['MERN'], year: '2024' }, { title: 'Super Shop' });
  
  runStandardCrudTests('Developer Service', '/api/developer/services', DeveloperService, 
    { title: 'API', icon: 'server', desc: 'Backend', tags: ['Node'] }, { title: 'Backend API' });

  // Designer
  runStandardCrudTests('Designer Gallery', '/api/designer/gallery', Gallery, 
    { title: 'Art', category: 'UI', image: 'img.jpg', tags: ['Figma'] }, { title: 'Modern Art' });
  
  runStandardCrudTests('Designer Tool', '/api/designer/tools', Tool, 
    { name: 'Figma', icon: 'figma-ico', level: 'Expert' }, { level: 'Master' });
  
  runStandardCrudTests('Designer Service', '/api/designer/services', DesignerService, 
    { title: 'UI', icon: 'pen', desc: 'Design', items: ['Web'] }, { desc: 'Pro Design' });

  // Creator
  runStandardCrudTests('Creator Sketch', '/api/creator/sketches', Sketch, 
    { title: 'S1', date: '2024', img: 's.png' }, { title: 'S2' });
  
  runStandardCrudTests('Creator Book', '/api/creator/books', Book, 
    { title: 'Book', author: 'Me', desc: 'Desc', cover: 'c.jpg' }, { desc: 'Best seller' });
  
  runStandardCrudTests('Creator Thought', '/api/creator/thoughts', Thought, 
    { date: 'Now', text: 'Hello' }, { text: 'Hi' });

  // Blogger
  runStandardCrudTests('Blogger Snippet', '/api/blogger/snippets', Snippet, 
    { cat: 'JS', title: 'Loop', code: 'for(;;)' }, { title: 'Infinite Loop' });
  
  runStandardCrudTests('Blogger Roadmap', '/api/blogger/roadmaps', Roadmap, 
    { title: 'Map', level: 'Hard', steps: [{title:'1', desc:'Go'}] }, { level: 'Easy' });

  // ==========================================
  // 3. SPECIAL CASE: ARTICLES
  // ==========================================
  describe('Blogger Article (Complex Structure)', () => {
    let articleId = '';
    const complexPayload = {
      title: 'Rich Text',
      date: 'Dec 2025',
      tags: ['Tech'],
      image: 'img.jpg',
      desc: 'Testing',
      content: [
        { type: 'p', text: 'Intro' },
        { type: 'code', lang: 'js', text: 'log(1)' }
      ]
    };

    it('should Create Article', async () => {
      const res = await request(app)
        .post('/api/blogger/articles')
        .set('Authorization', adminToken)
        .send(complexPayload);
      
      expect(res.statusCode).toBe(201);
      articleId = res.body._id;
    });

    it('should Update Article content', async () => {
      if(!articleId) throw new Error("No Article ID");
      const res = await request(app)
        .put(`/api/blogger/articles/${articleId}`)
        .set('Authorization', adminToken)
        .send({ content: [{ type: 'h1', text: 'Header' }] });

      expect(res.statusCode).toBe(200);
      expect(res.body.content[0].type).toBe('h1');
    });

    it('should Delete Article', async () => {
      if(!articleId) throw new Error("No Article ID");
      await request(app).delete(`/api/blogger/articles/${articleId}`).set('Authorization', adminToken);
    });
  });

});