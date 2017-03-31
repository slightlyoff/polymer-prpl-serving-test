/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","39eda2df0fedf8b182ec381326046caf"],["/bower_components/app-layout/app-drawer/app-drawer.html","6eb49d722a6f3471cc7a7bcf4239c768"],["/bower_components/app-layout/app-header-layout/app-header-layout.html","6e827489a8e99631b1fbdd3e6774afe6"],["/bower_components/app-layout/app-header/app-header.html","9d56f4a9a7dfdc53296d2c0f105c78d3"],["/bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","37023dd2974bdf78ebd70e85dc17a8a4"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","8c5d09ec0053ce1f4ebe08e93c9657ce"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","334eac7f54a828baedbe8f09574571b7"],["/bower_components/app-layout/app-scroll-effects/effects/blend-background.html","dead12f7659321c7fe4928aae467519f"],["/bower_components/app-layout/app-scroll-effects/effects/fade-background.html","35e9b86069d272d5e086d324e6afa01a"],["/bower_components/app-layout/app-scroll-effects/effects/material.html","26f969f3f845031af5f3c728d550638b"],["/bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","6ca6cd1f7972a53c6b5d38360f39459e"],["/bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","22c4d4328472d5dc35906793fe731a2f"],["/bower_components/app-layout/app-scroll-effects/effects/resize-title.html","e0d5f4348d3ca12d5f309b11fa6a7e4b"],["/bower_components/app-layout/app-scroll-effects/effects/waterfall.html","059e8ca24132d7f55f5b972ba3459ff6"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","53846b6e0b9dc4c62d5780f2c11de522"],["/bower_components/app-layout/helpers/helpers.html","2d730f2f5cfbf37df06cb767c7cca701"],["/bower_components/app-route/app-location.html","849002b15381c2ae395d22e895def814"],["/bower_components/app-route/app-route-converter-behavior.html","7a0f47f2b36fbb0bf18e5cb1c1d2fcb5"],["/bower_components/app-route/app-route.html","e6a95f281ddf7dd884937a96b1789d57"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","7440176796d324569bd0f45139250f6f"],["/bower_components/iron-behaviors/iron-button-state.html","c043fe195155efdf508235f91237aaa5"],["/bower_components/iron-behaviors/iron-control-state.html","1206727d853ab64d4da9525d88233915"],["/bower_components/iron-flex-layout/iron-flex-layout.html","b7667fb7583f8fd5ef3af0a401a0ea76"],["/bower_components/iron-icon/iron-icon.html","8902e2639f7f0022821764ccdbc5ba67"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","844a3326e911213f9a9c6d990b5a7da9"],["/bower_components/iron-location/iron-location.html","54d7ea66d697f51c4349c34275b71ac1"],["/bower_components/iron-location/iron-query-params.html","58ef6720ee9ffceafaaa5583a015d1db"],["/bower_components/iron-media-query/iron-media-query.html","cf156c37b06b70f0368b23253d363414"],["/bower_components/iron-meta/iron-meta.html","6ca705b8e47933f428f022c7d3dd885f"],["/bower_components/iron-pages/iron-pages.html","9cfcf52cec60786586e97ce835c626f6"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","fb6d2dd64df1eb6a6882cb0a38b640f5"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","2fc4522cc9a86064e117835239af5ae8"],["/bower_components/iron-selector/iron-multi-selectable.html","049cd8e7cdea162789d84a47dc39935e"],["/bower_components/iron-selector/iron-selectable.html","3cc68433bfd2b04a446004f9d9dd1521"],["/bower_components/iron-selector/iron-selection.html","6820931a3f3849002e7a95cabd6d23f5"],["/bower_components/iron-selector/iron-selector.html","ca83106ca2a3ebb80b434598998bb088"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","5e34513d00a9b66055202e85990c1feb"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","d91073e923bdaf1ca67f32f24d6ed0b9"],["/bower_components/paper-icon-button/paper-icon-button.html","d059572a414bcdd94d257752b892919a"],["/bower_components/paper-ripple/paper-ripple.html","e3863cac24d56a7b403c94a390447a2f"],["/bower_components/paper-styles/color.html","866b6ec41ce8d64f1c2d855b5575c2f8"],["/bower_components/paper-styles/default-theme.html","e8d31d2b3b8a50ffcc41309a0d30d6fd"],["/bower_components/polymer/lib/elements/array-selector.html","cbf043221e8d7dc4503766d2f3a5709e"],["/bower_components/polymer/lib/elements/custom-style.html","329a70151202e92d1a775c9ecbb05020"],["/bower_components/polymer/lib/elements/dom-bind.html","cef02b79cdbe440eb1d645dd01d73020"],["/bower_components/polymer/lib/elements/dom-if.html","92bce9d1c913f4d0a3b5a58deaba1e56"],["/bower_components/polymer/lib/elements/dom-module.html","eafbfc1fbd56546046f9beced1602c0f"],["/bower_components/polymer/lib/elements/dom-repeat.html","ec5b16770b28c871f4088adb321ca2a6"],["/bower_components/polymer/lib/legacy/class.html","a71288bd85dd802ee2431cb66d40857b"],["/bower_components/polymer/lib/legacy/legacy-element-mixin.html","6bacd93aac4d67bc0e0133dbcc85619e"],["/bower_components/polymer/lib/legacy/mutable-data-behavior.html","d2e60534a0807f221ca8319102b2b241"],["/bower_components/polymer/lib/legacy/polymer-fn.html","508de8f9a33aae2d161266109d6ce46f"],["/bower_components/polymer/lib/legacy/polymer.dom.html","c3d527c113f2fc5d8f04cbd5a91c3179"],["/bower_components/polymer/lib/legacy/templatizer-behavior.html","9b5b00c916b0aa0c5ac5d2413934c27b"],["/bower_components/polymer/lib/mixins/element-mixin.html","d3dfc20d76fec37a40265e1bbc20abee"],["/bower_components/polymer/lib/mixins/gesture-event-listeners.html","3366e1146bf0ba88341c8050106e4b0a"],["/bower_components/polymer/lib/mixins/mutable-data.html","03325fb6e5b4084ed53501c90eea7f10"],["/bower_components/polymer/lib/mixins/property-accessors.html","c0288d05943197575df3c1dd2da6c184"],["/bower_components/polymer/lib/mixins/property-effects.html","ffb872290cc058ef93ee10edecda96c8"],["/bower_components/polymer/lib/mixins/template-stamp.html","f5df9b0c0eab34f4b30f09ae7e29d87a"],["/bower_components/polymer/lib/utils/array-splice.html","9e68161820af288f38b3635b8af8a72f"],["/bower_components/polymer/lib/utils/async.html","33481410ec8923b473e5bb0e0e3ccfb0"],["/bower_components/polymer/lib/utils/boot.html","98a1f2ef78aadcc1111933bdfd94e11a"],["/bower_components/polymer/lib/utils/case-map.html","7bded4d7af1b3e7cbb32862a6e3862d8"],["/bower_components/polymer/lib/utils/debounce.html","055d03d79237bdf56b1b93eca531d2e2"],["/bower_components/polymer/lib/utils/flattened-nodes-observer.html","e972eb27950afb8bccaa339072c39466"],["/bower_components/polymer/lib/utils/flush.html","d4e23bab0328b6319f7cf9a41feea5d7"],["/bower_components/polymer/lib/utils/gestures.html","383b4996fc7d64c0c2c872c6828ca9a0"],["/bower_components/polymer/lib/utils/import-href.html","f91aca107259bb85b45d053037fa2f30"],["/bower_components/polymer/lib/utils/mixin.html","16d8a2a823c95f3f9bfe3e33d8d48a45"],["/bower_components/polymer/lib/utils/path.html","9505ee952fbf33aae20fdd103b452cff"],["/bower_components/polymer/lib/utils/render-status.html","2fb71859e071ac2e8b9eb20e9687c95a"],["/bower_components/polymer/lib/utils/resolve-url.html","0b29bf2e3cf6ff4de0c67b4dd5f29185"],["/bower_components/polymer/lib/utils/style-gather.html","87da74d1a90bc20a05d296ae845a4396"],["/bower_components/polymer/lib/utils/templatize.html","fd9afe003144e7a7f04793a6215e4fb6"],["/bower_components/polymer/lib/utils/unresolved.html","91b0d5a50989cdeddd3481eddefc3919"],["/bower_components/polymer/polymer-element.html","39275b896623fee1e7e694f2c8fd3773"],["/bower_components/polymer/polymer.html","564b54a6e1b1b5eebcb43ad4c850dab5"],["/bower_components/shadycss/apply-shim.html","a7855a6be7cd2ceab940f13c1afba1f3"],["/bower_components/shadycss/apply-shim.min.js","2e104f65ac85c822ebdcba1a4277be90"],["/bower_components/shadycss/custom-style-interface.html","7784f566f143bec28bf67b864bedf658"],["/bower_components/shadycss/custom-style-interface.min.js","1ffc7039c622542542bc97af5e787767"],["/bower_components/webcomponentsjs/gulpfile.js","7f9de503a92df0d5ad967b5ee371947f"],["/bower_components/webcomponentsjs/webcomponents-ce-es5.js","b0bfd724ee8b762ea100d1804438a5a1"],["/bower_components/webcomponentsjs/webcomponents-es5-loader.js","6111a1fe934af322453e45083ef7be9b"],["/bower_components/webcomponentsjs/webcomponents-hi-ce-es5.js","0df05f9b4dec7ad8420ef39d27dbdbe6"],["/bower_components/webcomponentsjs/webcomponents-hi-ce.js","49de6f8a62cc4ccde09bd19b44ea9742"],["/bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","97aa02ffbcac737ca9edf15ecc797fbf"],["/bower_components/webcomponentsjs/webcomponents-hi.js","8036af2ba31344a56ff5bcba5c7db6f6"],["/bower_components/webcomponentsjs/webcomponents-lite.js","b93b9845ebd1cb62ba795165f8bf0bb2"],["/bower_components/webcomponentsjs/webcomponents-loader.js","af79808d80256b0eaa28fae403df6104"],["/bower_components/webcomponentsjs/webcomponents-sd-ce.js","9b671aa0d00c75ac5e373aa5d624999f"],["/index.html","7d01a525964367f3fced30ab288ce8a0"],["/manifest.json","2eefc15db4b58758cddc0d666e27d399"],["/src/my-app.html","e7ae029bb2ec7a83242bf8a7b6868a6b"],["/src/my-icons.html","46a164b81d130beeec8b4409481eed8c"],["/src/my-view1.html","2f8e60fce1dac8a37ca0b83979abe970"],["/src/my-view2.html","fc7b484e4a60a2bdb42570fe3252c2ff"],["/src/my-view3.html","e7562908033801c88c2f1e626e993bcf"],["/src/my-view404.html","1f73b132d824b173dcfabf926edc8823"],["/src/shared-styles.html","09c261064614fe9ce895112c5e79c9c1"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







