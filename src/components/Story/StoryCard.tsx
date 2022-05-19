import styles from './StoryCard.module.scss';



function StoryCard({ story, onClick }) {


  return (
    <div
      className={styles.storyCard}
      style={{ backgroundImage: `url(${story.backImageUrl})` }}
      onClick={onClick}
    >
      <div className={styles.profileImage}>
        <img src={story.profileImageUrl} alt="profile" />
      </div>
      <h6>{story.userName}</h6>
    </div>
  );
}

export default StoryCard;
