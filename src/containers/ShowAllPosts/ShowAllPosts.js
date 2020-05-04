import React, { useContext, useEffect, useState } from 'react'
import { PostsContext } from '../../context/Posts/PostsContext'
import { Loader } from '../../components/Loader/Loader'
import PostPreview from '../../components/PostPreview/PostPreview'
import { UsersContext } from '../../context/Users/UsersContext'
import { Input } from '../../components/UI/Input/Input'

const ShowAllPosts = () => {
  const { state: statePosts, getPosts, setPostsForSearching } = useContext(
    PostsContext,
  )
  const posts = statePosts.postsForSearching
  const { state: stateUsers, getUsers } = useContext(UsersContext)
  const [value, setValue] = useState('')

  useEffect(() => {
    getPosts()
    getUsers()
    // зацикливается
    // eslint-disable-next-line
  }, [])

  const onChangeSearchHandler = event => {
    const value = event.target.value
    const UserIdUserName = stateUsers.UserIdUserName
    const re = new RegExp(value, 'i')
    const posts = statePosts.posts
    const postsForSearching = posts.filter(post =>
      re.test(UserIdUserName[post.userId]),
    )

    setValue(value)
    setPostsForSearching(postsForSearching)
  }

  return (
    <>
      <Input
        value={value}
        label={'Поиск:'}
        placeholder={'Введите имя пользователя...'}
        matchCount={value ? posts.length : value}
        onChange={onChangeSearchHandler}
      />

      {statePosts.loading || stateUsers.loading ? (
        <Loader />
      ) : (
        <div className="row pr-1 pl-35 w-100">
          {posts.length ? (
            posts.map((post, index) => <PostPreview key={index} post={post} />)
          ) : (
            <div className="pl-3">
              У пользователя <strong>{value}</strong> нету постов
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ShowAllPosts
