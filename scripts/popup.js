document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggleExtension");

    chrome.storage.sync.get(["adfriendEnabled"], (data) => {
        toggle.checked = data.adfriendEnabled ?? true;
    });

    toggle.addEventListener("change", () => {
        chrome.storage.sync.set({ adfriendEnabled: toggle.checked });
    });
});
