import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCommunityPosts, createCommunityPost } from '../api/api';

function CommunityPage({ user }) {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    useEffect(() => {
        getCommunityPosts().then(res => setPosts(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await createCommunityPost(newPost);
        setPosts([data, ...posts]);
        setNewPost('');
    };

    return (
        <div className="container">
            <Link to="/dashboard">← Back to Dashboard</Link>
            <h1>Open Community</h1>

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={newPost}
                        onChange={e => setNewPost(e.target.value)}
                        placeholder="Ask a question or share an update..."
                        rows="4"
                        style={{ width: '100%', padding: '10px' }}
                    ></textarea>
                    <button type="submit" style={{marginTop: '10px'}}>Post</button>
                </form>
            </div>

            {posts.map(post => (
                <div key={post.id} className="card">
                    <p><strong>{post.author_name}</strong> <small>({new Date(post.created_at).toLocaleString()})</small></p>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    );
}

export default CommunityPage;