import React from 'react';
import ShowAllPosts from './containers/ShowAllPosts/ShowAllPosts';
import Navigation from "./components/Navigation";
import {Switch, Route} from 'react-router-dom';
import ShowAllUsers from "./containers/ShowAllUsers/ShowAllUsers";
import MyInfo from "./containers/MyInfo/MyInfo";
import CreatePost from "./containers/CreatePost/CreatePost";

function App() {
    return (
        <>
            <Navigation />
            <Switch>
                <Route path="/create-post" component={CreatePost} />
                <Route path="/all-users" component={ShowAllUsers} />
                <Route path="/my-info" component={MyInfo} />
                <Route path="/" component={ShowAllPosts} />
            </Switch>
        </>
    );
}

export default App;
