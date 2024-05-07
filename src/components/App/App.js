import * as React from "react";
import PropTypes from "prop-types";
import styles from "./App.scss";
import ImageTeaser from "./TeaserImage/ImageTeaser";

const App = ({ articles, uselink }) => {
  // eslint-disable-next-line no-unused-vars
  const [teaserlist, setTeaserlist] = React.useState(articles);
  return (
    <section className={styles.teaserlist}>
      {teaserlist &&
        teaserlist.map((article) => {
          return (
            <ImageTeaser
              key={article.id}
              articleData={article}
              uselink={uselink}
            />
          );
        })}
    </section>
  );
};

App.propTypes = {
  articles: PropTypes.Array,
  uselink: PropTypes.string,
};

export default App;
