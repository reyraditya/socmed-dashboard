import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, } from 'reactstrap';
import { useAlert } from 'react-alert';

import { fetchUserPosts, submitComment } from '../../../../actions/posts';

export default function ModalAddComment(props) {
    const {isOpen, onClose, selectedPost, userid } = props;
    const { id } = selectedPost;
    const dispatch = useDispatch();
    const alert = useAlert();
    
    const [comment, setComment] = useState({
        email: '',
        body: '',
    });

    const handleChangeEmail = (val) => {
        setComment({
            ...comment,
            email: val,
        });
    };

    const handleChangeCommentBody = (val) => {
        setComment({
            ...comment,
            body: val,
        });
    };

    const handleSubmitComment = () => {
        const payload = {
            email: comment.email,
            body: comment.body,
        };

        if (comment.email === '' || comment.body === '') {
            onClose();
            alert.error('Please fill the form correctly');
        } else {
            dispatch(submitComment(id, payload));
            alert.success('Your comment has been added');
            setComment({
                ...comment,
                email: '',
                body: '',
            });
            onClose();
            dispatch(fetchUserPosts(userid));
        };
    };

    return (
        <>
            <Modal isOpen={isOpen} toggle={onClose}>
                <ModalHeader toggle={onClose}>Add comment</ModalHeader>
                <ModalBody>
                    <Form>
                      <FormGroup>
                         <Label for="senderEmail">Email</Label>
                         <Input type="email" name="email" id="senderEmail" onChange={(e) => handleChangeEmail(e.target.value)} value={comment.email !== '' ? comment.email : ''} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="commentText">Write your comments:</Label>
                        <Input type="textarea" name="text" id="commentText" onChange={(e) => handleChangeCommentBody(e.target.value)} />
                      </FormGroup>
                    </Form>
                    <Button color="primary" onClick={handleSubmitComment} style={{ marginTop: '10px' }}>Submit</Button>
                </ModalBody>
            </Modal>
        </>
    );
};
