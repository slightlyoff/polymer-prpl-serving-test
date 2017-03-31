# Copyright 2016 Google Inc.
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

import os
import sys
import webapp2

from google.appengine.ext.webapp import template

import http2push as http2

class MainHandler(http2.PushHandler):

  @http2.push('build/default/push_manifest.json')
  def get(self):
    path = os.path.join(os.path.dirname(__file__), 'build/default/index.html')
    return self.response.write(template.render(path, {}))

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/view1', MainHandler),
    ('/view2', MainHandler),
    ('/view3', MainHandler),
], debug=True)
