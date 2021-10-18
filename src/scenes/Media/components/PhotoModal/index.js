import React, { useState } from 'react';
import { Card, CardImg, Modal, ModalBody, ModalHeader } from 'reactstrap';

import styles from './styles.module.scss';

export default function PhotosModal(props) {
    const { isOpen, onClose, photosContent } = props;
    const [isDetailPhotoModalOpen, setDetailPhotoModal] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState({});
    
    const handleOpenDetailPhotoModal = (details) => {
        setSelectedPhoto(details)
        setDetailPhotoModal(true);
    };

    const handleCloseDetailPhotoModal = () => {
        setDetailPhotoModal(false);
    };

    const renderPhotos = photosContent && photosContent.map((photo, idx) => (
        <Card key={idx} className={styles.photoCardWrapper}>
            <button onClick={() => handleOpenDetailPhotoModal(photo)} style={{ background: 'none', border: 'none', color: 'transparent', padding: '0' }}>
                <CardImg src={photo.thumbnailUrl} alt="thumbnail photo" />
            </button>
        </Card>
    ));

    return (
        <div>
            <Modal isOpen={isOpen} toggle={onClose} size="lg">
                <ModalHeader toggle={onClose}>Photos</ModalHeader>
                <ModalBody>
                    <div className={styles.photoWrapper}>
                        {renderPhotos}
                    </div>
                </ModalBody>
            </Modal>
            <Modal isOpen={isDetailPhotoModalOpen} toggle={handleCloseDetailPhotoModal} size="lg">
                <ModalHeader toggle={() => handleCloseDetailPhotoModal()} />
                <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                    <img src={selectedPhoto.url} alt="detail img modal" />
                    <p style={{ textAlign: 'center' }}>{selectedPhoto.title}</p>
                </ModalBody>
            </Modal>
        </div>
    );
};
