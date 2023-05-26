---
title: 'Fluid For Mac'
date: "2012-01-19T00:00:00.000Z"
type: post 
post_type: article
slug: fluid-for-mac
tags: 
- Uncategorized
---
As of OSX Lion, I have started to seriously loathe some of the build-it Mac apps (such as Mail, and iCal). While I previously had no issues with them, they now seem to be very clunky and crash quite often. Being a developer, I thought &#8220;why don&#8217;t I write an app that wraps web apps for you so you basically get &#8220;native web apps&#8221; that have icons and are launchable?&#8221;.

After a quick Google search, I realized **[this already exists!][1]**. The app is called Fluid and it does an incredible job of what I described above and more.

<img src="http://fluidapp.com/images/dock_large.png" width="400" />

Here are the feature highlights.

  * Create a &#8220;native&#8221; Mac app for any web app
  * Custom icon for each &#8220;native&#8221; app you create
  * Full screen mode
  * User scripps. These are my favorite. They allow you to update the badge count based on information in the browser. See below for a sample user script.

**Sample User Script For Twitter**

<div>
  <pre>&lt;code class=’javascript’>(function () {
        if (window.fluid) {
            setInterval(function updateBadge() {
                var counts = /\d+/.exec(document.title);
                if (counts && counts[0] &gt; 0) {
                    window.fluid.dockBadge = counts[0] &gt; 99 ? ‘99+’ : counts[0];
                } else {
                    window.fluid.dockBadge = ”;
                }
            }, 2000);
        }
    })();&lt;/code></pre>
</div>

[Source][2]

Fluid is free with some minimal features, but I urge you to drop the $4.99 to gain full screen mode and user scripts. It&#8217;s well worth it. I am not affiliated with them in any way, just a happy customer.

[Download Fluid][1]

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Fluid For Mac" data-url="http://brandontreb.com/fluid-for-mac"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://fluidapp.com/
 [2]: http://userscripts.org/scripts/review/88425
