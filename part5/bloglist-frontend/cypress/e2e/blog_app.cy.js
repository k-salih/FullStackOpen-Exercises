describe('Blog app', function() {
    beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Test User',
        username: 'testuser',
        password: 'testpassword'
        }
        
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.get('.login-form').contains('username')
        cy.get('.login-form').contains('password')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('testuser')
            cy.get('#password').type('testpassword')
            cy.get('.login-button').click()
            cy.contains('Test User logged in')
        })
        it('fails with wrong credentials', function() {
            cy.get('#username').type('testuser')
            cy.get('#password').type('wrongpassword')
            cy.get('.login-button').click()
            cy.contains('invalid username or password')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'testuser', password: 'testpassword' })
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('A blog created by test')
            cy.get('#author').type('Test User')
            cy.get('#url').type('http://test.com')
            cy.get('#create').click()
            cy.contains('A blog created by test')
        })

        describe('If a blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'A blog created by test',
                    author: 'Test User',
                    url: 'http://test.com'
                })
            })

            it('user can like a blog', function () {
                cy.contains('view').click()
                cy.contains('like').click()
                cy.contains('likes 1')
            })

            it('user who created a blog can delete it', function () {
                cy.contains('view').click()
                cy.contains('remove').click()
                cy.get('html').should('not.contain', 'A blog created by test')
            })

            it('A user who is not the author of a blog cannot delete it', function() {
                cy.contains('logout').click()
                const user = {
                    name: 'Test User 2',
                    username: 'testuser2',
                    password: 'testpassword2'
                    }
                cy.request('POST', 'http://localhost:3003/api/users/', user)
                cy.login({ username: 'testuser2', password: 'testpassword2' })
                cy.contains('view').click()
                cy.contains('remove').click()
                cy.get('html').should('contain', 'A blog created by test')
            })
        })
    })
})