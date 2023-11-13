export default function Header({ headerFeedInformation }: any) {
  return (
    <header className="w-full px-1 text-center text-gray-200 border-y-2 border-white">
      {headerFeedInformation && headerFeedInformation.title
        ? headerFeedInformation.title
        : "No feed selected"}
      &nbsp;&nbsp;&nbsp;
      {headerFeedInformation && headerFeedInformation.numberOfItems
        ? headerFeedInformation.numberOfItems + " " + "items "
        : ""}
    </header>
  );
}
