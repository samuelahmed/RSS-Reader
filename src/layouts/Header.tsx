export default function Header({ currentFeedInformation }: any) {
  console.log(currentFeedInformation, "currentFeedInformation IN HEADER");
  return (
    <header className="w-full px-1 text-center text-white border-b-2 border-white">


{currentFeedInformation && currentFeedInformation.title ? currentFeedInformation.title : 'No feed selected'}

    </header>
  );
}
