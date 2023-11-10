import xml2js from "xml2js";

function isYouTubeChannelURL(url) {
  return url.includes("youtube.com");
}

export async function GET(request) {
  let url = new URL(request.url).searchParams.get("feedUrl");

  if (!isYouTubeChannelURL(url)) {
    url = `${url}?nocache=${Date.now()}`;
  }

  console.log(url);
  const response = await fetch(url);
  const xmlData = await response.text();
  const jsonData = await xml2js.parseStringPromise(xmlData, {
    explicitArray: false,
    mergeAttrs: true,
  });

  // Limit the number of items to 100
  if (jsonData.feed?.entry && jsonData.feed.entry.length > 100) {
    jsonData.feed.entry = jsonData.feed.entry.slice(0, 100);
  } else if (
    jsonData.rss?.channel?.item &&
    jsonData.rss.channel.item.length > 100
  ) {
    jsonData.rss.channel.item = jsonData.rss.channel.item.slice(0, 100);
  }

  return new Response(JSON.stringify(jsonData));
}
