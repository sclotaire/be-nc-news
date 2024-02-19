const app = require('../db/app-model-controller/app')
const request = require('supertest')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/index')
const endpointsData = require('../endpoints.json')
//const developmentData = require('../db/data/development-data/index')

beforeEach(() => seed(testData))
afterAll(() => db.end())

describe('GET /api/topics', () => {
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

// create an app that in the model adds to the endpoints.json in a dynamic way
describe('GET /api', () => {
    test('responds with an object describing all available endpoints on API', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {
            const body = response.body
            expect(body.endpointsData).toEqual(endpointsData)
        })
    })

    //tuesday- start with error testing then task 4
    //error test. 404 'not found'
})