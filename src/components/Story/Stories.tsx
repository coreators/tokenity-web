import React, { Component } from 'react';
import stroies from '../../dummy_data/stories';
import StoryCard from './StoryCard';
import styles from './Stories.module.scss';

export default class Stories extends Component {
  render() {
    return (
      <>
        <div className={styles.stories}>
          {stroies.map((story) => {
            return <StoryCard key={story.postId} story={story} />;
          })}
        </div>
      </>
    );
  }
}
