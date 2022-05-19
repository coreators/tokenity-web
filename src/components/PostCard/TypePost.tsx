import React from 'react';

function TypePost({ post }) {
  var arabic = /[\u0600-\u06FF]/;
  return (
    
      <div
        className="p-3"
        style={{
          textAlign: `${arabic.test(post.postContent) ? 'right' : 'left'}`,
          direction: `${arabic.test(post.postContent) ? 'rtl' : 'ltr'}`,
        }}
      >
        {post.postContent}
      </div>
    
  );
}

export default TypePost;
