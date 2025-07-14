import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../utils/getUserFromToken";
import { motion } from "framer-motion";

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentUserId = getUserIdFromToken();

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("Post deleted successfully.");
        navigate("/");
      } else {
        const err = await res.json();
        alert(err.message || "Failed to delete post.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;
  if (!post) return <p className="text-center mt-10 text-white">Post not found.</p>;

  const isAuthor = post?.author?._id === currentUserId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <motion.div
        className="max-w-3xl mx-auto mt-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-4 text-gray-800"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {post.title}
        </motion.h1>

        <p className="text-gray-700 text-lg mb-4 whitespace-pre-line">{post.content}</p>
        <p className="text-sm text-gray-500">
          Author: <span className="font-semibold">{post.author?.username || "Unknown"}</span>
        </p>
        <p className="text-xs text-gray-400">
          Posted on: {new Date(post.createdAt).toLocaleString()}
        </p>

        {isAuthor && (
          <motion.div
            className="mt-6 flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => navigate(`/edit/${post._id}`)}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition"
            >
              Delete
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default SinglePost;
