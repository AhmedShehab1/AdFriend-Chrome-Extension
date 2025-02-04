document.getElementById('get-started').addEventListener('click', () => {
    chrome.runtime.sendMessage( { action: 'closeTab'} );
});