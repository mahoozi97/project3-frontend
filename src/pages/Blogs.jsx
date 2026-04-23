import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../services/blogService";
import { Link } from "react-router";
import { Spin } from "antd";

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogs();
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#3a6ea5] flex flex-col items-center pt-8 pb-8">
      <div
        className="bg-[#ece9d8] w-200"
        style={{ border: "2px outset #d4d0c8" }}
      >
        <div
          className="flex items-center justify-between px-2 py-1"
          style={{
            background:
              "linear-gradient(180deg,#1c74d4 0%,#1560c0 40%,#1458b8 100%)",
            borderBottom: "1px solid #1a3a6a",
          }}
        >
          <span className="text-white font-bold text-sm">📰 Latest Blogs</span>
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
            Latest Blogs
          </h1>

          <div className="w-full" style={{ borderTop: "1px inset #d4d0c8" }} />

          {!blogs ? (
            <Spin description="Loading blogs..." size="large" />
          ) : blogs.length === 0 ? (
            <p className="text-[13px] text-[#444]">No blogs found!</p>
          ) : (
            <div className="flex flex-col gap-4 w-full">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-[#ece9d8] flex flex-col gap-2 p-3"
                  style={{ border: "2px outset #d4d0c8" }}
                >
                  <img
                    src={blog.image}
                    alt="Blog cover"
                    className="w-full object-cover"
                    style={{ border: "1px inset #d4d0c8" }}
                  />

                  <h2
                    className="text-[15px] font-bold text-[#0a246a]"
                    style={{ textShadow: "1px 1px 0 #fff" }}
                  >
                    {blog.title}
                  </h2>

                  <p className="text-[13px] text-[#444]">
                    {blog.description.substring(0, 100)}...
                  </p>

                  <div
                    className="w-full"
                    style={{ borderTop: "1px inset #d4d0c8" }}
                  />

                  <div className="flex justify-end">
                    <Link to={`/blog/${blog._id}`}>
                      <button
                        className="px-6 py-1 text-[13px] font-bold text-black bg-[#ece9d8] cursor-pointer active:scale-95"
                        style={{ border: "2px outset #d4d0c8" }}
                      >
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
