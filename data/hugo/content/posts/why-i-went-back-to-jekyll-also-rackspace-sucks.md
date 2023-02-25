---
title: 'Why I Went Back To Jekyll &#8211; Also Rackspace Sucks'
date: "2012-01-03T00:00:00.000Z"
type: post 
post_type: article
slug: why-i-went-back-to-jekyll-also-rackspace-sucks
tags: 
- Uncategorized
---
Recently, I was pretty humbled when a post of mine titled [WordPress To Jekyll And Back Again][1] made it to the front page of Hacker News. I was a little down on Jekyll for the reasons listed in that post and was feeling pretty good about my WordPress install.

At the time, I was running my own virtual instance on Rackspace cloud hosting (we&#8217;ll get to this momentarily). I also had all of the caching and optimization plugins installed and welcomed the Hacker News traffic.

As you can imagine, the influx of HN traffic crashed the server multiple times and I was (with good reason) mocked in the comments (&#8220;must be because he&#8217;s &#8216;back to WordPress&#8217;&#8221;). So, I asked for advice and further &#8220;beefed up&#8221; my setup switching from Apache to Nginx, upping the ram, and switching caching plugins. WordPress is a beast and hard to optimize. That&#8217;s not even the kicker as to why I switched away.

#### A Call From Rackspace&#8230;

About a month ago, I realized my blog was down. I figured that it might have been that I was featured somewhere else which was crashing it (again I was rolling my eyes at WordPress). But then, I got a call and email from a *very* helpful Rackspace employee. The email went like this:

> Despite the very best efforts of or our Engineering and Datacenter Operations Teams, unfortunately the host machine that your cloud server &#8216;Websites&#8217; resides on was not able to be recovered. At this point, we are looking at complete data loss.

and&#8230; Rackspace, in this poorly phrased email, was basically like. &#8220;Well, sucks to be you, hope you had a backup!&#8221;. Well, I admit this is partially my fault for not having a backup as I am a bit of a n00b when it comes to server admin, but I had been hosting for years on (don&#8217;t judge me) GoDaddy before that and a couple years on Rackspace. I had no idea that hosting companies didn&#8217;t have backups of their own. It would seem that this might be crucial to their business.

Needless to say, I lost everything including a jewelry site that I ran (not many sales), an iPhone leaderboard site (not very popular), 2 of my buddies WordPress blogs, and my current WordPress blog.

#### Jekyll To The Rescue

I was pretty angry at Rackspace and myself for never making a backup, but then it hit me that *most* of my posts had been converted to Jekyll and were backed up in a github repository. I was able to restore my blog within a few minutes (now hosted on GitHub) and recover the WordPress posts from the [Feedburner cache][2] of my site.

As for my buddies&#8217; sites&#8230; I feel for them <img src="http://brandontreb.com/wp-includes/images/smilies/frownie.png" alt=":(" class="wp-smiley" style="height: 1em; max-height: 1em;" />

#### New List Of Why Jekyll Is Awesome

  * **Automatically backed up** &#8211; This is huge. If not for switching to Jekyll at one point, I would have lost **years** worth of content. If you have every tried to back up WordPress, it&#8217;s a huge frackin pain since the database dump usually gets HUGE.
  * **Free To Host** &#8211; I&#8217;m not sure why I was so stubborn about doing my own hosting. I am now hosting on [GitHub][3] and it couldn&#8217;t be more stable and fast.
  * **Mobile Blogging** &#8211; This was my largest gripe about Jekyll. I was jealous that I couldn&#8217;t blog from my iPhone like WordPress users. Well, I have found a pretty decent solution (tutorial to follow), which involves a combo of Prompt, Screen, and Vim.
  * **Content Oriented** &#8211; WordPress makes it super easy to dump tons of images into your posts. While blogging with Jekyll (inside of Vim in my case), it&#8217;s a little bit more of a pain to add your own images. That being said you must be choosy forcing you to focus more on the content and less on using visual crutches.
  * **Blog Anywhere** &#8211; This was another limitation I was placing on Jekyll in my last post. However, I just wasn&#8217;t using Jekyll to its full potential. I was building my site locally and rsyncing it up to my server. This process was a little tedious and discouraged me from writing many new posts. Now, hosting with github, posting is as simple as a quick push to the repo.
  * **Ninja Fast** &#8211; This one should be obvious.

#### Conclusion

I am quite happy blogging with Jekyll. As far as I&#8217;m concerned there is no reason to ever host my own blog again (as long as Github doesn&#8217;t ditch pages 😉 ). Also, if you currently have stuff on Rackspace, **go make a backup now** (or ditch them altogether). Thanks for reading and [look out][2] for my next post about mobile blogging with Jekyll.

Happy Blogging!

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Why I Went Back To Jekyll - Also Rackspace Sucks" data-url="http://brandontreb.com/why-i-went-back-to-jekyll-also-rackspace-sucks"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://brandontreb.com/wordpress-to-jekyll-and-back-again/
 [2]: http://feeds.feedburner.com/brandontreb
 [3]: https://github.com/brandontreb/brandontreb.github.com
