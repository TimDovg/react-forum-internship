import React, {useContext, useEffect} from "react"
import {PostsContext} from "../../context/Posts/PostsContext"
import {Loader} from "../../components/Loader/Loader"
import PostPreview from "../../components/PostPreview/PostPreview";
import {UsersContext} from "../../context/Users/UsersContext";

const ShowAllPosts = () => {
    const {state: statePosts, getPosts} = useContext(PostsContext)
    const posts = statePosts.posts
    const {state: stateUsers, getUsers} = useContext(UsersContext)

    useEffect(() => {
        getPosts()
        getUsers()
        // зацикливается
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <h1>ShowAllPosts</h1>
            {statePosts.loading || stateUsers.loading
                ? <Loader/>
                :
                <div className="row pr-1 pl-35 w-100">
                    {posts.map((post, index) => <PostPreview
                        key={index}
                        post={post}
                    />)}
                </div>
            }
        </>
    )
}

export default ShowAllPosts