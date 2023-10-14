import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/allPost.css'; // Import the separate CSS file for SelectedPost

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3017/api/posts/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // Function to navigate to the SelectedPost page with the post ID
  const navigateToSelectedPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleReadMoreClick = (postId) => {
    // Toggle the visibility of the read more content
    const readMoreContent = document.getElementById(`read-more-${postId}`);
    readMoreContent.classList.toggle('read-more');

    // Toggle the "Read More" button text
    const readMoreBtn = document.getElementById(`read-more-btn-${postId}`);
    if (readMoreBtn.innerHTML === '...Read More') {
      readMoreBtn.innerHTML = '...Read More';
    } else {
      readMoreBtn.innerHTML = '...Read Less';
    }
  };

  // Function to filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div class="container mt-5">
    <div class="row">
        <div class="col-md-8 mx-auto">
            <h2 class="text-center mb-4">Explore the Articles</h2>
            <button class="btn btn-primary mb-3" onClick={() => {navigate(`/createpost`);}}>
                Create Post
            </button>
          
            <div class="mb-3">
                <input type="text" class="form-control" placeholder="Search Posts" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div>
                {filteredPosts.map((post) => (
                    <div class="card mb-4" key={post._id}>
                        <div class="card-body">
                            <h5 class="card-title">
                                <a href="#" class="link-dark" onClick={() => navigateToSelectedPost(post._id)}>
                                    {post.title}
                                </a>
                            </h5>
                            <p class="card-text">
                                {post.content.length > 200 ? (
                                    <>
                                        {post.content.slice(0, 200)}
                                        <span id={`read-more-${post._id}`} class="read-more">
                                            {post.content.slice(200)}
                                        </span>
                                        <span id={`read-more-btn-${post._id}`} class="read-more-btn" onClick={() => handleReadMoreClick(post._id)}>
                                        <strong>...Read More</strong>
                                        </span>
                                    </>
                                ) : (
                                    <pre style={{ whiteSpace: 'pre-wrap' }}>{post.content}</pre>
                                )}
                            </p>
                            <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                              by: {post.name}
                                </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
</div>

  );
}

export default AllPost;
