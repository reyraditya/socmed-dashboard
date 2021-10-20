import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Users from '../../scenes/Users';

afterEach(() => {
  jest.clearAllMocks();
});

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

const store = mockStore({
    users: {
        users: [{
            id: 1,
            name: 'John Doe',
            username: 'John12',
            email: 'john@doe.com',
            website: 'johndoe.com',
            phone: '1-234-567'
        }],
    },
});

describe('testing Users scene', () => {
    it('should render correct data', () =>{
        render(
            <Provider store={store}>
                <Users />
            </Provider>,
        );
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@doe.com')).toBeInTheDocument();
        expect(screen.getByText('Username: John12')).toBeInTheDocument();
        expect(screen.getByText('Website: johndoe.com')).toBeInTheDocument();
    });

    it('should redirect to user posts page when button is clicked', () => {
        render(
            <Router history={history}>
                <Provider store={store}>
                    <Users />
                </Provider>
            </Router>
        );
        fireEvent.click(screen.getByText('View user posts'));
        expect(history.location.pathname).toBe('/user-posts/1');
    });

    it('should redirect to users media page when button is clicked', () => {
        render(
            <Router history={history}>
                <Provider store={store}>
                    <Users />
                </Provider>
            </Router>
        );
        fireEvent.click(screen.getByText('View user albums'));
        expect(history.location.pathname).toBe('/user-media/1');
    });
});
