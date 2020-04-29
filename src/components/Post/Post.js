import React from "react"

export const Post = ({post, author}) => {
    const body = `${post.body[0].toUpperCase()}${post.body.slice(1)}.`
    const title = post.title.toUpperCase()

    return (
        <div className="card bg-light rounded-0 border-0">
            <div className="card-body">
                <div className="d-flex justify-content-end">
                    <small className="font-italic">Пост {post.id}</small>
                </div>
                <h3 className="card-title text-center text-dark font-weight-bolder">{title}</h3>
                <p className="card-text"><strong>Автор</strong>: {author}</p>
                <p className="card-text" style={{'whiteSpace': 'pre-line'}}>
                    {body}
                </p>
            </div>
        </div>
    )
}
