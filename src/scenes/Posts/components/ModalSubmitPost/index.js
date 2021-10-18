import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, } from 'reactstrap';
import { useAlert } from 'react-alert';

import { fetchUserPosts, submitPost } from '../../../../actions/posts';

export default function ModalSubmitPost(props) {
    const { isOpen, onClose, userid } = props;
    const dispatch = useDispatch();
    const alert = useAlert();

    const [post, setPost] = useState({
        title: '',
        body: '',
    });

    const handleChangeTitle = (val) => {
        setPost({
            ...post,
            title: val,
        });
    };

    const handleChangePostBody = (val) => {
        setPost({
            ...post,
            body: val,
        });
    };

    const handleSubmitPost = () => {
        const payload = {
            title: post.title,
            body: post.body,
            userId: userid,
        };

        if (post.title === '' || post.body === '') {
            onClose();
            alert.error('Please fill the form correctly');
        } else {
            dispatch(submitPost(payload));
            alert.success('Your post has been added');
            setPost({
                ...post,
                title: '',
                body: '',
            });
            onClose();
            dispatch(fetchUserPosts(userid));
        };
    };

    return (
        <>
            <Modal isOpen={isOpen} toggle={onClose}>
                <ModalHeader toggle={onClose}>Create New Post</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="postTitle">Title</Label>
                            <Input type="text" name="text" id="postTitle" onChange={(e) => handleChangeTitle(e.target.value)} value={post.title !== '' ? post.title : ''} />
                        </FormGroup>
                        <FormGroup>
                        <Label for="bodyPost">Write your post:</Label>
                        <Input type="textarea" name="text" id="bodyPost" onChange={(e) => handleChangePostBody(e.target.value)} value={post.body !== '' ? post.body : ''} />
                        </FormGroup>
                    </Form>
                    <Button color="primary" onClick={handleSubmitPost} style={{ marginTop: '10px' }}>Submit post</Button>
                </ModalBody>
            </Modal>
        </>
    );
};
