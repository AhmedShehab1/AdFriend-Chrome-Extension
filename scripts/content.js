(async () => {


    const fallbackQuotes = [
        "Believe you can and you're halfway there.",
        "The only way to do great work is to love what you do.",
        "Don’t watch the clock; do what it does. Keep going.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts."
    ];

    const getRandomQuote = async () => {

        const result = await chrome.storage.local.get('quotes');
        const quotes = result.quotes || [];
        console.log('quotes from chrome.get', quotes);
        return quotes.length > 0 ? quotes[Math.floor(Math.random() * quotes.length)] : fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    };


    const replaceAdWithContent = async (adElement) => {

        const replacementDiv = document.createElement("div");
        replacementDiv.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: center;
            width: ${adElement.offsetWidth}px;
            height: ${adElement.offsetHeight}px;
            background: #f8f9fa;
            color: #333;
            font-size: 18px;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            font-weight: bold;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
        `;

        const quote = await getRandomQuote();
        console.log('quote returned from getRandom', quote)
        replacementDiv.innerHTML = quote;
        
        adElement.replaceWith(replacementDiv);
    };

    const scanAndReplaceAds = () => {
        const ads = document.querySelectorAll('[style*="display:block"]');
        ads.forEach(replaceAdWithContent);
    };

    const observeDOMChanges = () => {
        if (!document.body) {
            console.warn("document.body not ready. Retrying...");
            setTimeout(observeDOMChanges, 50); 
            return;
        }

        const observer = new MutationObserver(() => scanAndReplaceAds());
        observer.observe(document.body, { subtree: true, attributes: true });

        console.log("MutationObserver started successfully.");
    }

    document.addEventListener("DOMContentLoaded", () => {
        scanAndReplaceAds();
        observeDOMChanges();
    });

})();