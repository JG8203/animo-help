function extractTime(htmlText: string) {
  const text = htmlText.replace(/<[^>]*>/g, '');
  const hourPattern = /(\d+)\s*hour/;
  const minutePattern = /(\d+)\s*minute/;
  const hoursMatch = hourPattern.exec(text);
  const minutesMatch = minutePattern.exec(text);

  return {
    hours: hoursMatch ? parseInt(hoursMatch[1], 10) : 0,
    minutes: minutesMatch ? parseInt(minutesMatch[1], 10) : 0
  };
}

console.log('background is running');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'REQUEST_REMAINING_TIME') {
    const timeObject = extractTime(request.elementText);
    sendResponse({ type: 'REMAINING_TIME_RESPONSE', timeObject: timeObject });
    console.log("response sent.")
  }
});
