import styles from "./StoryCard.module.scss";

function StoryCard({ story }) {
  return (
    <div
      className={styles.storyCard}
      style={{ backgroundImage: `url(${story.backImageUrl})` }}
    >
      <h6>{story.userName}</h6>
    </div>
  );
}

export default StoryCard;
