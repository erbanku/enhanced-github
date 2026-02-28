/* global chrome */
const MessageType = {
  PAGE_RENDERED: 'pageRendered',
};

/**
 * Since GitHub is a full SPA (now using Turbo), we listen for history state
 * updates and notify the content script to re-run its logic.
 *
 * Read the detailed blog - https://medium.com/@softvar/making-chrome-extension-smart-by-supporting-spa-websites-1f76593637e8
 */
chrome.webNavigation.onHistoryStateUpdated.addListener(
  (details) => {
    chrome.tabs.sendMessage(details.tabId, { type: MessageType.PAGE_RENDERED }, () => {
      // Silently ignore errors from disconnected receivers
      if (chrome.runtime.lastError) {
        return;
      }
    });
  },
  {
    url: [
      {
        hostSuffix: 'github.com',
      },
    ],
  },
);
