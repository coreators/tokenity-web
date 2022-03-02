import React, { Component } from "react";
import stories from "../../dummy_data/stories";
import StoryCard from "./StoryCard";
import styles from "./Stories.module.scss";

export default class Stories extends Component {
  render() {
    return (
      <>
        <h5>Stories</h5>
        <div className={styles.stories}>
          {stories.map((story) => {
            return <StoryCard story={story} />;
          })}
        </div>
      </>
    );
  }
}
