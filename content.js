const ytAdBlocker = {
  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.observeDOM();
        this.removeAds();
      });
    } else {
      this.observeDOM();
      this.removeAds();
    }
  },

  observeDOM() {
    const observer = new MutationObserver(() => this.removeAds());
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  },

  removeAds() {
    const adElements = [
      '.video-ads',
      '.ytp-ad-overlay-container',
      '.ytp-ad-text-overlay',
      'ytd-promoted-video-renderer',
      '.ytd-promoted-sparkles-web-renderer',
      '.ytd-display-ad-renderer',
      '.ytd-statement-banner-renderer',
      '.ytd-in-feed-ad-layout-renderer'
    ];

    adElements.forEach(selector => {
      document.querySelectorAll(selector).forEach(ad => {
        ad.remove();
      });
    });

    const skipButton = document.querySelector('.ytp-ad-skip-button');
    if (skipButton) skipButton.click();

    const video = document.querySelector('video');
    if (video && video.duration < 60) {
      video.currentTime = video.duration;
    }
  }
};

ytAdBlocker.init();
