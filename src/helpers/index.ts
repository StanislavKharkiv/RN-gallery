export function cutText(
  text: string,
  maxLength: number | undefined = 22,
): string {
  if (text?.length < maxLength) return text;
  var trimmedText = text.substring(0, maxLength);
  return `${text.substring(0, trimmedText.lastIndexOf(' '))}...`;
}
