// const url = `https://hnrss.org/frontpage?nocache=${Date.now()}`;
// const url = `https://hn.invades.space/hn_gems_rss.xml?nocache=${Date.now()}`;
// const url =  `https://hnrss.org/classic?nocache=${Date.now()}`; // HN Classic - only votes from acc from pre 2008
// const url =  `https://hnrss.org/best?nocache=${Date.now()}`; // HN Best -
// https://news.ycombinator.com/item?id=36617799 - good source of rss feeds
// "https://photojournal.jpl.nasa.gov/rss/new"
// "https://photojournal.jpl.nasa.gov/rss/targetFamily/Earth"
// 'https://feeds.npr.org/500005/podcast.xml'
// 'https://www.youtube.com/feeds/videos.xml?channel_id=UCz8QaiQxApLq8sLNcszYyJw'
// 'https://feeds.npr.org/500005/podcast.xml'
// 'https://feeds.bbci.co.uk/news/video_and_audio/world/rss.xml#'
// "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml"

// const hardCodedURL = `https://rss.nytimes.com/services/xml/rss/nyt/Business.xml?nocache=${Date.now()}`;


import xml2js from "xml2js";

let urlStorage = { url: 'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml' };

export async function PUT(request) {
  try {
    const data = await request.json();

    if (data && typeof data.url === 'string') {
      urlStorage.url = data.url;
      return new Response('URL updated successfully', { status: 200 });
    } else {
      return new Response('Invalid input data', { status: 400 });
    }
  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  }
}

export async function GET() {
  // let url = hardCodedURL;
  const url = urlStorage.url;
  const response = await fetch(url);
  const xmlData = await response.text();
  const jsonData = await xml2js.parseStringPromise(xmlData, {
    explicitArray: false,
    mergeAttrs: true,
  });

  return new Response(JSON.stringify(jsonData));
}




// const url = `https://hnrss.org/frontpage?nocache=${Date.now()}`;
// const url = `https://hn.invades.space/hn_gems_rss.xml?nocache=${Date.now()}`;
// const url =  `https://hnrss.org/classic?nocache=${Date.now()}`; // HN Classic - only votes from acc from pre 2008
// const url =  `https://hnrss.org/best?nocache=${Date.now()}`; // HN Best -
// https://news.ycombinator.com/item?id=36617799 - good source of rss feeds

// "https://photojournal.jpl.nasa.gov/rss/new"
// "https://photojournal.jpl.nasa.gov/rss/targetFamily/Earth"
// 'https://feeds.npr.org/500005/podcast.xml'
// 'https://www.youtube.com/feeds/videos.xml?channel_id=UCz8QaiQxApLq8sLNcszYyJw'
// 'https://feeds.npr.org/500005/podcast.xml'
// 'https://feeds.bbci.co.uk/news/video_and_audio/world/rss.xml#'
// "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml"

//     11/2/2023 2:02:10 AM - 10 hours ago

// Is Adidas’ $500 Marathon Shoe Worth It?

// 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'
