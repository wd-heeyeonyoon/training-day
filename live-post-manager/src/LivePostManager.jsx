import React, { useState, useEffect } from "react";
import { Button } from "@peakon/bedrock/react/button";
import "@peakon/bedrock/css/custom-properties/index.css";
import "@peakon/bedrock/css/reset/index.css";
import "@peakon/bedrock/css/index.css";

function LivePostManager() {
  const [posts, setPosts] = useState([]); // list of posts
  const [loading, setLoading] = useState(true); // loading state
  const [lastClickTime, setLastClickTime] = useState(0); // track last click time

  useEffect(() => {
    // fetch posts from API only once when the component mounts using empty dependency array
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5",
          { method: "GET" },
        );
        const data = await response.json();
        setPosts(data); // store data in state
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // end loading state
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // check if it is okay to click now
  const canClick = () => {
    const now = Date.now();

    // If it has been less than 500ms since last click, return false
    if (now - lastClickTime < 500) {
      return false;
    }

    // store the current time as the last click time
    setLastClickTime(now);
    return true;
  };

  const handleDelete = async (id) => {
    // double click protection
    if (!canClick()) {
      return;
    }

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      // when 200 successful response -> remove the post from posts list
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <div className="post-manager-container">
        <h1 className="page-title">Live Post Manager</h1>
        {posts.length === 0 ? (
          <p className="empty-message">List is empty!</p>
        ) : (
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.id} className="post-item">
                <div className="post-item-content">
                  <span>{post.title}</span>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => {
                      handleDelete(post.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default LivePostManager;
