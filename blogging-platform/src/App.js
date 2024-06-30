import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        setBlogs(savedBlogs);
    }, []);

    useEffect(() => {
        localStorage.setItem('blogs', JSON.stringify(blogs));
    }, [blogs]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBlog = { title, content, id: Date.now() };
        setBlogs([...blogs, newBlog]);
        setTitle('');
        setContent('');
    };

    const deleteBlog = (id) => {
        setBlogs(blogs.filter(blog => blog.id !== id));
    };

    return (
        <div className="container">
            <h1>MY BLOG</h1>
            <form id="blog-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="title"
                    placeholder="Title?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    id="content"
                    placeholder="Blog here!"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">Add Blog</button>
            </form>
            <div id="blogs">
                {blogs.map((blog) => (
                    <div key={blog.id} className="blog">
                        <h2 className="blog-title">{blog.title}</h2>
                        <p className="blog-content">{blog.content}</p>
                        <button className="delete-button" onClick={() => deleteBlog(blog.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
