export default function Header({ currentFeedInformation }: any) {
  return (
    <header className="w-full px-1 text-center text-gray-200 border-y-2 border-white">
      {currentFeedInformation && currentFeedInformation.title
        ? currentFeedInformation.title
        : "No feed selected"}
      &nbsp;&nbsp;&nbsp;
      {currentFeedInformation && currentFeedInformation.numberOfItems
        ? currentFeedInformation.numberOfItems + " " + "items "
        : ""}
    </header>
  );
}
