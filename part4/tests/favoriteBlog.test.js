const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('favoriteBlog', () => {
    test ('of one blog is the favorite', () => {
        const blogs = [{
            title: 'Salihonya',  likes: 1  , author: 'Salih', }]

        expect(favoriteBlog(blogs)).toEqual({
            title: 'Salihonya',  likes: 1  , author: 'Salih', })
    })

    test ('of many blogs, blog with most likes is the favorite', () => {
        const blogs = [{ title: 'Salihonya',  likes: 1  , author: 'Salih', },
        { title: 'Salihonya2',  likes: 2  , author: 'Salih', },
        { title: 'Salihonya3',  likes: 3  , author: 'Salih', }]

        expect(favoriteBlog(blogs)).toEqual({ title: 'Salihonya3',  likes: 3  , author: 'Salih', })
    })

    test ('of empty array, no favorite', () => {
        expect(favoriteBlog([])).toEqual({})
    })

})