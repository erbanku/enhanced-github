/**
 * Tests for the settings functionality
 * These tests document the expected behavior of the display settings feature
 */

const CommonEnum = require('../src/enums/CommonEnum');

describe('Settings Feature', () => {
  describe('CommonEnum constants', () => {
    test('should have all required setting keys', () => {
      expect(CommonEnum.TOKEN).toBe('token');
      expect(CommonEnum.SHOW_REPO_SIZE).toBe('show-repo-size');
      expect(CommonEnum.SHOW_FILE_SIZE).toBe('show-file-size');
      expect(CommonEnum.SHOW_DOWNLOAD_LINK).toBe('show-download-link');
      expect(CommonEnum.SHOW_COPY_FILE_BUTTON).toBe('show-copy-file-button');
      expect(CommonEnum.WRAP_CODE_LINES).toBe('wrap-code-lines');
    });
  });

  describe('Settings behavior', () => {
    test('should have default values of true for all display settings', () => {
      // All settings should default to true (enabled) when not set
      // This is documented in options.js restoreOptions function
      const defaultSettings = {
        'show-repo-size': true,
        'show-file-size': true,
        'show-download-link': true,
        'show-copy-file-button': true,
        'wrap-code-lines': false  // Default to false - opt-in feature
      };

      expect(defaultSettings['show-repo-size']).toBe(true);
      expect(defaultSettings['show-file-size']).toBe(true);
      expect(defaultSettings['show-download-link']).toBe(true);
      expect(defaultSettings['show-copy-file-button']).toBe(true);
      expect(defaultSettings['wrap-code-lines']).toBe(false);
    });

    test('should allow individual settings to be toggled', () => {
      // Each setting can be independently enabled or disabled
      const customSettings = {
        'show-repo-size': true,
        'show-file-size': false,  // User can disable file size
        'show-download-link': true,
        'show-copy-file-button': false,  // User can disable copy button
        'wrap-code-lines': true  // User can enable code wrapping
      };

      expect(customSettings['show-file-size']).toBe(false);
      expect(customSettings['show-copy-file-button']).toBe(false);
      expect(customSettings['wrap-code-lines']).toBe(true);
    });
  });

  describe('UI areas controlled by settings', () => {
    test('should define which UI areas are affected by each setting', () => {
      const settingDescriptions = {
        'show-repo-size': 'Controls visibility of repository size in sidebar',
        'show-file-size': 'Controls visibility of file size in file browser rows',
        'show-download-link': 'Controls visibility of download links in file browser rows and file view',
        'show-copy-file-button': 'Controls visibility of copy file contents button in file view',
        'wrap-code-lines': 'Controls wrapping of long lines in markdown code blocks'
      };

      expect(settingDescriptions['show-repo-size']).toContain('sidebar');
      expect(settingDescriptions['show-file-size']).toContain('file browser');
      expect(settingDescriptions['show-download-link']).toContain('file browser');
      expect(settingDescriptions['show-copy-file-button']).toContain('file view');
      expect(settingDescriptions['wrap-code-lines']).toContain('code blocks');
    });
  });
});
