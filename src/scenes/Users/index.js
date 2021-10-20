import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchUsersList } from '../../actions/users';

import styles from './styles.module.scss';
import Layout from '../../components/Layout/Layout';
import { 
    Button, 
    Card, 
    CardBody, 
    CardTitle 
} from 'reactstrap';

export default function Users() {
    const { users } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchUsersList())
      }, [dispatch]
    );

    const setUserIdentification = (uname) => {
        localStorage.setItem('username', uname);
    };

    const handleRedirectUserPosts = (id, uname) => {
        setUserIdentification(uname);
        history.push(`/user-posts/${id}`);
    };

    const handleRedirectUserAlbums = (id, uname) => {
        setUserIdentification(uname);
        history.push(`/user-media/${id}`);
    };

    const content = users && users.map((user, idx) => (
        <Card key={idx} className={styles.cardWrapper}>
            <CardBody>
                <CardTitle className={styles.cardTitle}>
                    <h5>{user.name}</h5>
                    <span>{user.email}</span>
                </CardTitle>
                <CardBody style={{ padding: '0 0 10px 0' }}>
                    <div className={styles.cardText}>
                        <span>Username: {user.username}</span>
                        <span>Website: {user.website}</span>
                    </div>
                </CardBody>
                <div>
                    <Button 
                        color='success' 
                        onClick={() => handleRedirectUserPosts(user.id, user.username)}
                        style={{ marginRight: '10px' }}
                    >
                        View user posts
                    </Button>
                    <Button 
                        color='primary' 
                        onClick={() => handleRedirectUserAlbums(user.id, user.username)}
                    >
                        View user albums
                    </Button>
                </div>
            </CardBody>
        </Card>
      )
    );

    return (
        <Layout>
            <div>
                <h2>List of Users</h2>
                {content}
            </div>
        </Layout>
    );
};
