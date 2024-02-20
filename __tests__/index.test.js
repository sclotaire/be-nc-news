const app = require('../db/app')
const request = require('supertest')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/index')
const endpointsData = require('../endpoints.json')
//const developmentData = require('../db/data/development-data/index')

beforeEach(() => seed(testData))
afterAll(() => db.end())

describe('GET /api/topics', () => {
    test('GET 200: responds with an array of all topic objects with SLUG and DESCRIPTION as properties', () => {
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

describe('GET /api', () => {
    test('GET 200: responds with an object describing all available endpoints on API', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then((response) => {
                const body = response.body
                console.log(body)
                expect(body.endpointsData).toEqual(endpointsData)
            })
    })

})

describe('/api/articles/:article_id', () => {
    test('GET 200: responds with the object of the queried article_id', () => {
        return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then((response) => {
                const body = response.body.article
                expect(body.article_id).toBe(1)
                expect(typeof body.author).toBe('string')
                expect(typeof body.title).toBe('string')
                expect(typeof body.body).toBe('string')
                expect(typeof body.topic).toBe('string')
                expect(typeof body.created_at).toBe('string')
                expect(typeof body.votes).toBe('number')
                expect(typeof body.article_img_url).toBe('string')
            })
    })
    test('GET 404: send an appropriate status and error message when given a valid but non-existent article_id', () => {
        return request(app)
        .get('/api/articles/9867594')
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('article does not exist')
        })
    })
    test('GET 400: sends appropraite status and error message when given an invalid article_id', () => {
        return request(app)
        .get('/api/articles/not_a_valid_id')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request')
        })
    })
})