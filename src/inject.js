/*!
 * enhanced-github
 * https://github.com/softvar/enhanced-github
 *
 * Licensed MIT (c) Varun Malhotra
*/

/* global chrome */
const messageListenerUtil = require('./utils/messageListenerUtil');
const domUtil = require('./utils/domUtil');
const storageUtil = require('./utils/storageUtil');
const CommonEnum = require('./enums/CommonEnum');

(function() {
  window.enhancedGithub = {
    config: {}
  };

  const readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);

      document.addEventListener(
        'click',
        function(e) {
          if (domUtil.hasClass(e.target, 'js-file-clipboard')) {
            domUtil.selectText();
          }
        },
        false
      );

      messageListenerUtil.addListners();

      chrome.storage.sync.get(
        {
          'x-github-token': '',
          'show-repo-size': true,
          'show-file-size': true,
          'show-download-link': true,
          'show-copy-file-button': true,
          'wrap-code-lines': false
        },
        function(storedData) {
          if (storedData) {
            storageUtil.set(CommonEnum.TOKEN, storedData['x-github-token']);
            storageUtil.set(CommonEnum.SHOW_REPO_SIZE, storedData['show-repo-size']);
            storageUtil.set(CommonEnum.SHOW_FILE_SIZE, storedData['show-file-size']);
            storageUtil.set(CommonEnum.SHOW_DOWNLOAD_LINK, storedData['show-download-link']);
            storageUtil.set(CommonEnum.SHOW_COPY_FILE_BUTTON, storedData['show-copy-file-button']);
            storageUtil.set(CommonEnum.WRAP_CODE_LINES, storedData['wrap-code-lines']);
          }
          domUtil.addRepoData();
          domUtil.applyCodeWrapping();
        }
      );
    }
  }, 10);
})();
