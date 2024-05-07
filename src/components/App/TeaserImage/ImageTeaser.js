import React from "react";
import PropTypes from "prop-types";
import styles from "./../App.scss";

const ImageTeaser = ({ articleData, uselink }) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mars",
    "Apr",
    "Maj",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Okt",
    "Nov",
    "Dec",
  ];
  let colorclass;
  if (articleData.imgTextColor === "Guld") {
    colorclass = `${styles.golden}`;
  } else if (articleData.imgTextColor === "Marinblå") {
    colorclass = `${styles.navyBlue}`;
  } else if (articleData.imgTextColor === "Krämvit") {
    colorclass = `${styles.creamWhite}`;
  }
  return (
    <article className={`${styles.imageteaser}`}>
      {articleData.iconURL ? (
        <div
          className={`${styles.teasericon}`}
          style={{ backgroundImage: `url( ${articleData.iconURL} )` }}
        ></div>
      ) : (
        <></>
      )}

      <div className={`${styles.imageteaserImage}`}>
        {articleData.year ? (
          <p className={`${styles.year} ` + colorclass}>{articleData.year}</p>
        ) : (
          <></>
        )}
        {articleData.date ? (
          <p className={`${styles.date} ` + colorclass}>
            {new Date(articleData.date).getDate()}{" "}
            {monthNames[new Date(articleData.date).getMonth()]}
          </p>
        ) : (
          <></>
        )}

        <img src={articleData.imageURI} alt={articleData.imageAlt} />
        {articleData.imageText ? (
          <span className={`${styles.imagetext} sv-font-bildtext`}>
            {articleData.imageText}
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className={`${styles.imageteaserBlock} env-block-secondary`}>
        <div className="env-m-bottom--x-large">
          {articleData.preHeading ? (
            <p className="sv-font-overrubrik-mellanstor env-m-bottom--x-small">
              {articleData.preHeading}
            </p>
          ) : (
            <></>
          )}

          <h2 className="sv-font-rubrik-1-guld env-m-bottom--x-small">
            {articleData.title}
          </h2>
          {articleData.preamble ? (
            <p className="sv-font-brodtext-vit">
              {articleData.URI && uselink === "uselink"
                ? `${articleData.preamble.substring(0, 500)}...`
                : articleData.preamble}
            </p>
          ) : (
            <></>
          )}
        </div>
        {articleData.URI && uselink === "uselink" ? (
          <a
            className={`${styles.imageteaserLink}`}
            href={articleData.URI}
            aria-label={`Länk till ${articleData.title}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
            </svg>
          </a>
        ) : (
          <></>
        )}

        {articleData.imageText ? (
          <span className={`${styles.imagetextMobile} sv-font-bildtext`}>
            {articleData.imageText}
          </span>
        ) : (
          <></>
        )}
      </div>
    </article>
  );
};

ImageTeaser.propTypes = {
  articleData: PropTypes.Array,
  uselink: PropTypes.string,
};

export default ImageTeaser;
