/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, } from 'reactstrap';
import { useAlert } from 'react-alert';

import { editPost, fetchUserPosts } from '../../../../actions/posts';

export default function ModalEditPosts(props) {
    const { isOpen, onClose, selectedPost, userid } = props;
    const dispatch = useDispatch();
    const alert = useAlert();

    const [post, setPost] = useState({
        title: '',
        body: '',
    });

    useEffect(() => {
        if (typeof selectedPost !== 'undefined') {
            setPost({
                ...post,
                title: selectedPost.title,
                body: selectedPost.body,
            })
        };
    }, [selectedPost])

    const handleChangeTitle = (val) => {
        setPost({
            ...post,
            title: val,
        })
    };

    const handleChangePostBody = (val) => {
        setPost({
            ...post,
            body: val,
        })
    };

    const handleSubmitEditPost = () => {
        const payload = {
            title: post.title,
            body: post.body,
        };

        if (post.title === '' || post.body === '') {
            onClose();
            alert.error('Please fill the form correctly');
        } else {
            dispatch(editPost(selectedPost.id, payload));
            alert.success('Your post has been successfully edited');
            setPost({
                ...post,
                title: '',
                body: '',
            });
            onClose();
            dispatch(fetchUserPosts(userid));
        };
    }

    return (
        <>
          <Modal isOpen={isOpen} toggle={onClose}>
            <ModalHeader toggle={onClose}>Edit Post</ModalHeader>
            <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="postTitle">Title</Label>
                            <Input type="text" name="text" id="postTitle" onChange={(e) => handleChangeTitle(e.target.value)} value={post.title} />
                        </FormGroup>
                        <FormGroup>
                        <Label for="bodyPost">Write your post:</Label>
                        <Input type="textarea" name="text" id="bodyPost" onChange={(e) => handleChangePostBody(e.target.value)} value={post.body} />
                        </FormGroup>
                    </Form>
                    <Button color="primary" onClick={handleSubmitEditPost} style={{ marginTop: '10px' }}>Submit post</Button>
                </ModalBody>
          </Modal>   
        </>
    );
};
