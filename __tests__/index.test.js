const app = require('../db/app')
const request = require('supertest')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data/index')
const endpointsData = require('../endpoints.json')
//const jestSorted = require('jest-sorted')
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
                expect(body.author).toBe('butter_bridge')
                expect(body.title).toBe('Living in the shadow of a great man')
                expect(body.body).toBe('I find this existence challenging')
                expect(body.topic).toBe('mitch')
                expect(body.created_at).toBe('2020-07-09T19:11:00.000Z')
                expect(body.votes).toBe(100)
                expect(body.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700')
            })
    })
    test('GET 404: send an appropriate status and error message when given a valid but non-existent article_id', () => {
        return request(app)
        .get('/api/articles/90')
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

describe('/api/articles', () => {
    test('GET 200: responds with an array of objects with all articles', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
            const body = response.body
            body.allArticles.forEach((article) => {
                expect(typeof article.author).toBe('string')
                expect(typeof article.title).toBe('string')
                expect(typeof article.article_id).toBe('number')
                expect(typeof article.topic).toBe('string')
                expect(typeof article.created_at).toBe('string')
                expect(typeof article.votes).toBe('number')
                expect(typeof article.article_img_url).toBe('string')
                expect(typeof article.comment_count).toBe('string')
                expect(article.hasOwnProperty('body')).toBe(false)
            })
        })
    })
    test('sorts articles in order of date', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
            expect(response.body.allArticles).toBeSortedBy('created_at', {descending: true})
        })
    })
})