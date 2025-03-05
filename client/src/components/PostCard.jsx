import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function PostCard({ post }) {
    return (
        <div className='group relative border rounded-lg overflow-hidden transition-all'>
            <Link to={`/post/${post.slug}`}>
                <img
                    src={post.image}
                    alt={post.title}
                    className='w-full h-[280px] object-cover group-hover:scale-105 transition-all duration-300'
                />
            </Link>
            <div className='p-3'>
                <p className='text-sm text-gray-500'>
                    <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                </p>
                <Link to={`/post/${post.slug}`}>
                    <h2 className='text-xl font-semibold my-2 hover:text-blue-500'>
                        {post.title}
                    </h2>
                </Link>
                <p className='text-gray-600 line-clamp-2'>{post.content}</p>
            </div>
        </div>
    );
}