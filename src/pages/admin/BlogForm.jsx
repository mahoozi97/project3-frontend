import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { createBlog, getBlogById, updateBlog } from "../../services/blogService";
import { XPButton, XPInput } from "../../components/XPControls";

const BlogForm = () => {
  const [formData, setFormData] = useState({ title: "", description: "", image: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBlogById(id).then(res => setFormData(res.data));
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
    <div
      className="flex-1 justify-end max-w-200 ml-50 mt-4"
      style={{ background: "#ece9d8", border: "2px inset #808080" }}
    >
      <div
        className="text-white font-bold text-[13px] px-2 py-1"
        style={{ background: "linear-gradient(90deg,#1458b8,#3a7bd5)" }}
      >
        📝 {id ? "Edit Blog" : "Create New Blog"}
      </div>

      <div className="p-3">
        {errorMessage && (
          <div className="bg-[#fff0f0] border border-red-400 p-2 mb-3 text-[13px] text-red-700">
            <div>• {errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center flex-1 min-w-50 justify-center">
              <span className="text-[12px] font-bold w-14">Title:</span>
              <XPInput
                type="text"
                className="flex-1 max-w-60"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center flex-1 min-w-50 justify-center">
              <span className="text-[12px] font-bold w-14">Image:</span>
              <XPInput
                type="text"
                className="flex-1 max-w-60"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-start flex-1 min-w-50 justify-center">
              <span className="text-[12px] font-bold w-14 pt-1">Desc:</span>
              <textarea
                className="flex-1 max-w-60 bg-white text-[13px] px-1 py-0.5 font-[Tahoma,sans-serif] outline-none resize-y"
                style={{ border: "2px inset #808080" }}
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-2 pt-2 border-t border-black/10">
            <XPButton primary type="submit" className="py-1.5 px-6 text-sm">
              {id ? "Update Blog ➔" : "Create Blog ➔"}
            </XPButton>
          </div>

        </form>
      </div>
    </div>
  );
};

export default BlogForm;