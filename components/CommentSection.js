'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, timeAgo } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlineChatAlt2, HiOutlineReply, HiOutlineHeart, HiHeart } from 'react-icons/hi';

export default function CommentSection({ comments: initialComments, parentId, parentType }) {
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const { user, isAuthenticated } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast.error('Please sign in to comment');
            return;
        }

        if (!newComment.trim()) return;

        const comment = {
            id: Date.now().toString(),
            content: newComment,
            author: {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
            },
            createdAt: new Date().toISOString(),
            likes: 0,
            replies: [],
        };

        setComments([...comments, comment]);
        setNewComment('');
        toast.success('Comment added!');
    };

    const Comment = ({ comment, isReply = false }) => {
        const [isLiked, setIsLiked] = useState(false);
        const [likeCount, setLikeCount] = useState(0);

        const toggleLike = () => {
            setIsLiked(!isLiked);
            setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
        };

        return (
            <div className={`group animate-in ${isReply ? 'ml-8 mt-4' : 'mt-6'}`}>
                <div className="flex gap-3">
                    <Link href={`/profile/${comment.author.id}`} className="flex-shrink-0">
                        <img
                            src={comment.author.avatar}
                            alt={comment.author.name}
                            className="w-8 h-8 rounded-lg object-cover"
                        />
                    </Link>
                    <div className="flex-1 min-w-0">
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 
                          border border-slate-100 dark:border-slate-800 
                          group-hover:border-primary-100 dark:group-hover:border-primary-900/30 
                          transition-all duration-300">
                            <div className="flex items-center justify-between mb-1">
                                <Link
                                    href={`/profile/${comment.author.id}`}
                                    className="text-sm font-bold text-slate-900 dark:text-white 
                           hover:text-primary-600 transition-colors"
                                >
                                    {comment.author.name}
                                </Link>
                                <span className="text-[10px] font-medium text-slate-400 capitalize">
                                    {timeAgo(comment.createdAt)}
                                </span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {comment.content}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 ml-2">
                            <button
                                onClick={toggleLike}
                                className={`flex items-center text-xs font-bold transition-colors ${isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'
                                    }`}
                            >
                                {isLiked ? (
                                    <HiHeart className="w-3.5 h-3.5 mr-1" />
                                ) : (
                                    <HiOutlineHeart className="w-3.5 h-3.5 mr-1" />
                                )}
                                {formatNumber(likeCount)}
                            </button>
                            <button
                                onClick={() => setReplyTo(comment.id)}
                                className="flex items-center text-xs font-bold text-slate-400 
                         hover:text-primary-500 transition-colors"
                            >
                                <HiOutlineReply className="w-3.5 h-3.5 mr-1" />
                                Reply
                            </button>
                        </div>

                        {comment.replies && comment.replies.map(reply => (
                            <Comment key={reply.id} comment={reply} isReply />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="mt-8">
            <div className="flex items-center space-x-2 mb-6">
                <HiOutlineChatAlt2 className="w-5 h-5 text-primary-500" />
                <h3 className="font-bold text-slate-900 dark:text-white">
                    {comments.length} Comments
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="mb-8">
                <div className="relative group">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder={isAuthenticated ? "Add a comment..." : "Sign in to add a comment"}
                        disabled={!isAuthenticated}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 
                     border border-slate-100 dark:border-slate-800 
                     rounded-2xl text-sm focus:outline-none focus:ring-2 
                     focus:ring-primary-500 focus:border-transparent 
                     transition-all duration-200 min-h-[100px] resize-none
                     disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {isAuthenticated && (
                        <div className="absolute bottom-3 right-3 opacity-0 group-focus-within:opacity-100 transition-opacity">
                            <button
                                type="submit"
                                className="px-4 py-1.5 bg-primary-600 text-white text-xs 
                         font-bold rounded-xl shadow-lg shadow-primary-500/25 
                         hover:bg-primary-700 transition-all"
                            >
                                Post Comment
                            </button>
                        </div>
                    )}
                </div>
            </form>

            <div className="space-y-2 divide-y divide-slate-100 dark:divide-slate-800">
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>

            {comments.length === 0 && (
                <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <p className="text-sm text-slate-400 font-medium">No comments yet. Be the first to join the conversation!</p>
                </div>
            )}
        </div>
    );
}
