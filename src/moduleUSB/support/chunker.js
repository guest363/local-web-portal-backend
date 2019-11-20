const chunker = (usbArray, chunkNumber, filterParam) => {
    if (usbArray === void 0) return [{}];
    const init = usbArray[0];
    const noCopyArray = usbArray.reduce((acc, item) => {
        const pastID = acc[acc.length - 1].USBnameSave;
        const fio = item.username;
        const difTime = new Date(item.mountTime) - new Date(acc[acc.length - 1].mountTime);
        const curID = item.USBnameSave;
        if ((pastID === curID && difTime < 90000) || fio < 1) {
            return acc
        }
        return [...acc, item];
    }, [init])
    const chunks = [];
    let allElements;
    if (filterParam === 'none') {
        allElements = noCopyArray.reverse();
    } else {
        allElements = noCopyArray.reverse().sort((a, b) => {
            if (a[filterParam] > b[filterParam]) return 1;
            if (a[filterParam] < b[filterParam]) return -1;
            return 0;
        });
    }
    const maxElementsOnPage = 50;
    const elementsCount = noCopyArray.length;
    const pages = Math.ceil(elementsCount / maxElementsOnPage);
    for (let i = 0; i < pages; i++) {
        let elemChunck;
        if (i === 0) {
            elemChunck = [...allElements.slice(0, maxElementsOnPage)];
        } else {
            elemChunck = [...allElements.slice(i * maxElementsOnPage, (i + 1) * maxElementsOnPage)];
        }
        chunks.push(elemChunck);
    }
    return { chunk: chunks[chunkNumber], pages: chunks.length};
}
module.exports = chunker;