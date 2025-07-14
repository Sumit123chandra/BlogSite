import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to create a post.");
      return;
    }

    try {
      const res = await fetch("https://blogsite-fxsk.onrender.com/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        alert("Post created successfully!");
        navigate("/");
      } else {
        const err = await res.json();
        alert(err.message || "Failed to create post.");
      }
    } catch (error) {
      console.error("Create post error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Create New Blog Post
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 h-40 resize-none focus:outline-none focus:ring focus:border-green-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
