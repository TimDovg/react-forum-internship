import React, {useContext, useState} from "react"
import {PostsContext} from "../../context/Posts/PostsContext"
import {AuthContext} from "../../context/Auth/AuthContext";
import {Loader} from "../../components/Loader/Loader";

const CreatePost = ({history}) => {
    const {state: authState} = useContext(AuthContext)

    if (!authState.token) history.push('/')

    const initialState = {
        created: false,
        valid: true,
        title: '',
        body: '',
        userId: authState.email
    }

    const [state, setState] = useState(initialState)
    const {addMyPost} = useContext(PostsContext)

    const submitHandler = () => {
        if (!state.title.trim() || !state.body.trim()) {
            return setState({...state, valid: false})
        }

        // good
        setState({...state, created: true, valid: true})

        const timeout = setTimeout(async () => {
            const response = await addMyPost({
                userId: state.userId.trim(),
                title: state.title.trim(),
                body: state.body.trim()
            })

            // checking
            console.log('STATUS: ', response.status)

            setState(initialState)
            window.clearTimeout(timeout)
        }, 1500)
    }

    const onTitleHandler = ({target: {value}}) => setState({...state, title: value})

    const onBodyHandler = ({target: {value}}) => setState({...state, body: value})

    return (
        <>
            <div className="m-4-5">
                <label htmlFor="forId">User ID<span className="text-danger">*</span></label>
                <input
                    className="form-control"
                    id="forId"
                    disabled
                    placeholder={state.userId}
                />
                <label className="mt-4" htmlFor="forTitle">Title<span className="text-danger">*</span></label>
                <input
                    value={state.title}
                    onChange={onTitleHandler}
                    className="form-control"
                    id="forTitle"
                    placeholder="Name"
                />
                <label className="mt-4" htmlFor="forBody">Body<span className="text-danger">*</span></label>
                <textarea
                    value={state.body}
                    onChange={onBodyHandler}
                    className="form-control"
                    id="forBody"
                    rows="3"
                />
                <div className="d-flex justify-content-end">
                    {!state.valid
                        ? <small className="text-danger mr-auto mt-2">Заполните все поля!</small>
                        : state.created
                            ? <small className="text-success mr-auto mt-2">Пост создан!</small>
                            : null
                    }
                    <button onClick={submitHandler} className="btn btn-dark mt-3 mb-2">СОЗДАТЬ</button>
                </div>
            </div>
            {state.created
                ? <Loader/>
                : null
            }
        </>
    )
}

export default CreatePost
