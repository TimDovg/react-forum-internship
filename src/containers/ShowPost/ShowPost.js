import React, {useContext, useEffect, useState} from "react"
import {Loader} from "../../components/Loader/Loader"
import {Post} from "../../components/Post/Post"
import {Comments} from "../../components/Comments/Comments"
import {PostContext} from "../../context/Post/PostContext"
import {UsersContext} from "../../context/Users/UsersContext"
import {CommentForm} from "../../components/CommentForm/CommentForm"

export const ShowPost = ({match}) => {
    const postNumber = match.params.postNumber
    const {state: statePost, getPostById, addMyComment} = useContext(PostContext)
    const {state: {UserIdUserName}, getUsers} = useContext(UsersContext)
    const post = statePost.post

    // для написания коммента
    const myComment = {
        typeComment: false,
        invalid: false,
        postId: postNumber,
        id: statePost.comments.length + 1,
        name: '',
        email: '',
        body: ''
    }

    const [internalState, setValue] = useState(myComment)

    const typeCommentHandler = () => setValue({...internalState, typeComment: true})

    // для практики деструкторизации
    const nameHandler = ({target: {value}}) => setValue({...internalState, name: value})

    const emailHandler = ({target: {value}}) => setValue({...internalState, email: value})

    const bodyHandler = ({target: {value}}) => setValue({...internalState, body: value})

    const submitHandler = () => {
        if (!internalState.name.trim() || !internalState.email.trim() || !internalState.body.trim()) {
            return setValue({...internalState, invalid: true})
        }

        // сброс
        addMyComment({
            postId: internalState.postId,
            id: internalState.id,
            name: internalState.name.trim(),
            email: internalState.email.trim(),
            body: internalState.body.trim()
        })
        setValue(myComment)
    }

    useEffect(() => {
        getUsers()
        getPostById(postNumber)
        // eslint-disable-next-line
    }, [])

    return (
        <div className="mb-4 bg-light" style={{'minHeight': '100vh'}}>
            {statePost.loading
                ? <Loader/>
                :
                <>
                    <Post post={post} author={UserIdUserName[post.userId]}/>
                    <h4 className="ml-4 mt-4">Комментарии ({statePost.comments && statePost.comments.length})</h4>
                    <CommentForm
                        internalState={internalState}
                        typeCommentHandler={typeCommentHandler}
                        nameHandler={nameHandler}
                        emailHandler={emailHandler}
                        bodyHandler={bodyHandler}
                        submitHandler={submitHandler}
                    />
                    {statePost.commentsLoading
                        ? <Loader/>
                        :
                        <>
                            {statePost.comments.map((comment, index) => (
                                <Comments
                                    key={index}
                                    comment={comment}
                                />
                            ))}
                        </>
                    }
                </>
            }
        </div>
    )
}
