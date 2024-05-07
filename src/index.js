import * as React from "react";
import { renderToString } from "react-dom/server";
import router from "@sitevision/api/common/router";
import appData from "@sitevision/api/server/appData";
import App from "./components/App";
import i18n from "@sitevision/api/common/i18n";
import restApi from "@sitevision/api/server/RestApi";
import properties from "@sitevision/api/server/Properties";
import resourceLocatorUtil from "@sitevision/api/server/ResourceLocatorUtil";
//import metadataUtil from "@sitevision/api/server/MetadataUtil";

const archiveData = appData.get("selectArchive");
const uselink = appData.get("selectIfLink");

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

  //getting articles as list
  result = restApi.get(appData.getNode("selectArchive"), "headless", {
    properties: ["*"],
    includes: ["sv:article"],
  });

  if (
    result.statusMessage === 400 ||
    result.statusMessage === 401 ||
    result.statusMessage === 500
  ) {
    res.send(`<span>${result.statusMessage}</span>`);
  }

  const articlesData = result.body;
  const articles = [];
  articlesData?.nodes?.map((a) => {
    const pageNode = resourceLocatorUtil.getNodeByIdentifier(a.id);
    const preHeading = properties.get(pageNode, "sv-pagePreheaderForList");
    const year = properties.get(pageNode, "year");
    const fullDate = properties.get(pageNode, "date");
    const imgTextColor = properties.get(pageNode, "chooseColor");
    const teaserIcon = properties.get(pageNode, "pageBackgroundImage");
    const iconURL = properties.get(teaserIcon, "URI");
    const imageText = properties.get(pageNode, "imageText");

    articles.push({
      id: a?.id,
      title: a?.properties["SV.Title"],
      preamble: a?.properties["SV.Description"],
      URI: a?.properties["URI"],
      imageURI: a?.properties["SV.Image"]?.properties["URI"],
      imageAlt: a?.properties["SV.Image"]?.properties["alt"],
      preHeading: preHeading,
      year: year,
      date: fullDate,
      imgTextColor: imgTextColor,
      iconURL: iconURL,
      imageText: imageText,
    });
  });

  const data = { articles, uselink };
  const html = renderToString(<App {...data} />);

  res.agnosticRender(html, data);
});
