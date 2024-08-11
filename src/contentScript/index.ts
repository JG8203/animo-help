function getElementByXPath(xpath: string): Element | null {
    const results = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
    let result = results.iterateNext();
    if (result) {
        console.log('Element found:', result);
        return result as Element;
    }
    return null;
}

const xpath = "/html/body/div/main/div/section/section[2]/h2";
const element = getElementByXPath(xpath);

chrome.runtime.sendMessage({
    type: 'REQUEST_REMAINING_TIME',
    elementText: element ? element.textContent : null
});
