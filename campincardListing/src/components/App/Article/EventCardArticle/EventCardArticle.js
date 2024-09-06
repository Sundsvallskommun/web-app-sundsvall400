import React from "react";
import PropTypes from "prop-types";
import styles from "../../App.scss";

const EventCardArticle = ({ articleData }) => {
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
  const weekdays = ["Sön", "Mån", "Tis", "Ons", "Tors", "Fre", "Lör"];
  let hour = new Date(articleData.eventDate).getHours();
  hour < 10 ? "0" + hour : hour;
  let minutes = new Date(articleData.eventDate).getMinutes();
  minutes < 10 ? (minutes = "0" + minutes) : minutes;

  const time = `${hour}.${minutes}`;

  return (
    <article className={`${styles.eventarticle} ${styles.art}`}>
      <a href={articleData.URI}>
        <div className={`${styles.datetag}`}>
          <p className="sv-font-liten-overliggare-vit">
            <strong className="sv-font-liten-overliggare-guld">
              {new Date(articleData.eventDate).getDate()}
            </strong>
            {monthNames[new Date(articleData.eventDate).getMonth()]}
          </p>
        </div>
        <div className={`${styles.imgbox}`}>
          <img src={articleData.imageURI} alt={articleData.imageAlt} />
        </div>
        <div className={`${styles.eventinfo}`}>
          <h2 className="sv-font-rubrik-2-event">{articleData.title}</h2>
          <div className={`${styles.timelocation}`}>
            <span className="sv-font-liten-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
              </svg>
              {weekdays[new Date(articleData.eventDate).getDay()]}{" "}
              {new Date(articleData.eventDate).getDate()}{" "}
              {monthNames[new Date(articleData.eventDate).getMonth()]}{" "}
              {new Date(articleData.eventDate).getFullYear()}
            </span>
            <span className="sv-font-liten-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
              </svg>
              {time}
            </span>
            <span className="sv-font-liten-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M480-301q99-80 149.5-154T680-594q0-56-20.5-95.5t-50.5-64Q579-778 544-789t-64-11q-29 0-64 11t-65 35.5q-30 24.5-50.5 64T280-594q0 65 50.5 139T480-301Zm0 101Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520ZM200-80v-80h560v80H200Zm280-514Z" />
              </svg>
              {articleData.eventLocation}
            </span>
          </div>
          <div className={`${styles.gotoarrow}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#F6F6F2"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
            </svg>
          </div>
        </div>
      </a>
    </article>
  );
};
EventCardArticle.propTypes = {
  articleData: PropTypes.array,
};

export default EventCardArticle;
