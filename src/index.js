import * as React from "react";
import { renderToString } from "react-dom/server";
import router from "@sitevision/api/common/router";
import appData from "@sitevision/api/server/appData";
import App from "./components/App";
import i18n from "@sitevision/api/common/i18n";
import properties from "@sitevision/api/server/Properties";

router.get("/", (req, res) => {
  const heading = appData.get("heading");
  const subHeading = appData.get("subHeading");
  const videoLink = appData.get("videoLink");
  const fallbackImage = appData.get("fallbackImage");

  const fallbackImageURI = properties.get(fallbackImage, "URI");

  // check archive
  if (!videoLink) {
    res.send(
      `<span class="env-badge env-badge--danger">${i18n.get(
        "configureModule"
      )}</span>`
    );
  }

  const data = { heading, subHeading, videoLink, fallbackImageURI };
  const html = renderToString(<App {...data} />);

  res.agnosticRender(html, data);
});
