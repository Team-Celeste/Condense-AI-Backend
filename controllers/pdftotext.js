const pdfjsLib = require("pdfjs-dist");

const getPageText = async (pdf, pageNo) => {
    const page = await pdf.getPage(pageNo);
    const tokenizedText = await page.getTextContent();
    const pageText = tokenizedText.items.map(token => token.str).join("");
    return pageText;
};

async function GetTextFromPDF(path) {
    let doc = await pdfjsLib.getDocument(path).promise;

    let count = doc.numPages;
    const promise = [];
    for (let i = 1; i <= count; i++) {
        promise.push(getPageText(doc, i));
    }
    const texts = await Promise.all(promise);
    return texts.join("\n");
}

module.exports = { GetTextFromPDF }