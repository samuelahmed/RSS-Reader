import xml2js from "xml2js";

const url = `https://rss.nytimes.com/services/xml/rss/nyt/Business.xml?nocache=${Date.now()}`;
// const url = `https://hnrss.org/frontpage?nocache=${Date.now()}`;
// const url = `https://hn.invades.space/hn_gems_rss.xml?nocache=${Date.now()}`; 
// const url =  `https://hnrss.org/classic?nocache=${Date.now()}`; // HN Classic - only votes from acc from pre 2008
// const url =  `https://hnrss.org/best?nocache=${Date.now()}`; // HN Best - 
// https://news.ycombinator.com/item?id=36617799 - good source of rss feeds

export async function GET() {
  const response = await fetch(
    // "https://photojournal.jpl.nasa.gov/rss/new"
    // "https://photojournal.jpl.nasa.gov/rss/targetFamily/Earth"
    // 'https://feeds.npr.org/500005/podcast.xml'
    // 'https://www.youtube.com/feeds/videos.xml?channel_id=UCz8QaiQxApLq8sLNcszYyJw'
    // 'https://feeds.npr.org/500005/podcast.xml'
    // 'https://feeds.bbci.co.uk/news/video_and_audio/world/rss.xml#'
    // "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml"
    url
 
//     11/2/2023 2:02:10 AM - 10 hours ago

// Is Adidas’ $500 Marathon Shoe Worth It?


    // 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'
  );
  const xmlData = await response.text();
  const jsonData = await xml2js.parseStringPromise(xmlData, {
    explicitArray: false,
    mergeAttrs: true,
  });

  return new Response(JSON.stringify(jsonData));
}
