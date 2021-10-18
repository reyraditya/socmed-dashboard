import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { 
    Button, 
    Card, 
    CardTitle, 
    CardBody,
} from 'reactstrap';

import { capitalize } from '../../helper/string';
import { fetchUserPosts, fetchComments, } from '../../actions/posts';

import styles from './styles.module.scss';

import Layout from '../../components/Layout/Layout';
import ModalComments from './components/ModalComments';
import ModalAddComment from './components/ModalAddComment';
import ModalDeletePost from './components/ModalDeletePost';
import ModalSubmitPost from './components/ModalSubmitPost';
import ModalEditPost from './components/ModalEditPost';

export default function Posts(props) {
    const { id } = props.match.params;
    const { userPosts, postComments } = useSelector(state => state.posts);
    const dispatch = useDispatch();

    const [isCommentModalOpen, setCommentModal] = useState(false);
    const [isSubmitPostModalOpen, setSubmitPostModal] = useState(false);
    const [isAddCommentModalOpen, setAddCommentModal] = useState(false);
    const [isDeletePostModalOpen, setDeletePostModal] = useState(false);
    const [isEditPostModalOpen, setEditPostModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});

    const uname = localStorage.getItem('username');

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    useEffect(() => {
        dispatch(fetchUserPosts(id));
    }, [dispatch, id]);

    const handleOpenCommentsModal = (postid) => {
        dispatch(fetchComments(postid));
        setCommentModal(true);
    };
    const handleCloseCommentsModal = () => {
        setCommentModal(false);
    };

    const handleOpenAddCommentModal = (post) => {
        setSelectedPost(post)
        setAddCommentModal(true);
    };
    const handleCloseAddCommentModal = () => {
        setAddCommentModal(false);
    };

    const handleOpenDeletePostModal = (post) => {
        setSelectedPost(post)
        setDeletePostModal(true);
    };
    const handleCloseDeletePostModal = () => {
        setDeletePostModal(false);
    };

    const handleOpenSubmitPostModal = () => {
        setSubmitPostModal(true);
    };
    const handleCloseSubmitPostModal = () => {
        setSubmitPostModal(false);
    };

    const handleOpenEditPostModal = (post) => {
        setSelectedPost(post)
        setEditPostModal(true);
    };
    const handleCloseEditPostModal = () => {
        setEditPostModal(false);
    };

    const renderPosts = userPosts && userPosts.map((item, idx) => (
        <Card className={styles.postCardWrapper} key={idx}>
            <div className={styles.flex}>
                <CardTitle className={styles.cardTitleWrapper}><h5>{capitalize(item.title)}</h5></CardTitle>
                <div className={cx(styles.flex, styles.buttonWrapper)}>
                    <button className={cx(styles.customButton, styles.addCommentButton)} onClick={() => handleOpenAddCommentModal(item)}>Add comment</button>
                    <button className={cx(styles.customButton, styles.editButton)} onClick={() => handleOpenEditPostModal(item)}>Edit</button>
                    <button className={cx(styles.customButton, styles.deleteButton)} onClick={() => handleOpenDeletePostModal(item)}>Delete</button>
                </div>
            </div>
            <CardBody className={styles.postCardBody}>{item.body}</CardBody>
            <div className={styles.buttonComments}>
                <Button color="primary" onClick={() => handleOpenCommentsModal(item.id)}>View comments</Button>
            </div>
        </Card>
    ));

    return (
        <Layout>
            <div>
                <div className={styles.flex}>
                    <h2>Posts of {uname}</h2>
                    <button className={cx(styles.customButton, styles.addPostButton)} onClick={handleOpenSubmitPostModal}>Create new post</button>
                </div>
                {renderPosts}
            </div>
            <ModalComments isOpen={isCommentModalOpen} onClose={handleCloseCommentsModal} comments={postComments} />
            <ModalAddComment isOpen={isAddCommentModalOpen} onClose={handleCloseAddCommentModal} selectedPost={selectedPost} userid={id} />
            <ModalDeletePost isOpen={isDeletePostModalOpen} onClose={handleCloseDeletePostModal} selectedPost={selectedPost} userid={id} />
            <ModalSubmitPost isOpen={isSubmitPostModalOpen} onClose={handleCloseSubmitPostModal} userid={id} />
            <ModalEditPost isOpen={isEditPostModalOpen} onClose={handleCloseEditPostModal} selectedPost={selectedPost} userid={id} />
        </Layout>
    );
};
