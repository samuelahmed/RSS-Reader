export function createImageLoaderSet(selectedItem: any) {
  return new Set([
    selectedItem?.enclosure?.url,
    selectedItem?.["media:content"]?.url,
    selectedItem?.image?.url,
  ]);
}

export function checkIfContainsImage(
  htmlContent: string,
  imageUrls: string[]
): boolean {
  return imageUrls.some((url) => htmlContent.includes(url));
}
