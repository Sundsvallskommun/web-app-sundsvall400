import * as React from "react";
import PropTypes from "prop-types";
import styles from "./App.scss";

const App = ({ instaData }) => {
  // eslint-disable-next-line no-unused-vars
  const [instaGallery, setInstaGallery] = React.useState(instaData);
  React.useEffect(() => {
    instaGallery.sort((a, b) => a.timestamp - b.timestamp);
  }, []);
  return (
    <>
      {/* För desktopvy */}
      <section className={`${styles.instagalleryDesktop}`}>
        <article
          key={`post-${instaGallery[0].id}`}
          className={`${styles.biginsta} ${styles.instaArticle}`}
        >
          <a
            className={`${styles.instalink}`}
            href={instaGallery[0].permalink}
            aria-labelledby={`img-${instaGallery[0].id}`}
          >
            <img
              id={`img-${instaGallery[0].id}`}
              src={
                instaGallery[0].media_type !== "VIDEO"
                  ? instaGallery[0].media_url
                  : instaGallery[0].thumbnail_url
              }
              alt={`Länk till inlägg av ${
                instaGallery[0].username
              } utlagd ${new Date(instaGallery[0].timestamp).toDateString()}`}
            />
          </a>
        </article>
        <div className={`${styles.pairOfPosts}`}>
          <article
            key={`post-${instaGallery[1].id}`}
            className={`${styles.smallinsta} ${styles.instaArticle}`}
          >
            <a
              className={`${styles.instalink}`}
              href={instaGallery[1].permalink}
              aria-labelledby={`img-${instaGallery[1].id}`}
            >
              <img
                id={`img-${instaGallery[1].id}`}
                src={
                  instaGallery[1].media_type !== "VIDEO"
                    ? instaGallery[1].media_url
                    : instaGallery[1].thumbnail_url
                }
                alt={`Länk till inlägg av ${
                  instaGallery[1].username
                } utlagd ${new Date(instaGallery[1].timestamp).toDateString()}`}
              />
            </a>
          </article>
          <article
            key={`post-${instaGallery[2].id}`}
            className={`${styles.smallinsta} ${styles.instaArticle}`}
          >
            <a
              className={`${styles.instalink}`}
              href={instaGallery[2].permalink}
              aria-labelledby={`img-${instaGallery[0].id}`}
            >
              <img
                id={`img-${instaGallery[2].id}`}
                src={
                  instaGallery[2].media_type !== "VIDEO"
                    ? instaGallery[2].media_url
                    : instaGallery[2].thumbnail_url
                }
                alt={`Länk till inlägg av ${
                  instaGallery[2].username
                } utlagd ${new Date(instaGallery[2].timestamp).toDateString()}`}
              />
            </a>
          </article>
        </div>
        <div className={`${styles.mediuminstaBox}`}>
          <article
            key={`post-${instaGallery[3].id}`}
            className={`${styles.mediuminsta} ${styles.instaArticle}`}
          >
            <a
              className={`${styles.instalink}`}
              href={instaGallery[3].permalink}
              aria-labelledby={`img-${instaGallery[0].id}`}
            >
              <img
                id={`img-${instaGallery[3].id}`}
                src={
                  instaGallery[3].media_type !== "VIDEO"
                    ? instaGallery[3].media_url
                    : instaGallery[3].thumbnail_url
                }
                alt={`Länk till inlägg av ${
                  instaGallery[3].username
                } utlagd ${new Date(instaGallery[3].timestamp).toDateString()}`}
              />
            </a>
          </article>
        </div>
      </section>
      {/* För mobilvy */}
      <section className={`${styles.instagalleryMobile}`}>
        {instaGallery.map((post) => {
          return (
            <article
              key={`slidepost-${post.id}`}
              className={`${styles.slideitem} ${styles.instaArticle}`}
            >
              <a
                className={`${styles.instalink}`}
                href={post.permalink}
                aria-labelledby={`slideimg-${post.id}`}
              >
                <img
                  id={`slideimg-${post.id}`}
                  src={
                    post.media_type !== "VIDEO"
                      ? post.media_url
                      : post.thumbnail_url
                  }
                  alt={`Länk till inlägg av ${post.username} utlagd ${new Date(
                    post.timestamp
                  ).toDateString()}`}
                />
              </a>
            </article>
          );
        })}
      </section>
    </>
  );
};

App.propTypes = {
  instaData: PropTypes.array,
};

export default App;
