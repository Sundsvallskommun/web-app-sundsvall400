import React from "react";
import PropTypes from "prop-types";
import styles from "../../App.scss";

const RectangleCardArticle = ({ articleData, bottomTag }) => {
  return (
    <article className={`${styles.rectanglearticle} ${styles.art}`}>
      <a href={articleData.URI}>
        <div className={`${styles.imgbox}`}>
          <img src={articleData.imageURI} alt={articleData.imageAlt} />
        </div>
        <div className={`${styles.bottominfo}`}>
          <div className={`${styles.gotoarrow}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
            </svg>
          </div>

          <h2 className="sv-font-rubrik-2-medium-vit">{articleData.title}</h2>
          {bottomTag ? (
            <p className="sv-font-liten-overliggare-guld">{bottomTag}</p>
          ) : (
            <></>
          )}
        </div>
      </a>
    </article>
  );
};

RectangleCardArticle.propTypes = {
  articleData: PropTypes.array,
  bottomTag: PropTypes.string,
};

export default RectangleCardArticle;
