import React, { useState } from 'react';
import cx from 'classnames';
import { 
    Card,  
    CardBody, 
    Modal, 
    ModalHeader, 
    ModalBody, 
} from 'reactstrap';

import styles from './styles.module.scss';
import ModalDeleteComment from './components/ModalDeleteComment';
import ModalEditComment from './components/ModalEditComment';

export default function ModalComments(props) {
    const { isOpen, onClose, comments } = props;
    const commentAmount = comments && comments.length;

    const [isModalDeleteCommentOpen, setModalDeleteComment] = useState(false);
    const [isModalEditCommentOpen, setModalEditComment] = useState(false);
    const [selectedComment, setSelectedComment] = useState({});

    const handleOpenModalDeleteComment = (comment) => {
        setSelectedComment(comment);
        setModalDeleteComment(true);
    };
    const handleCloseModalDeleteComment = () => {
        setModalDeleteComment(false);
    };

    const handleOpenModalEditComment = (comment) => {
        setSelectedComment(comment);
        setModalEditComment(true);
    };
    const handleCloseModalEditComment = () => {
        setModalEditComment(false);
    };

    const commentsContent = comments && comments.map((comment, idx) => (
        <div className={styles.contentWrapper} key={idx}>
            <Card className={styles.cardWrapper}>
                <CardBody>
                    <b>From: {comment.email}</b>
                    <p>{comment.body}</p>
                    <div style={{ display: 'flex' }}>
                        <button className={cx(styles.customButton, styles.editButton)} onClick={() => handleOpenModalEditComment(comment)} >Edit</button>
                        <button onClick={() => handleOpenModalDeleteComment(comment)} className={cx(styles.customButton, styles.deleteButton)} >Delete</button>
                    </div>
                </CardBody>
            </Card>
        </div>
    ))

    return (
        <div>
            <Modal isOpen={isOpen} toggle={onClose} >
                <ModalHeader toggle={onClose}>{commentAmount} {commentAmount > 1 ? 'Comments' : 'Comment'}</ModalHeader>
                <ModalBody>{commentsContent}</ModalBody>
            </Modal>
            <ModalDeleteComment isOpen={isModalDeleteCommentOpen} onClose={handleCloseModalDeleteComment} onCloseParentModal={onClose} selectedComment={selectedComment} />
            <ModalEditComment isOpen={isModalEditCommentOpen} onClose={handleCloseModalEditComment} onCloseParentModal={onClose} selectedComment={selectedComment} />
        </div>
    )
}
