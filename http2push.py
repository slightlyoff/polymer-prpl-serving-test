#!/usr/bin/env python
#
# Copyright 2015 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

__author__ = 'Eric Bidelman <ebidel@>'

import logging
import json
import webapp2


PUSH_MANIFEST = 'push_manifest.json'
DEFAULT_PATH = 'index.html'
HEADER_LENGTH_LIMIT = 8 * 1024 # 6K which appears to be the GAE length limit
                               # Tried 9, 10, and 12K, all of which failed

manifest_cache = {} # filename -> list of push URL mapping.

def use_push_manifest(filename):
  global manifest_cache

  push_urls = {}

  # Read file only if it's not in memory.
  if filename in manifest_cache:
    push_urls = manifest_cache[filename]['push_urls']
  else:
    try:
      with open(filename) as f:
        push_urls = json.loads(f.read())

      manifest_cache[filename] = {'push_urls': push_urls} # cache it.
    except IOError as e:
      logging.error("Error reading %s: %s" % (filename, e.strerror))

  return push_urls


class PushHandler(webapp2.RequestHandler):
  """Base handler for constructing Link rel=preload header."""

  push_urls = use_push_manifest(PUSH_MANIFEST)

  # def __init__(self, request, response):
   # self.initialize(request, response)

  def _generate_link_preload_headers(self, urls=None):
    """Constructs a value for the Link: rel=preload header.

    The format of the preload header is described in the spec
    http://w3c.github.io/preload/:

      Link: <https://example.com/font.woff>; rel=preload; as=font

    Args:
        url: A list of urls to use in the header.

    Returns:
        A list of Link header values.
    """

    if urls is None:
      urls = self.push_urls

    host = self.request.host_url

    preload_links = []
    for url,v in urls.iteritems():
      # Construct absolute URLs. Not really needed, but spec only contains full
      # URLs.
      url = '%s/%s' % (host, str(url))
      t = str(v.get('type', ''))

      tmp_value = ''
      if len(t) and not t == 'document':
        preload_links.append('<%s>; rel=preload; as=%s' % (url, t))
      else:
        preload_links.append('<%s>; rel=preload' % url)
      # preload_links.append('<%s>; rel=preload; as=%s' % (url, t))

    headers = list(set(preload_links)) # remove duplicates

    # Join the headers up to the limit
    final_headers = []
    total_len = 0
    for link in headers:
      total_len += len(link) + 4
      if total_len <= HEADER_LENGTH_LIMIT:
        final_headers.append(link)
      else:
        break

    # GAE supports single Link header.
    return ', '.join(final_headers)

"""
Example:

 @http2push.push()
 def get(self):
   pass

 @http2push.push('push_manifest.json') # Use a custom manifest.
 def get(self):
   pass

?nopush on the URL prevents the header from being included.
"""
def push(manifest=PUSH_MANIFEST):
  def decorator(handler):
    push_urls = use_push_manifest(manifest)
    is_single_file_manifest = False
    # Check to see if it's a multi-file manifest
    first_entry = push_urls[push_urls.keys()[0]]
    if first_entry.has_key('type') and first_entry.has_key('weight'):
      is_single_file_manifest = True

    def wrapper(*args, **kwargs):
      instance = args[0]
      # nopush URL param prevents the Link header from being included.
      if instance.request.get('nopush', None) is None and push_urls:

        request_push_urls = push_urls;
        if not is_single_file_manifest:
          path = instance.request.path
          if path.startswith('/'):
            path = path[1:]

          if not push_urls.has_key(path):
            path = DEFAULT_PATH

          # Bail out if we don't have an entry for the path
          if not push_urls.has_key(path):
            return handler(*args, **kwargs)

          request_push_urls = push_urls[path]

        header = instance._generate_link_preload_headers(request_push_urls)
        instance.response.headers.add_header('Link', header)
        # logging.info('Link: ' + header)

      return handler(*args, **kwargs)

    return wrapper
  return decorator
