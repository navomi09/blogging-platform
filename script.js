document.addEventListener('DOMContentLoaded', () => {
    const blogForm = document.getElementById('blog-form');
    const blogsContainer = document.getElementById('blogs');

    // Load blogs from localStorage
    loadBlogs();

    blogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        if (title && content) {
            const blog = { title, content, id: Date.now() };
            addBlogToDOM(blog);
            saveBlog(blog);
            
            // Clear form
            blogForm.reset();
        }
    });

    blogsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-button')) {
            const blogId = e.target.dataset.id;
            deleteBlog(blogId);
            e.target.parentElement.remove();
        }
    });

    function loadBlogs() {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs.forEach(blog => addBlogToDOM(blog));
    }

    function addBlogToDOM(blog) {
        const blogDiv = document.createElement('div');
        blogDiv.className = 'blog';
        blogDiv.innerHTML = `
            <h2 class="blog-title">${blog.title}</h2>
            <p class="blog-content">${blog.content}</p>
            <button class="delete-button" data-id="${blog.id}">Delete</button>
        `;
        blogsContainer.appendChild(blogDiv);
    }

    function saveBlog(blog) {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs.push(blog);
        localStorage.setItem('blogs', JSON.stringify(blogs));
    }

    function deleteBlog(id) {
        let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs = blogs.filter(blog => blog.id !== parseInt(id));
        localStorage.setItem('blogs', JSON.stringify(blogs));
    }
});

