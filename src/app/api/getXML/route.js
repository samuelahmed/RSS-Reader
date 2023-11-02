import Parser from "rss-parser";

export async function GET() {
  const parser = new Parser();
  const jsonData = await parser.parseURL(
    "https://feeds.bbci.co.uk/news/video_and_audio/world/rss.xml"
  );

  console.log(jsonData);

  return new Response(JSON.stringify(jsonData));

}
