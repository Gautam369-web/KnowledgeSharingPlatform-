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
            <div className={`animate-in ${isReply ? 'ml-8 mt-4' : 'mt-6'}`} style={{ borderLeft: isReply ? '2px solid rgba(74, 158, 92, 0.1)' : 'none', paddingLeft: isReply ? 16 : 0 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                    <Link href={`/profile/${comment.author.id}`} style={{ flexShrink: 0 }}>
                        <img
                            src={comment.author.avatar}
                            alt={comment.author.name}
                            style={{ width: 32, height: 32, borderRadius: 10, objectFit: 'cover', border: '1px solid rgba(74, 158, 92, 0.2)' }}
                        />
                    </Link>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                            background: 'rgba(74, 158, 92, 0.04)',
                            borderRadius: '16px',
                            padding: '12px 16px',
                            border: '1px solid rgba(74, 158, 92, 0.08)',
                            transition: 'all 0.3s'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                <Link
                                    href={`/profile/${comment.author.id}`}
                                    style={{
                                        fontSize: 13, fontWeight: 800, color: '#f0ebe0',
                                        textDecoration: 'none', transition: 'color 0.3s'
                                    }}
                                >
                                    {comment.author.name}
                                </Link>
                                <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(240, 235, 224, 0.3)', textTransform: 'uppercase' }}>
                                    {timeAgo(comment.createdAt)}
                                </span>
                            </div>
                            <p style={{ fontSize: 14, color: 'rgba(240, 235, 224, 0.7)', lineHeight: 1.6, margin: 0 }}>
                                {comment.content}
                            </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8, marginLeft: 4 }}>
                            <button
                                onClick={toggleLike}
                                style={{
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', fontSize: 11, fontWeight: 800,
                                    color: isLiked ? '#ef4444' : 'rgba(240, 235, 224, 0.3)', transition: 'color 0.2s'
                                }}
                            >
                                {isLiked ? (
                                    <HiHeart style={{ width: 14, height: 14, marginRight: 4 }} />
                                ) : (
                                    <HiOutlineHeart style={{ width: 14, height: 14, marginRight: 4 }} />
                                )}
                                {formatNumber(likeCount)}
                            </button>
                            <button
                                onClick={() => setReplyTo(comment.id)}
                                style={{
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', fontSize: 11, fontWeight: 800,
                                    color: 'rgba(240, 235, 224, 0.3)', transition: 'color 0.2s'
                                }}
                            >
                                <HiOutlineReply style={{ width: 14, height: 14, marginRight: 4 }} />
                                REPLY
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
        <div style={{ marginTop: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <HiOutlineChatAlt2 style={{ width: 20, height: 20, color: '#d4a017' }} />
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 800, color: '#f0ebe0' }}>
                    {comments.length} Comments
                </h3>
            </div>

            <form onSubmit={handleSubmit} style={{ marginBottom: 40 }}>
                <div style={{ position: 'relative' }}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder={isAuthenticated ? "Share your thoughts..." : "Sign in to add a comment"}
                        disabled={!isAuthenticated}
                        style={{
                            width: '100%',
                            minHeight: 100,
                            padding: '16px',
                            background: 'rgba(10, 26, 13, 0.4)',
                            border: '1px solid rgba(74, 158, 92, 0.15)',
                            borderRadius: '16px',
                            fontSize: 14,
                            color: '#f0ebe0',
                            outline: 'none',
                            resize: 'none',
                            transition: 'all 0.3s',
                            cursor: isAuthenticated ? 'text' : 'not-allowed',
                            opacity: isAuthenticated ? 1 : 0.6
                        }}
                    />
                    {isAuthenticated && (
                        <div style={{
                            position: 'absolute',
                            bottom: 12,
                            right: 12,
                            opacity: newComment.trim() ? 1 : 0,
                            transition: 'opacity 0.2s',
                            pointerEvents: newComment.trim() ? 'auto' : 'none'
                        }}>
                            <button
                                type="submit"
                                className="btn-primary"
                                style={{ padding: '8px 16px', fontSize: 11, borderRadius: 10 }}
                            >
                                POST COMMENT
                            </button>
                        </div>
                    )}
                </div>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>

            {comments.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    background: 'rgba(74, 158, 92, 0.03)',
                    borderRadius: 20,
                    border: '1px dashed rgba(74, 158, 92, 0.15)'
                }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(240, 235, 224, 0.3)', margin: 0 }}>
                        No comments yet. Join the conversation!
                    </p>
                </div>
            )}
        </div>
    );
}
