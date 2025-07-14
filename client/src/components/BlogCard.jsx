import { Link } from 'react-router-dom';

function BlogCard({ post }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4 hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>By {post.author}</span>
        <Link to={`/post/${post._id}`} className="text-blue-600 hover:underline">
          Read More
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
