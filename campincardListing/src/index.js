import * as React from "react";
import { renderToString } from "react-dom/server";
import router from "@sitevision/api/common/router";
import appData from "@sitevision/api/server/appData";
import App from "./components/App";
import i18n from "@sitevision/api/common/i18n";
import restApi from "@sitevision/api/server/RestApi";
import resourceLocatorUtil from "@sitevision/api/server/ResourceLocatorUtil";
import properties from "@sitevision/api/server/Properties";
import propertyUtil from "@sitevision/api/server/PropertyUtil"
import indexUtil from "@sitevision/api/server/IndexUtil";
import nodeIndexType from "@sitevision/api/server/IndexUtil.IndexType.NODE";

const archiveData = appData.get("selectArchive");
const typeOfCard = appData.get("selectCardType");
const typeOfList = appData.get("selectListType");
const maxArticles = appData.get("maxArticles");
const bottomTag = appData.get("bottomTag");
const index = indexUtil.getDefaultIndex(nodeIndexType)

const archiveType = propertyUtil.getString(
  appData.getNode("selectArchive"),
  "archiveType"
);

router.get("/", (req, res) => {
  let result;
  // check archive
  if (!archiveData) {
    res.send(
      `<span class="env-badge env-badge--danger">${i18n.get(
        "configureModule"
      )}</span>`
    );
  }

  if (typeOfList === "listfeed") {
    //getting articles as list
    result = restApi.get(appData.getNode("selectArchive"), "headless", {
      properties: ["*"],
      includes: ["sv:article"],
    });
  } else {
    //getting articles as slideshow - limited articles

    // only events should get 'metadata.date.sv-startDate:[NOW TO *]'
    const getFilterQuery = () => {
      if (archiveType === "Nyhet") {
        return `+path:${archiveData} AND svtype:article`;
      }

      return `+path:${archiveData} AND svtype:article AND +metadata.date.sv-startDate:[NOW TO *]`;
    };
    const filterQuery = getFilterQuery();

    result = restApi.get(index, "search", {
      query: "*",
      limit: maxArticles,
      filterQuery: filterQuery,
      fields: ["*"],
      sortFields: [{ name: "metadata.date.sv-startDate", desc: false }],
    });
  }

  if (
    result.statusMessage === 400 ||
    result.statusMessage === 500 ||
    result.statusMessage === 401
  ) {
    res.send(`<span>${result.statusMessage}</span>`);
  }

  const getArticleData = (articlesData) => {
    return articlesData.map((a) => {
      const pageNode = resourceLocatorUtil.getNodeByIdentifier(a.id);
      const eventDate = properties.get(pageNode, "sv-startDate");
      const eventEndDate = properties.get(pageNode, "sv-endDate");
      const eventLocation = properties.get(pageNode, "sv-location");
      const eventLink = properties.get(pageNode, "eventLink");
      const title = properties.get(pageNode, "SV.Title");
      const URI =
        typeOfCard === "event" ? eventLink : properties.get(pageNode, "URI");
      const imageURI = propertyUtil.getNestedString(
        pageNode,
        "SV.Image",
        "URI"
      );
      const imageAlt = propertyUtil.getNestedString(
        pageNode,
        "SV.Image",
        "alt"
      );

      return {
        id: a.id,
        title,
        URI,
        imageURI,
        imageAlt,
        eventDate,
        eventEndDate,
        eventLocation,
      };
    });
  };

  const articleData =
    typeOfList === "listfeed" ? result.body.nodes : result.body;
  
  const articles = getArticleData(articleData);

  const data = { articles, typeOfCard, typeOfList, bottomTag };
  const html = renderToString(<App {...data} />);

  res.agnosticRender(html, data);
});
