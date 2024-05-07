import * as React from "react";
import PropTypes from "prop-types";
import styles from "./App.scss";
import YouTube from "react-youtube";
import { useRef } from "react";

const App = ({ heading, subHeading, videoLink }) => {
  const [player, setPlayer] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const youtubeId = videoLink.split("v=")[1];
  const onReady = (e) => {
    setPlayer(e.target);
  };

  const play = () => {
    player.playVideo();
    playbtn.current.style.visibility = "hidden";
    playbtn.current.style.width = "140px";
    playbtn.current.style.height = "140px";
    playbtn.current.style.opacity = 0;
    setIsPlaying(true);
  };
  const pause = () => {
    player.pauseVideo();
    setIsPlaying(false);
  };

  const onPlayHandler = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };
  const playbtn = useRef(null);

  return videoLink ? (
    <div className={`${styles.bannerwrapper}`}>
      <div className={`${styles.videoBanner}`}>
        <YouTube
          videoId={youtubeId}
          id={`video-${youtubeId}`}
          title={videoLink}
          onReady={onReady}
          iframeClassName={`${styles.youtubebutton}`}
          opts={{
            playerVars: {
              controls: 0,
            },
          }}
        />
        <div onClick={onPlayHandler}>
          <div className={`${styles.videoBannerTextContainer}`}>
            {subHeading && (
              <p
                className={`${styles.videoBannerSubHeading} ${
                  isPlaying && styles.hiddencontext
                } sv-font-overrubrik-mellanstor`}
              >
                {subHeading}
              </p>
            )}

            <h2
              className={`sv-font-rubrik-1-stor-vit ${
                isPlaying && styles.hiddencontext
              }`}
            >
              {heading}
            </h2>
          </div>
          <button
            ref={playbtn}
            aria-label="spela video"
            id={`play-${videoLink}`}
            className={`${styles.playbutton}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M320-200v-560l440 280-440 280Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>Något gick fel med videolänken</div>
  );
};

App.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  videoLink: PropTypes.string,
};

export default App;
