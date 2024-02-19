const app = require('../db/app-model-controller/app')
const request = require('supertest')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/index')
//const developmentData = require('../db/data/development-data/index')

beforeEach(() => seed(testData))
afterAll(() => db.end())


describe('GET api/topics', () => {
    test('responds with an array of all topic objects with SLUG and DESCRIPTION as properties', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response) => {
            const body = response.body
            expect(body.topics.length).toBe(3);
            body.topics.forEach((topic) => {
                expect(typeof topic.description).toBe('string')
                expect(typeof topic.slug).toBe('string')
            })
        })
    })
})