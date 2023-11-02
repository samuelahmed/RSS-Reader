import Parser from "rss-parser";

export default async function FetchRSSData( feedURL: any) {
  //   let Parser = require("rss-parser");

  console.log(feedURL, 'feedURL ON SERVER');
  let parser = new Parser();


  let feed = await parser.parseURL(
    "https://feeds.bbci.co.uk/news/video_and_audio/world/rss.xml"
  );
//   console.log(feed.title);

//   feed.items.forEach((item) => {
//     console.log(item.title + ":" + item.link);
//   });

//   console.log(feed.items);
  return (
    <>
      {feed.items.map((item) => (
        <div key={item.link}>
          <h1>{item.title}</h1>
          <p>{item.link}</p>
        </div>
      ))}
    </>
  );
}
