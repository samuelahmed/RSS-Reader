import { useEffect } from "react";
import { ServerData } from "../utils/types";

export default function useUpdateHeaderFeedInfo(
  serverData: ServerData | null,
  setHeaderFeedInformation: any
) {
  
  useEffect(() => {
    setHeaderFeedInformation((current: any) => ({
      ...current,
      numberOfItems: Math.max(
        serverData?.rss?.channel?.item?.length || 0,
        serverData?.feed?.entry?.length || 0
      ),
    }));
  }, [serverData]);

  return serverData;
}
