import xml2js from "xml2js";

export async function GET() {
  const response = await fetch(
    // "https://photojournal.jpl.nasa.gov/rss/new"
    // "https://photojournal.jpl.nasa.gov/rss/targetFamily/Earth"
    // 'https://feeds.npr.org/500005/podcast.xml'
    // 'https://www.youtube.com/feeds/videos.xml?channel_id=UCz8QaiQxApLq8sLNcszYyJw'
    // 'https://feeds.npr.org/500005/podcast.xml'
    // 'https://feeds.bbci.co.uk/news/video_and_audio/world/rss.xml#'
    "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml"
  );
  const xmlData = await response.text();
  const jsonData = await xml2js.parseStringPromise(xmlData, {
    explicitArray: false,
    mergeAttrs: true,
  });

  return new Response(JSON.stringify(jsonData));
}
