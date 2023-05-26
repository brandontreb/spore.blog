---
title: 'Feedburner Anywhere Plugin Updated'
date: "2010-08-27T00:00:00.000Z"
type: post 
post_type: article
slug: feedburner-anywhere-plugin-updated
tags: 
- Wordpress
---
I have updated my WordPress plugin Feedburner Anywhere. In case you are unfamiliar with it, it&#8217;s a plugin that allows you to output your Feedburner subscriber count anywhere on your blog.

**The Problem: **Since Google took over Feedburner, I feel that it has been quite unreliable. A few times a week, Feedburner would return 0 for your subscriber count. This was an issue with the plugin. If the return value was 0 when the plugin pulled and cached the feedburner data, you would look like you had no subscribers.

**The Fix:** I am now caching the values returned from Feedburner. If for any reason Feedburner returns a 0 subscriber count, the last known value (greater than 0) is used instead.

[Download the updated plugin here][1]

If you have any other suggestions for the plugin, please let me know.

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Feedburner Anywhere Plugin Updated" data-url="http://brandontreb.com/feedburner-anywhere-plugin-updated"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://wordpress.org/extend/plugins/feedburner-anywhere/
