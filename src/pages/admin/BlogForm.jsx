import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  createBlog,
  getBlogById,
  updateBlog,
} from "../../services/blogService";
import { XPButton, XPInput } from "../../components/XPControls";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBlogById(id).then((res) => setFormData(res.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateBlog(id, formData);
      } else {
        await createBlog(formData);
      }
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Save failed", err);
      setErrorMessage(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-8">
      <div
        className="w-full max-w-2xl"
        style={{ background: "#ece9d8", border: "2px inset #808080" }}
      >
        {/* Title Bar */}
        <div
          className="flex items-center justify-between px-2 py-1"
          style={{
            background:
              "linear-gradient(180deg,#1c74d4 0%,#1560c0 40%,#1458b8 100%)",
            borderBottom: "1px solid #1a3a6a",
          }}
        >
          <span className="text-white font-bold text-sm">
            📝 {id ? "Edit Blog" : "Create New Blog"}
          </span>
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

        {/* Form Body */}
        <div className="p-5">
          {errorMessage && (
            <div className="bg-[#fff0f0] border border-red-400 p-2 mb-3 text-[14px] text-red-700">
              ⚠️ {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Title */}
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold w-20">Title:</span>
              <XPInput
                type="text"
                className="flex-1"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            {/* Image */}
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold w-20">Image URL:</span>
              <XPInput
                type="text"
                className="flex-1"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>

            {/* Image preview */}
            {formData.image && (
              <div className="flex gap-2 items-start">
                <span className="text-[12px] font-bold w-20 pt-1">
                  Preview:
                </span>
                <img
                  src={formData.image}
                  alt="preview"
                  className="max-h-32 object-cover"
                  style={{ border: "2px inset #808080" }}
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}

            {/* Description */}
            <div className="flex items-start gap-2">
              <span className="text-[12px] font-bold w-20 pt-1">
                Description:
              </span>
              <textarea
                className="flex-1 bg-white text-[12px] px-1.5 py-1 outline-none resize-y"
                style={{
                  border: "2px inset #808080",
                  fontFamily: "Tahoma, sans-serif",
                  minHeight: "120px",
                }}
                rows={5}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-3 border-t border-black/10">
              <XPButton primary type="submit" className="py-1.5 px-6 text-sm">
                {id ? "Update Blog ➔" : "Create Blog ➔"}
              </XPButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
