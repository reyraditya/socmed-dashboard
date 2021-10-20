/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbum, fetchPhotos } from '../../actions/media';
import { 
    Button,
    Card,
    CardImg,
    CardBody,
    CardTitle,
} from 'reactstrap';

import styles from './styles.module.scss';

import Account from '../../assets/album-cover.png';
import Layout from '../../components/Layout/Layout';
import PhotoModal from './components/PhotoModal';

export default function Media(props) {
    const { match } = props;
    const { albums, photos } = useSelector(state => state.media);
    const [isPhotosModalOpen, setPhotoModal] = useState(false);
    const dispatch = useDispatch();
    const uname = localStorage.getItem('username');

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    useEffect(() => {
        dispatch(fetchAlbum(match.params.id))
    }, [dispatch]);

    const handleOpenPhotoModal = (albumId) => {
        dispatch(fetchPhotos(albumId));
        setPhotoModal(true);
    };

    const handleClosePhotoModal = () => {
        setPhotoModal(false);
    };

    const renderAlbums = albums && albums.map((album, idx) => (
        <Card key={idx} className={styles.albumCardWrapper}>
            <CardImg top src={Account} alt="album cover icon" />
            <CardBody>
                <CardTitle className={styles.title}>{album.title}</CardTitle>
                <div className={styles.title}>
                    <Button color="info" onClick={() => handleOpenPhotoModal(album.id)}>View photos</Button>
                </div>
            </CardBody>
        </Card>
    ));

    return (
        <Layout>
            <div>
                <h2>Albums of {uname}</h2>
                <div>
                    <div className={styles.albumWrapper}>
                        {renderAlbums}
                    </div>
                </div>
            </div>
            <PhotoModal isOpen={isPhotosModalOpen} onClose={handleClosePhotoModal} photosContent={photos} />
        </Layout>
    );
};
