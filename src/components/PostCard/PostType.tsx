import React from 'react';
import TypeArt from './TypeArt';
import TypeFunding from './TypeFunding';
import TypePost from './TypePost';
import TypeTicket from './TypeTicket';

function PostType({ post }) {
  return (
    <div>
      {
        {
          funding: <TypeFunding post={post} />,
          art: <TypeArt post={post} />,
          ticket: <TypeTicket post={post} />,
          post: <TypePost post={post} />,
          
        }[post.type]
      }
    </div>
  );
}

export default PostType;
