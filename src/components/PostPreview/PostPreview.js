import React, {useContext} from "react"
import {UsersContext} from "../../context/Users/UsersContext";
import {Link, withRouter} from "react-router-dom";

const PostPreview = ({post, match}) => {
    const body = `${post.body.split(' ').slice(0, 10).join(' ')}...`
    const {state} = useContext(UsersContext)
    // доступ к объекту с [ID]: username
    const userName = state.UserIdUserName[post.userId]

    return (
        <>
            <div className="col-sm-3 mb-4">
                <div className="card bg-dark text-white">
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{post.title.toUpperCase()}</h5>
                        <p className="card-text">{body}</p>
                        <p className="font-italic text-secondary">Автор: {userName}</p>
                        <Link to={`${match.url}/${post.id}`} className="btn btn-primary ml-5 mr-5">ПЕРЕЙТИ</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(PostPreview)