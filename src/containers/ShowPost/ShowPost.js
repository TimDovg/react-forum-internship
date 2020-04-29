import React, {useContext, useEffect} from "react"
import {Loader} from "../../components/Loader/Loader"
import {Post} from "../../components/Post/Post"
import {Comments} from "../../components/Comments/Comments"
import {PostContext} from "../../context/Post/PostContext"
import {UsersContext} from "../../context/Users/UsersContext";

export const ShowPost = ({match}) => {
    const postNumber = match.params.postNumber
    const {state: statePost, getPostById} = useContext(PostContext)
    const {state: {UserIdUserName}, getUsers} = useContext(UsersContext)
    const post = statePost.post

    useEffect(() => {
        getUsers()
        getPostById(postNumber)
        // eslint-disable-next-line
    }, [])

    return (
        <div className="mb-4 bg-light" style={{'min-height': '100vh'}}>
            {statePost.loading
                ? <Loader/>
                :
                <>
                    <Post post={post} author={UserIdUserName[post.userId]}/>
                    {statePost.commentsLoading
                        ? <Loader/>
                        :
                        <>
                            <h4 className="ml-4 mt-4">Комментарии ({statePost.comments.length})</h4>
                            {statePost.comments.map(comment => (
                                <Comments comment={comment}/>
                            ))}
                        </>
                    }
                </>
            }
        </div>
    )
}
