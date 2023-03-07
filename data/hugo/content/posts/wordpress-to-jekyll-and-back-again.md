---
title: 'WordPress To Jekyll And Back Again'
date: "2011-11-14T00:00:00.000Z"
type: post 
post_type: article
slug: wordpress-to-jekyll-and-back-again
tags: 
- Uncategorized
---
Earlier this year, I jumped ship on WordPress and moved to Jekyll after reading [this post][1] on Hacker News. I wanted to be 1337! I wanted to ditch the whale that was WordPress.

Well, it was quite a run, but in the end I decided to revert back to WordPress. Although Jekyll is **much faster** than WordPress, here were my issues:

#### Build Times

As my post count grew, so did the time to compile my jekyll site. Jekyll is a static site builder, so naturally it has to rebuild your site any time anything changes. With my blog containing hundreds of posts, my site build times started getting into minutes. I simply don&#8217;t want to wait forever to publish a post.

Since it took **so long** to build my site, it discouraged me from posting. I would only write posts on my specified [#iDevBlogADay][2] days, rather than just posting quick info posts.

#### Too Many Dependancies

Jekyll is a beast to install, especially if you want to support some of the fancier plugins like syntax highlighting. This limited my blogging to only *my* machines. I couldn&#8217;t blog from anywhere anymore. I could have installed Jekyll on my server, but that just seems like a hassle, also see my first point about build times.

#### No Mobile App

I like to blog on the go, and with Jekyll I just couldn&#8217;t find an elegant solution to blog from my iPhone or iPad. I found myself trying to come up with hackish solutions and write custom scripps, but in the end it just wasn&#8217;t worth it.

#### I can now use Markdown with WordPress

I fell in love with Jekyll because I could write in markdown. With [this plugin][3], I can now do just that with WordPress. It stores the Markdown in a separate meta field and generates the post_content html upon publishing the post. So, I&#8217;m not married to the plugin in case I decide to ditch it.

I have also hid the disgusting &#8220;Visual Editor&#8221; that WordPress is unfortunate enough to ship with. This makes my writing experience much more pleasant.

#### The Future

While Jekyll was a fun experiment, I think I will stick with WordPress for now.

**geekCred&#8211;;**

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="WordPress To Jekyll And Back Again" data-url="http://brandontreb.com/wordpress-to-jekyll-and-back-again"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://vitobotta.com/how-to-migrate-from-wordpress-to-jekyll/
 [2]: http://idevblogaday.com
 [3]: http://wordpress.org/extend/plugins/markdown-on-save-improved/
