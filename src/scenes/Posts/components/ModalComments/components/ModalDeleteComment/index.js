import React from 'react';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button, Modal, ModalBody } from 'reactstrap';

import { deleteComments } from '../../../../../../actions/posts';

import styles from './styles.module.scss';

export default function ModalDeleteComment(props) {
    const { isOpen, onClose, selectedComment, onCloseParentModal } = props;
    const { id } = selectedComment;
    const dispatch = useDispatch();
    const alert = useAlert();

    const handleDeleteComment = () => {
        dispatch(deleteComments(id));
        onCloseParentModal();
        onClose();
        alert.success('Comment has been deleted');
    };


    return (
        <div>
            <Modal isOpen={isOpen} backdrop="static">
                <ModalBody>
                    <h3>Are you sure you want to delete this comment?</h3>
                    <div className={styles.buttonWrapper}>
                        <Button color="danger" style={{ marginRight: '30px' }} onClick={handleDeleteComment}>Delete</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};