import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getBlogById, addComment, deleteComment } from "../services/blogService";
import { Spin } from "antd";
import { XPButton, XPInput } from "../components/XPControls";

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
      <div className="min-h-screen bg-[#3a6ea5] flex flex-col items-center pt-8 pb-8">
        <Spin description="Loading..." size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#3a6ea5] flex flex-col items-center pt-8 pb-8">
      <div
        className="bg-[#ece9d8] w-200"
        style={{ border: "2px outset #d4d0c8" }}
      >

        <div
          className="flex items-center justify-between px-2 py-1"
          style={{
            background: "linear-gradient(180deg, #0a246a, #3a6ea5)",
            borderBottom: "1px solid #1a3a6a",
          }}
        >
          <span className="text-white font-bold text-sm">📰 {blog.title}</span>
          <div className="flex gap-1">
            {["─", "□", "✕"].map((s, i) => (
              <button
                key={i}
                className="w-5 h-5 text-white text-[11px] flex items-center justify-center"
                style={{
                  border: "1px outset #7a9ac8",
                  background: "linear-gradient(180deg,#4a7ab5,#2a5a95)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center px-8 py-6 gap-4">

          <h1
            className="text-[22px] font-bold text-[#0a246a] text-center"
            style={{ textShadow: "1px 1px 0 #fff" }}
          >
            {blog.title}
          </h1>

          <img
            src={blog.image}
            alt="Blog cover"
            className="w-full object-cover"
            style={{ border: "1px inset #d4d0c8" }}
          />

          <p className="text-[13px] text-[#444] w-full">{blog.description}</p>

          <div className="w-full" style={{ borderTop: "1px inset #d4d0c8" }} />

          <div className="w-full flex flex-col gap-2">
            <h3
              className="text-[15px] font-bold text-[#0a246a]"
              style={{ textShadow: "1px 1px 0 #fff" }}
            >
              💬 Comments
            </h3>

            {blog.comments.length === 0 && (
              <p className="text-[13px] text-[#444]">No comments yet.</p>
            )}

            {blog.comments.map((comment) => (
              <div
                key={comment._id}
                className="flex items-center justify-between px-3 py-2 bg-[#ece9d8]"
                style={{ border: "2px outset #d4d0c8" }}
              >
                <div className="flex gap-2 text-[13px]">
                  <strong className="text-[#0a246a]">
                    {comment.userId?.username || comment.userId?.name || "User"}:
                  </strong>
                  <span className="text-[#444]">{comment.text}</span>
                </div>
                {currentUserId &&
                  comment.userId?._id?.toString() === currentUserId && (
                    <XPButton onClick={() => handleDeleteComment(comment._id)}>
                      Delete
                    </XPButton>
                  )}
              </div>
            ))}
          </div>

          <div className="w-full" style={{ borderTop: "1px inset #d4d0c8" }} />

          {currentUserId ? (
            <div
              className="w-full bg-[#ece9d8]"
              style={{ border: "2px inset #808080" }}
            >
              <div
                className="text-white font-bold text-[13px] px-2 py-1"
                style={{ background: "linear-gradient(90deg,#1458b8,#3a7bd5)" }}
              >
                ✏️ Add a Comment
              </div>

              <div className="p-3">
                <form onSubmit={handleAddComment} className="flex flex-col gap-3">
                  <div className="flex items-center gap-4 flex-wrap justify-center">
                    <div className="flex items-center flex-1 min-w-50 justify-center">
                      <span className="text-[12px] font-bold w-14">Commet:</span>
                      <XPInput
                        type="text"
                        className="flex-1 max-w-60"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write your comment..."
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-2 pt-2 border-t border-black/10">
                    <XPButton primary type="submit" className="py-1.5 px-6 text-sm">
                      Post Comment ➔
                    </XPButton>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <p className="text-[13px] text-[#444] italic">
              Please log in to add a comment.
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default BlogDetail;