import xml2js from "xml2js";

function isYouTubeChannelURL(url) {
  return url.includes("youtube.com");
}

export async function GET(request) {
  try {
    let url = new URL(request.url).searchParams.get("feedUrl");

    // Validate the URL
    if (!url || url.trim() === "") {
      return new Response(JSON.stringify({ error: "URL is empty" }), {
        status: 400,
      });
    }

    // Add a nocache query parameter if the URL is not a YouTube channel URL
    if (!isYouTubeChannelURL(url)) {
      url = `${url}?nocache=${Date.now()}`;
    }

    const response = await fetch(url);

    // Check the status of the response
    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: `Fetch request failed with status ${response.status}`,
        }),
        {
          status: response.status,
        }
      );
    }

    const xmlData = await response.text();

    // Check if the feed is RDF
    const isRdf = xmlData.includes("<rdf:RDF");

    const jsonData = await xml2js.parseStringPromise(xmlData, {
      explicitArray: false,
      mergeAttrs: true,
    });

    // If the feed is RDF, handle the RDF structure
    if (isRdf) {
      // Handle the actual structure of the parsed RDF data
      if (jsonData['rdf:RDF']?.channel?.items?.['rdf:li'] && jsonData['rdf:RDF'].channel.items['rdf:li'].length > 100) {
        jsonData['rdf:RDF'].channel.items['rdf:li'] = jsonData['rdf:RDF'].channel.items['rdf:li'].slice(0, 100);
      }
      if (jsonData['rdf:RDF']?.item && jsonData['rdf:RDF'].item.length > 100) {
        jsonData['rdf:RDF'].item = jsonData['rdf:RDF'].item.slice(0, 100);
      }
    } else {
      // Handle RSS/Atom structure

      if (jsonData.feed?.entry && jsonData.feed.entry.length > 100) {
        jsonData.feed.entry = jsonData.feed.entry.slice(0, 100);
      } else if (
        jsonData.rss?.channel?.item &&
        jsonData.rss.channel.item.length > 100
      ) {
        jsonData.rss.channel.item = jsonData.rss.channel.item.slice(0, 100);
      }
    }
    console.log(jsonData);

    return new Response(JSON.stringify(jsonData));
  } catch (error) {
    // Log the entire error object
    console.error(error);
    // Return a response with the error message
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
