export default function useAllItems(serverData: any) {

  const allItems =
    serverData?.feed?.entry ||
    serverData?.rss?.channel?.item ||
    serverData?.rdf?.item ||
    [];
    
  return allItems;
}
