import * as React from "react";
import { renderToString } from "react-dom/server";
import router from "@sitevision/api/common/router";
import App from "./components/App";
import i18n from "@sitevision/api/common/i18n";
import requester from "@sitevision/api/server/Requester";
import appData from "@sitevision/api/server/appData";

const accesstoken = appData.get("accesstoken");
const mediaUrl = `https://graph.instagram.com/me/media?fields=id,username,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=4&access_token=${accesstoken}`;

router.get("/", (req, res) => {
  let instaData;
  if (!accesstoken) {
    res.send(
      `<span class="env-badge env-badge--danger">${i18n.get(
        "configureModule"
      )}</span>`
    );
  } else {
    requester.get(mediaUrl, { limit: 4 }).done((result) => {
      if (result.data) {
        instaData = result.data;
      } else {
        res.send(`<span>Något gick fel med applikationen</span>`);
      }
    });
  }

  const data = { instaData };

  const html = renderToString(<App {...data} />);

  res.agnosticRender(html, data);
});
