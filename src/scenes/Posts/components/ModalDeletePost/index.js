import React from 'react';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button, Modal, ModalBody } from 'reactstrap';

import { deleteUserPosts, fetchUserPosts } from '../../../../actions/posts';

import styles from './styles.module.scss';

export default function ModalDeletePost(props) {
    const { isOpen, onClose, selectedPost, userid } = props;
    const { id } = selectedPost;
    const dispatch = useDispatch();
    const alert = useAlert();

    const handleDeletePost = () => {
        dispatch(deleteUserPosts(id));
        onClose();
        alert.success('Post has been deleted');
        dispatch(fetchUserPosts(userid));
    }

    return (
        <div>
            <Modal isOpen={isOpen} backdrop="static">
                <ModalBody>
                    <h3>Are you sure you want to delete this post?</h3>
                    <div className={styles.buttonWrapper}>
                        <Button color="danger" style={{ marginRight: '30px' }} onClick={handleDeletePost}>Delete</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};
