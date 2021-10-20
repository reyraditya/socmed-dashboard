/* eslint-disable testing-library/await-async-utils */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import PhotoModal from './index';

afterEach(() => {
    jest.clearAllMocks();
  });
  

describe('testing Photo Modal component', () => {
    const photos = [{
        albumId: 1,
        id: 1,
        thumbnailUrl: 'https://test.com/',
        url: 'https://test.com/123',
        title: 'sit amet'
    }];

    it('should close modal if button is clicked', () => {
        render(
            <PhotoModal isOpen={true} photosContent={photos} />
        );
        fireEvent.click(screen.getByTestId('button-open-detail-photo'));
        expect(screen.getByAltText('detail img modal')).toBeInTheDocument();
        fireEvent.click(screen.getAllByRole('button')[1]);
        waitFor(() => expect(screen.queryByAltText('detail img modal')).not.toBeInTheDocument());

        fireEvent.click(screen.getAllByRole('button')[0]);
        waitFor(() => expect(screen.queryByText('Photos')).not.toBeInTheDocument());
    });
});
