/* eslint-disable testing-library/await-async-utils */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Posts from '../../scenes/Posts';

afterEach(() => {
    jest.clearAllMocks();
});
  
const mockStore = configureMockStore([thunk]);

const store = mockStore({
    posts: {
        userPosts: [{
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "lorem ipsum dolor sit amet",
        }],
        postComments: [{
            "postId": 1,
            "id": 1,
            "name": "id labore ex et quam laborum",
            "email": "Eliseo@gardner.biz",
            "body": "laudantium enim quasi est quidem magnam",
        }],
    },
});

describe('testing Post scene', () => {
    it('should render correct data', () => {
        render(
            <Provider store={store}>
                <Posts match={{params: {id: 1}}} />
            </Provider>
        );
        expect(screen.getByText('Sunt Aut Facere Repellat Provident Occaecati Excepturi Optio Reprehenderit')).toBeInTheDocument();
        expect(screen.getByText('lorem ipsum dolor sit amet')).toBeInTheDocument();
    });

    it('should open comment modal when button is clicked', () => {
        render(
            <Provider store={store}>
                <Posts match={{params: {id: 1}}} />
            </Provider>
        );
        fireEvent.click(screen.getByText('View comments'))
        expect(screen.getByText('1 Comment')).toBeInTheDocument();
        expect(screen.getByText('laudantium enim quasi est quidem magnam')).toBeInTheDocument();
    });

    it('should open add comment modal when button is clicked', () => {
        render(
            <Provider store={store}>
                <Posts match={{params: {id: 1}}} />
            </Provider>
        );
        fireEvent.click(screen.getByText('Add comment'));
        waitFor(() => expect(screen.getByText('Write your comments')).toBeInTheDocument());
    });

    it('should open delete post modal when button is clicked', () => {
        render(
            <Provider store={store}>
                <Posts match={{params: {id: 1}}} />
            </Provider>
        );
        fireEvent.click(screen.getByText('Delete'));
        waitFor(() => expect(screen.getByText('Are you sure you want to delete this post?')).toBeInTheDocument());
    });

    it('should open edit post modal when button is clicked', () => {
        render(
            <Provider store={store}>
                <Posts match={{params: {id: 1}}} />
            </Provider>
        );
        fireEvent.click(screen.getByText('Edit'));
        waitFor(() => expect(screen.getByText('Edit Post')).toBeInTheDocument());
    });

    it('should open create post post modal when button is clicked', () => {
        render(
            <Provider store={store}>
                <Posts match={{params: {id: 1}}} />
            </Provider>
        );
        fireEvent.click(screen.getByText('Create new post'));
        waitFor(() => expect(screen.getByText('Write your post:')).toBeInTheDocument());
    });
});

