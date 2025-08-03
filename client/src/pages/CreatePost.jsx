import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";  // ✅ lighter version

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // ✅ tsparticles init with slim version
  const particlesInit = async (main) => {
    await loadSlim(main);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to create a post.");
      return;
    }

    // ✅ Using FormData for image upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("https://blogsite-fxsk.onrender.com/api/posts", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
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
    <div className="relative min-h-screen flex justify-center items-center">
      
      {/* 🎉 ✅ Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#0d1117" }, // ✅ cool dark background
          particles: {
            number: { value: 60 },
            color: { value: ["#00ffff", "#ff00ff", "#ffcc00"] }, // ✨ neon particles
            links: { enable: true, color: "#ffffff" },
            move: { enable: true, speed: 1 },
            size: { value: 3 },
          },
        }}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      {/* ✅ Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-md w-full max-w-2xl relative z-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Create New Blog Post
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2"
            required
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 h-40 resize-none"
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload Image</label>
          <input 
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border border-gray-300 rounded-xl px-3 py-2"
          />
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
