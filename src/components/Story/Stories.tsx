import React, { Component } from "react";
import stories from "../../dummy_data/stories";
import StoryCard from "./StoryCard";
import styles from "./Stories.module.scss";
import NiceModal from '@ebay/nice-modal-react';

export default class Stories extends Component {


  showModal = (story) => {
    
    
    // stories
    NiceModal.show('story-modal', story).then((result: any) => {
      // if (result.type === 'delete') {
        // NiceModal.remove('postcard-more');
      // }
    });
  };

  render() {
    return (
      <>
        <div className={styles.stories} >
          {stories.map((story) => {
            return <StoryCard key={story.postId} story={story} onClick={()=>this.showModal(story)} />;
          })}
        </div>
      </>
    );
  }
}
