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
        test('GET 200: takes an article_id and responds with the correct article and comment_count', () => {
            return request(app)
            .get('/api/articles/5')
            .expect(200)
            .then((response) => {
                const article = response.body.article
                expect(article.comment_count).toBe(2)
            })
        })
    test('GET 404: send an appropriate status and error message when given a valid but non-existent article_id', () => {
        return request(app)
            .get('/api/articles/90')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe('Not found')
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
        test('200: sorts articles in descending order of date', () => {
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then((response) => {
                expect(response.body.allArticles).toBeSortedBy('created_at', { descending: true })
            })
    })
})

describe('/api/articles/:article_id/comments', () => {
    test('GET 200: takes and article id & responds with array of all comments for article', () => {
        return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then((response) => {
                const body = response.body.comments
                body.forEach((comment) => {
                    expect(typeof comment.comment_id).toBe('number')
                    expect(typeof comment.votes).toBe('number')
                    expect(typeof comment.created_at).toBe('string')
                    expect(typeof comment.author).toBe('string')
                    expect(typeof comment.body).toBe('string')
                    expect(typeof comment.article_id).toBe('number')
                })
            })
    })
    test('200: returns comments in order of most recent comment', () => {
        return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then((response) => {
                expect(response.body.comments).toBeSortedBy('created_at', { descending: true })
            })
    })
    test('ERROR 404: send an appropriate status and error message when given a valid but non-existent article_id', () => {
        return request(app)
            .get('/api/articles/90/comments')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe('Not found')
            })
    })
    test('ERROR 400: sends appropraite status and error message when given an invalid article_id', () => {
        return request(app)
            .get('/api/articles/not_a_valid_id/comments')
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('Bad request')
            })
    })
})

describe('POST /api/articles/:article_id/comments', () => {
    test('POST 201: adds a comment for an article', () => {
        const newComment = {
            author: 'butter_bridge',
            body: 'Take life as it comes'
        }
        return request(app)
        .post('/api/articles/1/comments')
        .send(newComment)
        .expect(201)
        .then((response) => {
            expect(response.body.comment).toBe('Take life as it comes')
        })
    })
    test('ERROR 404: send an appropriate status and error message when given a valid but non-existent article_id', () => {
        const newComment = {
            author: 'butter_bridge',
            body: 'hello error comment here'
        }
        return request(app)
            .post('/api/articles/90/comments')
            .send(newComment)
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe('Not found')
            })
    })
    test('ERROR 400: sends appropriate status and error message when given invalid article_id', () => {
        const newComment = {
            author: 'butter_bridge',
            body: 'hello error comment here'
        }
        return request(app)
            .post('/api/articles/not_a_valid_id/comments')
            .send(newComment)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('Bad request')
            })
    })
    test('ERROR 404: sends appropriate status and error message with given a non-existent username', () => {
        const newComment = {
            author: 'i_dont_exist',
            body: 'hello error comment here'
        }
        return request(app)
            .post('/api/articles/1/comments')
            .send(newComment)
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe('Not found')
            })
    })
    test('ERROR 400: sends appropriate status and error message when an empty message body is sent', () => {
        const newComment = {
            author: 'butter_bridge',
            body: ''
        }
        return request(app)
            .post('/api/articles/1/comments')
            .send(newComment)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('Bad request')
            })
    })
    test('ERROR 400: sends appropriate status and error message when a property is missing', () => {
        const newComment = {
            author: 'butter_bridge'
        }
        return request(app)
            .post('/api/articles/1/comments')
            .send(newComment)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('Bad request')
            })
    })
})

describe('PATCH /api/articles/:article_id', () => {
    test('PATCH 200: updates an article by article_id with a positive number', () => {
        const update = { inc_votes : 2 }
        return request(app)
        .patch('/api/articles/1')
        .send(update)
        .expect(200)
        .then((response) => {
            const body = response.body.article
            expect(body.article_id).toBe(1)
            expect(body.author).toBe('butter_bridge')
            expect(body.title).toBe('Living in the shadow of a great man')
            expect(body.body).toBe('I find this existence challenging')
            expect(body.topic).toBe('mitch')
            expect(body.created_at).toBe('2020-07-09T19:11:00.000Z')
            expect(body.votes).toBe(102)
            expect(body.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700')
        })
    })
    test('PATCH 200: updates an article by article_id with a negative number', () => {
        const update = { inc_votes : -2 }
        return request(app)
        .patch('/api/articles/1')
        .send(update)
        .expect(200)
        .then((response) => {
            const body = response.body.article
            expect(body.article_id).toBe(1)
            expect(body.author).toBe('butter_bridge')
            expect(body.title).toBe('Living in the shadow of a great man')
            expect(body.body).toBe('I find this existence challenging')
            expect(body.topic).toBe('mitch')
            expect(body.created_at).toBe('2020-07-09T19:11:00.000Z')
            expect(body.votes).toBe(98)
            expect(body.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700')
        })
    })
    test('ERROR 404: send an appropriate status and error message when given a valid but non-existent article_id', () => {
        const update = { inc_votes : 2 }
        return request(app)
        .patch('/api/articles/99')
        .send(update)
        .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe('Not found')
            })
    })
    test('ERROR 400: sends appropriate status and error message when given invalid article_id', () => {
        const update = { inc_votes : 2 }
        return request(app)
        .patch('/api/articles/not_a_valid_id')
        .send(update)
        .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('Bad request')
            })
    })
    test('ERROR 400: sends appropriate status and error message when passed an invalid object value', () => {
        const update = {inc_votes: 'invalid_vote_two'}
        return request(app)
        .patch('/api/articles/1')
        .send(update)
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request')
        })
    })
    test('ERROR 400: sends appropriate status and error message when passed an invalid object key', () => {
        const update = {invalid_object_key: 2}
        return request(app)
        .patch('/api/articles/1')
        .send(update)
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request')
        })
    })
    test('ERROR 400: sends appropriate status and error message when passed an invalid object', () => {
        const update = {invalid_object_key: 'invalid_object_value'}
        return request(app)
        .patch('/api/articles/1')
        .send(update)
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request')
        })
    })
})

describe('DELETE /api/comments/:comment_id', () => {
    test('DELETE 200: deletes comment by comment_id', () => {
        return request(app)
        .delete('/api/comments/1')
        .expect(204)
    })
    test('ERROR 404: send an appropriate status and error message when given a valid but non-existent article_id', () => {
        const update = { inc_votes : 2 }
        return request(app)
        .delete('/api/comments/90')
        .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe('Not found')
            })
    })
    test('ERROR 400: sends appropriate status and error message when given invalid article_id', () => {
        const update = { inc_votes : 2 }
        return request(app)
        .delete('/api/comments/not_a_valid_id')
        .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('Bad request')
            })
    })
})

describe('GET /api/users', () => {
    test('GET 200: respond with an array of objects with correct properties', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then((response) => {
            const body = response.body.users
            expect(body.length).toBe(4)
            body.forEach((user) => {
                expect(typeof user).toBe('object')
                expect(typeof user.username).toBe('string')
                expect(typeof user.name).toBe('string')
                expect(typeof user.avatar_url).toBe('string')
            })
        })
    })

})

describe('GET topic query /api/articles', () => {
    test('takes a topic query and responds with all articles on that topic', () => {
        return request(app)
        .get('/api/articles')
        .query({topic: 'cats'})
        .expect(200)
        .then((response) => {
            const allArticles = response.body.allArticles
            allArticles.forEach((article) => {
                expect(article.topic).toBe('cats')
            })
        })
    })
    test('ERROR 404: send an appropriate status and error message when given an existent topic that has no articles', () => {
        return request(app)
        .get('/api/articles')
        .query({topic: 'paper'})
        .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe('Not found')
            })
    })
    test('ERROR 400: send an appropriate status and error message when given a non-existent topic', () => {
        return request(app)
        .get('/api/articles')
        .query({topic: 'beaches and mangoes'})
        .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('Bad request')
            })
    })
})

