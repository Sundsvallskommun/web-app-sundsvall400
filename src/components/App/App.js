import * as React from "react";
import PropTypes from "prop-types";
import RectangleCardArticle from "./Article/RectangleCardArticle/RectangleCardArticle";
import SquareCardArticle from "./Article/SquareCardArticle/SquareCardArticle";
import styles from "./App.scss";
import { useRef } from "react";
import EventCardArticle from "./Article/EventCardArticle";
import InfiniteScroll from "react-infinite-scroll-component";
import { Oval } from "react-loader-spinner";
import slideBlueArrow from "./icon/slideBlueArrow.png";
import slidearrow from "./icon/slideArrow.png";

const App = ({ articles, typeOfCard, typeOfList, bottomTag }) => {
  // eslint-disable-next-line no-unused-vars
  const [initialArticles, setinitialArticles] = React.useState(
    typeOfCard === "event"
      ? articles.sort((a, b) => a.eventDate - b.eventDate) &&
          articles.filter((art) => {
            if (new Date(art.eventEndDate) < new Date()) {
              return false;
            }
            return new Date(art.eventEndDate) >= new Date();
          })
      : articles
  );

  const [feed, setFeed] = React.useState(
    typeOfCard === "event"
      ? initialArticles.slice(0, 8)
      : initialArticles.slice(0, 6)
  );
  const [hasMore, setHasMore] = React.useState(true);
  const [scrollEnd, setScrollEnd] = React.useState();
  const [articleWidth, setArticleWidth] = React.useState();

  const scrollbox = useRef(null);

  React.useEffect(() => {
    // eslint-disable-next-line no-undef
    setScrollEnd(document.getElementById(`scrollend-${feed[0].id}`));
    setArticleWidth(
      // eslint-disable-next-line no-undef
      document.querySelector(`article.${styles.art}`).getBoundingClientRect()
        .width
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleInWindow = (value) => {
    const item = value.getBoundingClientRect();
    return (
      // eslint-disable-next-line no-undef
      item.right < (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const scrollLeft = () => {
    if (visibleInWindow(scrollEnd)) {
      scrollbox.current.scrollTo({
        top: 0,
        left: scrollbox.current.offsetLeft,
        behavior: "smooth",
      });
      // console.log(scrollbox.current.offsetLeft);
    } else {
      scrollbox.current.scrollBy({
        top: 0,
        left: +articleWidth + 20,
        behavior: "smooth",
      });
    }
  };

  const fetchMoreData = () => {
    if (feed.length === initialArticles.length) {
      setHasMore(false);
      return;
    }

    // eslint-disable-next-line no-undef
    setTimeout(() => {
      if (typeOfCard === "event") {
        setFeed(
          feed.concat(initialArticles.slice(feed.length, feed.length + 8))
        );
      } else {
        setFeed(
          feed.concat(initialArticles.slice(feed.length, feed.length + 6))
        );
      }
    }, 2000);
  };

  return typeOfList === "listfeed" ? (
    <div className={`${styles.campaignlist}`}>
      <div>
        <InfiniteScroll
          dataLength={feed.length}
          next={fetchMoreData}
          hasMore={hasMore}
          scrollThreshold={0.7}
          className={`${typeOfCard === "rectangle" && styles.rectangles} ${
            typeOfCard === "square" && styles.squares
          }
          ${typeOfCard === "event" && styles.events}`}
          loader={
            <div className={`${styles.loader}`}>
              <Oval
                height={40}
                width={40}
                color="#d49433"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#dcb478"
                strokeWidth={8}
                strokeWidthSecondary={7}
              />
            </div>
          }
          endMessage={
            <p
              className={`sv-font-liten-overliggare-guld ${styles.endMessage}`}
            >
              Inga fler artiklar finns
            </p>
          }
        >
          {feed &&
            feed.map((article) => {
              return typeOfCard === "rectangle" ? (
                <RectangleCardArticle
                  key={article.id}
                  articleData={article}
                  bottomTag={bottomTag}
                />
              ) : (
                <>
                  {typeOfCard === "square" && (
                    <SquareCardArticle key={article.id} articleData={article} />
                  )}
                  {typeOfCard === "event" &&
                    new Date(article.eventEndDate) >= new Date() && (
                      <EventCardArticle
                        key={article.id}
                        articleData={article}
                      />
                    )}
                </>
              );
            })}
        </InfiniteScroll>
      </div>
    </div>
  ) : (
    <div className={`${styles.view}`}>
      <div ref={scrollbox} className={`${styles.slideshowview}`}>
        <div className={`${styles.slideshowlist}`}>
          {feed &&
            feed.map((article) => {
              return typeOfCard === "rectangle" ? (
                <RectangleCardArticle
                  key={article.id}
                  articleData={article}
                  bottomTag={bottomTag}
                />
              ) : (
                <>
                  {typeOfCard === "square" && (
                    <SquareCardArticle key={article.id} articleData={article} />
                  )}
                  {typeOfCard === "event" &&
                    new Date(article.eventDate) >= new Date() && (
                      <EventCardArticle
                        key={article.id}
                        articleData={article}
                      />
                    )}
                </>
              );
            })}
          <div className={`${styles.scrollend}`}></div>
          <div
            className={`${styles.scrollend}`}
            id={`scrollend-${feed[0].id}`}
          ></div>
        </div>
      </div>
      <div
        className={`${
          typeOfCard !== "event"
            ? styles.slidebuttonwrapper
            : styles.slideEventbuttonwrapper
        }`}
      >
        <div className={`${styles.slidebuttonbox}`}>
          <button
            onClick={scrollLeft}
            aria-label="slide till nästa artikel"
            className={`${styles.slidearrow}`}
          >
            {typeOfCard === "event" ? (
              <img src={slideBlueArrow} alt="slide pil till höger" />
            ) : (
              <img src={slidearrow} alt="slide pil till höger" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  articles: PropTypes.array,
  typeOfCard: PropTypes.string,
  typeOfList: PropTypes.string,
  bottomTag: PropTypes.string,
};
export default App;
