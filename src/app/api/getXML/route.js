import xml2js from "xml2js";

function isYouTubeChannelURL(url) {
  return url.includes("youtube.com");
}

let urlStorage = {
  url: "",
};

export async function PUT(request) {
  try {
    const data = await request.json();
    if (data && typeof data.url === "string") {
      if (isYouTubeChannelURL(data.url)) {
        urlStorage.url = data.url;
      } else {
        urlStorage.url = `${data.url}?nocache=${Date.now()}`;
      }
      return new Response("URL updated successfully", { status: 200 });
    } else {
      return new Response("Invalid input data", { status: 400 });
    }
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}





export async function GET() {
  const url = urlStorage.url;
  const response = await fetch(url);
  const xmlData = await response.text();
  const jsonData = await xml2js.parseStringPromise(xmlData, {
    explicitArray: false,
    mergeAttrs: true,
  });

  // Limit the number of items to 100
  if (jsonData.feed?.entry && jsonData.feed.entry.length > 100) {
    jsonData.feed.entry = jsonData.feed.entry.slice(0, 100);
  } else if (jsonData.rss?.channel?.item && jsonData.rss.channel.item.length > 100) {
    jsonData.rss.channel.item = jsonData.rss.channel.item.slice(0, 100);
  }
  
  return new Response(JSON.stringify(jsonData));
}
