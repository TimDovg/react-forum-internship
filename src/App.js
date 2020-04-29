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

function App() {
    return (
        <>
            <PostState>
                <UsersState>
                    <PostsState>
                        <Navigation/>
                        <Switch>
                            <Route path="/create-post" component={CreatePost}/>
                            <Route path="/all-users" component={ShowAllUsers}/>
                            <Route path="/my-info" component={MyInfo}/>
                            <Route path="/posts/:postNumber" component={ShowPost}/>
                            <Route path="/posts" component={ShowAllPosts}/>
                            <Redirect to="/posts"/>
                        </Switch>
                    </PostsState>
                </UsersState>
            </PostState>
        </>
    );
}

export default App;
