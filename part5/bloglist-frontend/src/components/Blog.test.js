import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('renders title and author but does not render url and likes by default', () => {
    const blog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'Test url',
        likes: 0
    }

    const component = render(
        <Blog blog={blog} />
    )

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
        'Test blog'
    )

    expect(div).toHaveTextContent(
        'Test author'
    )

    expect(div).not.toHaveTextContent(
        'Test url'
    )

    expect(div).not.toHaveTextContent(
        '0'
    )
})


test('renders url and likes when the button controlling the shown details has been clicked', () => {
    const blog = {
        title: 'Test blog',
        author: 'Test author',
        url: 'Test url',
        likes: 0
    }

    const component = render(
        <Blog blog={blog} />
    )

    const button = component.getByText('view')
    button.click()

    const div = component.container.querySelector('.blogView')
    expect(div).toHaveTextContent(
        'Test url'
    )

    expect(div).toHaveTextContent(
        '0'
    )
})


