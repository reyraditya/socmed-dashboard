import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Media from '../../scenes/Media';

afterEach(() => {
  jest.clearAllMocks();
});

const mockStore = configureMockStore([thunk]);

const store = mockStore({
    media: {
        albums: [{
            id: 1,
            userId: 1,
            title: 'lorem ipsum dolor'
        }],
        photos: [{
            albumId: 1,
            id: 1,
            thumbnailUrl: 'https://test.com/',
            url: 'https://test.com/123',
            title: 'sit amet'
        }],
    },
});

describe('testing Media scene', () => {
    it('should render correct data', () => {
        render(
            <Provider store={store}>
                <Media match={{params: {id: 1}}} />
            </Provider>
        );
        expect(screen.getByText('lorem ipsum dolor')).toBeInTheDocument();
    });

    it('should open photos modal when view photos is clicked', () => {
        render(
            <Provider store={store}>
                <Media match={{params: {id: 1}}} />
            </Provider>
        );
        fireEvent.click(screen.getByText('View photos'));
        expect(screen.getByText('Photos')).toBeInTheDocument();
    });
});
