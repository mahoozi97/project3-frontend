import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getBlogById,
  addComment,
  deleteComment,
} from "../services/blogService";
import { Spin } from "antd";

// FIX: decode the userId from the stored JWT token.
// The old code did localStorage.getItem('userId'), but nothing in the app
// ever writes 'userId' to localStorage — only 'token' is stored.
// This meant currentUserId was always null: the delete button never appeared
// and logged-in users always saw "Please log in to add a comment."
const getTokenUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1])).payload._id;
  } catch {
    return null;
  }
};

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState("");

  const currentUserId = getTokenUserId();

  useEffect(() => {
    loadBlog();
  }, [id]);

  const loadBlog = async () => {
    try {
      const response = await getBlogById(id);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      // Don't send userId from the client — the backend reads it from the token
      await addComment(id, { text: commentText });
      setCommentText("");
      loadBlog();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(id, commentId);
      loadBlog();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (!blog) {
    return (
      <Spin style={{ marginTop: "20px" }} description="Loading" size="large" />
    );
  }

  return (
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <img src={blog.image} alt="Blog cover" />
      <p>{blog.description}</p>

      <hr />
      <h3>Comments</h3>
      {blog.comments.map((comment) => (
        <div key={comment._id} className="comment">
          {/* Fall back to 'username' since that's the field in User.js */}
          <strong>
            {comment.userId?.username || comment.userId?.name || "User"}
          </strong>
          <span> {comment.text}</span>

          {/* .toString() needed: after populate, comment.userId._id is a
              Mongoose ObjectId, not a plain string */}
          {currentUserId &&
            comment.userId?._id?.toString() === currentUserId && (
              <button onClick={() => handleDeleteComment(comment._id)}>
                Delete
              </button>
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
  );
};

export default BlogDetail;
