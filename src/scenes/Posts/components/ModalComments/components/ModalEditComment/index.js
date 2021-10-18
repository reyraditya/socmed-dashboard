/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, } from 'reactstrap';
import { useAlert } from 'react-alert';

import { editComments, fetchComments } from '../../../../../../actions/posts';


export default function ModalEditComment(props) {
    const { isOpen, onClose, selectedComment, onCloseParentModal, } = props;
    const dispatch = useDispatch();
    const alert = useAlert();

    const [commentForm, setcommentForm] = useState({
        body: '',
    });

    useEffect(() => {
        if (typeof selectedComment !== 'undefined') {
            setcommentForm({
                ...commentForm,
                body: selectedComment.body,
            })
        };
    }, [selectedComment]);

    const handleChangeCommentBody = (val) => {
        setcommentForm({
            ...commentForm,
            body: val,
        });
    };

    const handleSubmitEditComment = () => {
        const payload = {
            body: commentForm.body,
        };

        if (commentForm.body === '') {
            onClose();
            alert.error('Please fill the form correctly');
        } else {
            dispatch(editComments(selectedComment.id, payload));
            alert.success('Your comment has been successfully edited');
            setcommentForm({
                ...commentForm,
                body: '',
            });
            onClose();
            onCloseParentModal();
            dispatch(fetchComments(selectedComment.postId));
        };
    }

    return (
        <>
          <Modal isOpen={isOpen} toggle={onClose}>
            <ModalHeader toggle={onClose}>Edit Comment</ModalHeader>
            <ModalBody>
                <b>From: {selectedComment.email}</b>
                <Form style={{ marginTop: '15px' }}>
                    <FormGroup>
                    <Label for="bodyPost">Edit comment:</Label>
                    <Input type="textarea" name="text" id="bodyPost" onChange={(e) => handleChangeCommentBody(e.target.value)} value={commentForm.body} style={{ height: '200px' }} />
                    </FormGroup>
                </Form>
                <Button color="primary" onClick={handleSubmitEditComment} style={{ marginTop: '10px' }}>Submit post</Button>
            </ModalBody>
          </Modal>   
        </>
    );
};
