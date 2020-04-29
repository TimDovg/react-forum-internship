import React from "react"

export const CommentForm = ({internalState, typeCommentHandler, nameHandler, emailHandler, bodyHandler, submitHandler}) => (
    <>
        {!internalState.typeComment
            ? <button onClick={typeCommentHandler} className="btn btn-dark mt-3 ml-4 mb-2">НАПИСАТЬ ОТЗЫВ</button>
            : <div className="ml-4 w-25">
                <label className="mt-2" htmlFor="forName">Name<span className="text-danger">*</span></label>
                <input onChange={nameHandler} value={internalState.name} className="form-control" id="forName"
                       placeholder="Name"/>
                <label className="mt-4" htmlFor="forEmail">Email<span className="text-danger">*</span></label>
                <input onChange={emailHandler} value={internalState.email} type="email" className="form-control"
                       id="forEmail"
                       placeholder="email@gmail.com"/>
                <label className="mt-4" htmlFor="forBody">Body<span className="text-danger">*</span></label>
                <textarea onChange={bodyHandler} value={internalState.body} className="form-control" id="forBody"
                          rows="3"/>
                <div className="d-flex justify-content-end">
                    {internalState.invalid ?
                        <small className="m-2 text-danger mr-auto">Заполните все поля!</small> : null}
                    <button onClick={submitHandler} className="btn btn-dark mt-3 mb-2">НАПИСАТЬ</button>
                </div>
            </div>
        }
    </>
)
