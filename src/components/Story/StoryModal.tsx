import { useModal } from "@ebay/nice-modal-react";
import NiceModal from "@ebay/nice-modal-react";
import React from "react";
import Stories from 'react-insta-stories';

export default NiceModal.create((story) => {
    let modal = useModal();
    let stories = [
        story['backImageUrl']
    ];
    return (
        <StoryReel modal={modal} stories={stories} />
    )
});

const StoryReel = ({ modal, stories }) => {

    // get next stories... on finsihed
    const visibleIndex = React.useRef(0);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const onStoryStart = (index: number) => {
        visibleIndex.current = index;
    }
    const onAllStoriesEnd = () => {
        // TODO: get next stories
    }
    // const onNext = () => setSelectedIndex(visibleIndex.current + 1);
    // const onPrevious = () => setSelectedIndex(visibleIndex.current - 1);

    let storyContent = {
        width: '100vh',
        // maxWidth: '100%',
        // maxHeight: '100%',
        margin: 'auto'
    }

    return (
        <div className="story_reel">
            {/* close button */}
            <div className="overlay" onClick={modal.remove}></div>
            
            {/* <button type="button" onClick={onPrevious}>Previous</button> */}

            <Stories
                onAllStoriesEnd={onAllStoriesEnd}
                onStoryStart={onStoryStart}
                stories={stories}
                currentIndex={selectedIndex}
                storyStyles={storyContent}
            />

            {/* <button type="button" onClick={onNext}>Next</button> */}
        </div>
    )
}