import React from 'react';
import { Switch, BrowserRouter, Route, Redirect, } from 'react-router-dom';

import Users from './scenes/Users';
import Posts from './scenes/Posts';
import Media from './scenes/Media';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/users' component={Users} />
                <Route path='/user-posts/:id' component={Posts} />
                <Route path='/user-media/:id' component={Media} />
                <Redirect to='/users' />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;