 import { useEffect, useState } from "react";
 import { motion } from "framer-motion";
 import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";  //✅ use slim for easy setup


 function Home() {
const particlesInit = async (main) => {
  await loadSlim(main);  //✅ this loads only the basic engine
};
  
   const [posts, setPosts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [search, setSearch] = useState("");

   useEffect(() => {
     fetch("https://blogsite-fxsk.onrender.com/api/posts")
       .then((res) => res.json())
       .then((data) => {
         setPosts(data);
         setLoading(false);
       })
       .catch((err) => {
         console.error("Error fetching posts:", err);
         setLoading(false);
       });
   }, []);

   if (loading) return <p className="text-center mt-10 text-white">Loading posts...</p>;

    //✅ Filter posts based on search
   const filteredPosts = posts.filter(
     (post) =>
       post.title.toLowerCase().includes(search.toLowerCase()) ||
       post.content.toLowerCase().includes(search.toLowerCase())
   );

   return (
     <div className="relative min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-6">
          <Particles
  id="tsparticles"
  init={particlesInit}
  options={{
    background: { color: "#1a0033" },  //black background
    fpsLimit: 60,
    particles: {
      number: { value: 80 },
      color: { value: "#ffd700" },

      links: { enable: true, color: "#ffffff", distance: 150 },
      move: { enable: true, speed: 2 },
      size: { value: 3 },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" } },
      modes: { repulse: { distance: 100 } },
    },
  }}
  className="absolute top-0 left-0 w-full h-full"
/>
       <motion.div
         className="max-w-5xl mx-auto mt-10"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.6 }}
       >
        
         <h1 className="text-4xl font-bold mb-10 text-center text-white drop-shadow-md">
           📝 Latest Blog Posts
         </h1>

         <div className="flex justify-center mb-6">
           <input
             type="text"
             placeholder="Search posts..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring focus:border-blue-500"
           />
         </div>

         {filteredPosts.length === 0 ? (
           <p className="text-center text-white text-lg">No blog posts match your search.</p>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {filteredPosts.map((post, index) => (
               <motion.div
                 key={post._id}
                 className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
                 whileHover={{ scale: 1.02 }}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1 }}
               >
                 <Link to={`/post/${post._id}`}>
                  
                   {/* ✅ Show post image if available */}
                   {post.image && (
                     <img
                       src={post.image}
                       alt={post.title}
                       className="w-full h-48 object-cover rounded-lg mb-3"
                     />
                   )}

                   <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
                   <p className="text-gray-600 mb-2">
                     {post.content.length > 150
                       ? post.content.slice(0, 150) + "..."
                       : post.content}
                   </p>
                 </Link>

                 <div className="text-sm text-gray-500 mt-2">
                   <p>Author: {post.author?.username || "Unknown"}</p>
                   <p className="text-xs">
                     Posted on: {new Date(post.createdAt).toLocaleString()}
                   </p>
                 </div>
               </motion.div>
             ))}
           </div>
         )}
       </motion.div>
     </div>
   );
 }
 export default Home;
