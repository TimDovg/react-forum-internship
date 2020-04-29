import React from "react"

export const Comments = ({comment}) => {
    const name = comment.name.toUpperCase()
    const body = `${comment.body[0].toUpperCase() + comment.body.slice(1)}.`

    return (
        <div className="ml-4 mt-4 rounded bg-dark w-50 text-white">
            <div className="p-3 bg-primary">{name}</div>
            <div className="p-3">Пользователь: {comment.email}</div>
            <div className="p-3">{body}</div>
        </div>
    )
}
