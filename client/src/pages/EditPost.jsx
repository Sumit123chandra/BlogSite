import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://blogsite-fxsk.onrender.com/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        alert("Post updated successfully!");
        navigate(`/post/${id}`);
      } else {
        const err = await res.json();
        alert(err.message || "Failed to update post.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-white">Loading post...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex justify-center items-center px-4">
      <motion.form
        onSubmit={handleUpdate}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-2xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800 drop-shadow-sm">
          ✏️ Edit Blog Post
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 h-40 resize-none focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition font-semibold"
        >
          Update Post
        </motion.button>
      </motion.form>
    </div>
  );
}

export default EditPost;
