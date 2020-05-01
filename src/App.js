import React from 'react';
import ShowAllPosts from './containers/ShowAllPosts/ShowAllPosts';
import Navigation from "./components/Navigation/Navigation";
import {Switch, Route, Redirect} from 'react-router-dom';
import ShowAllUsers from "./containers/ShowAllUsers/ShowAllUsers";
import MyInfo from "./containers/MyInfo/MyInfo";
import CreatePost from "./containers/CreatePost/CreatePost";
import {PostsState} from "./context/Posts/PostsState";
import {UsersState} from "./context/Users/UsersState";
import {ShowPost} from "./containers/ShowPost/ShowPost";
import {PostState} from "./context/Post/PostState";
import {AuthState} from "./context/Auth/AuthState";
import {Albums} from "./containers/Albums/Albums";
import EditUser from "./components/EditUser/EditUser";
import Album from "./components/Album/Album";

function App() {
    return (
        <>
            <AuthState>
                <PostState>
                    <UsersState>
                        <PostsState>
                            <Navigation/>
                            <Switch>
                                <Route path="/create-post" component={CreatePost}/>
                                <Route path="/albums/:albumNumber" component={Album}/>
                                <Route path="/albums" component={Albums}/>
                                <Route path="/all-users/:userId" component={EditUser}/>
                                <Route path="/all-users" component={ShowAllUsers}/>
                                <Route path="/my-info" component={MyInfo}/>
                                <Route path="/posts/:postNumber" component={ShowPost}/>
                                <Route path="/posts" component={ShowAllPosts}/>
                                <Redirect to="/posts"/>
                            </Switch>
                        </PostsState>
                    </UsersState>
                </PostState>
            </AuthState>
        </>
    );
}

export default App;
