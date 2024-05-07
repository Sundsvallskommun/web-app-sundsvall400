import * as React from "react";
import { renderToString } from "react-dom/server";
import router from "@sitevision/api/common/router";
import appData from "@sitevision/api/server/appData";
import App from "./components/App";
import i18n from "@sitevision/api/common/i18n";
import restApi from "@sitevision/api/server/RestApi";
import resourceLocatorUtil from "@sitevision/api/server/ResourceLocatorUtil";
import properties from "@sitevision/api/server/Properties";

const archiveData = appData.get("selectArchive");
const typeOfCard = appData.get("selectCardType");
const typeOfList = appData.get("selectListType");
const maxArticles = appData.get("select");
const bottomTag = appData.get("bottomTag");

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
    //getting articles as lslideshow - limited articles
    result = restApi.get(appData.getNode("selectArchive"), "headless", {
      limit: maxArticles,
      properties: ["*"],
      includes: ["sv:article"],
    });
  }

  if (
    result.statusMessage === 400 ||
    result.statusMessage === 500 ||
    result.statusMessage === 401
  ) {
    res.send(`<span>${result.statusMessage}</span>`);
  }

  const articlesData = result.body;

  const articles = [];
  articlesData?.nodes?.map((a) => {
    const pageNode = resourceLocatorUtil.getNodeByIdentifier(a.id);
    const eventdate = properties.get(pageNode, "sv-startDate");
    const eventEndDate = properties.get(pageNode, "sv-endDate");
    const eventLocation = properties.get(pageNode, "sv-location");
    const eventLink = properties.get(pageNode, "eventLink");

    articles.push({
      id: a?.id,
      title: a?.properties["SV.Title"],
      URI: typeOfCard === "event" ? eventLink : a?.properties["URI"],
      imageURI: a?.properties["SV.Image"]?.properties["URI"],
      imageAlt: a?.properties["SV.Image"]?.properties["alt"],
      eventDate: eventdate,
      eventEndDate: eventEndDate,
      eventLocation: eventLocation,
    });
  });

  const data = { articles, typeOfCard, typeOfList, bottomTag };
  const html = renderToString(<App {...data} />);

  res.agnosticRender(html, data);
});
