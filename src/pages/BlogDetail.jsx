import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getBlogById, addComment, deleteComment } from '../services/blogService'

const BlogDetail = ({user}) => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [commentText, setCommentText] = useState('')

  const currentUserId = localStorage.getItem('userId')

  useEffect(() => {
    loadBlog()
  }, [id])

  const loadBlog = async () => {
    try {
      const response = await getBlogById(id)
      setBlog(response.data)
    } catch (error) {
      console.error("Error fetching blog:", error)
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    try {
      await addComment(id, { text: commentText, userId: currentUserId })
      setCommentText('')
      loadBlog()
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(id, commentId)
      loadBlog()
    } catch (error) {
      console.error("Error deleting comment:", error)
    }
  }

  if (!blog) {
    return <p>Loading...</p>
  }

  return (
    <div className='blog-detail'>
      <h1>{blog.title}</h1>
      <img src={blog.image} alt="Blog cover" />
      <p>{blog.description}</p>

      <hr />
      <h3>Comments</h3>
      {blog.comments.map((comment) => (
        <div key={comment._id} className='comment'>
          <strong>{comment.userId?.name || "User"}</strong>
          <span>{comment.text}</span>

          {/* FIX: was `comment.userId === comment.userId` (always true).
              Now correctly compares the comment author's ID to the logged-in user's ID */}
          {comment.userId?._id === user._id && (
            <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
          )}
        </div>
      ))}

      {currentUserId ? (
        <form onSubmit={handleAddComment}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
            required
          />
          <button type="submit">Add Comment</button>
        </form>
      ) : (
        <p>Please log in to add a comment.</p>
      )}
    </div>
  )
}

export default BlogDetail