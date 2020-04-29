import React from 'react';
import ShowAllPosts from './containers/ShowAllPosts/ShowAllPosts';
import Navigation from "./components/Navigation/Navigation";
import {Switch, Route, Redirect} from 'react-router-dom';
import ShowAllUsers from "./containers/ShowAllUsers/ShowAllUsers";
import MyInfo from "./containers/MyInfo/MyInfo";
import CreatePost from "./containers/CreatePost/CreatePost";
import {PostsState} from "./context/Posts/PostsState";
import {UsersState} from "./context/Users/UsersState";

function App() {
    return (
        <>
            <UsersState>
                <PostsState>
                    <Navigation/>
                    <Switch>
                        <Route path="/create-post" component={CreatePost}/>
                        <Route path="/all-users" component={ShowAllUsers}/>
                        <Route path="/my-info" component={MyInfo}/>
                        <Route path="/posts" component={ShowAllPosts}/>
                        <Redirect to="/posts"/>
                    </Switch>
                </PostsState>
            </UsersState>
        </>
    );
}

export default App;
