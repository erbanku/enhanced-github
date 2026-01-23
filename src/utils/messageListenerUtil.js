/* global chrome */
const domUtil = require('./domUtil');
const MessageType = require('../enums/MessageType');

const messageListenerUtil = {
  onMessage: () => {
    chrome.runtime.onMessage.addListener(function(request, _sender, _sendResponse) {
      try {
        if (request && request.type === MessageType.PAGE_RENDERED) {
          domUtil.addRepoData();
        }
      } catch (error) {
        // Silently handle errors from disconnected ports or closed pages
        if (!error.message.includes('Extension context invalidated')) {
          console.error('Error in message listener:', error);
        }
      }
    });
  },
  addListners: () => {
    messageListenerUtil.onMessage();
  }
};

module.exports = messageListenerUtil;
