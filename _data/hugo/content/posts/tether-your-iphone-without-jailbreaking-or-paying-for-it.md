---
title: 'Tether Your iPhone Without Jailbreaking (Or Paying For It)'
date: "2011-11-29T00:00:00.000Z"
type: post 
post_type: article
slug: tether-your-iphone-without-jailbreaking-or-paying-for-it
tags: 
- Uncategorized
---
<img alt="" src="https://github.com/tcurdt/iProxy/raw/master/Documentation/screenshots/screen12.png" title="iProxy" class="alignright"  height="340" />

With all of the buzz around the [iTether][1] App, I figured I&#8217;d offer a more permanent solution since Apple will surely yank this soon

Last year, a developer published his code for an http [SOCKS][2] proxy called iProxy. This will give your iPhone the ability to create a SOCKS server in which your laptop can connect to via the Bonjur protocol.

Once connect, all of your computer&#8217;s http traffic will be routed through the server on your iPhone essentially giving you **free tethering**. Since this isn&#8217;t using the iPhone&#8217;s built-in tethering method, I&#8217;d assume At&t could not detect it&#42;. After looking at the code, it becomes pretty obvious how the SOCKS proxy works and makes me kick myself that I didn&#8217;t write it (or find this code sooner).

The [setup][3] is a little complex, but you only need to do it once. I would love to hear in the comments if any of you has had some experience with this. I will also share my own as soon as I can get it installed later today.

Download the project over at [github][4].

Happy Coding!

<sub>&#42;This has not been verified by me</sub>

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Tether Your iPhone Without Jailbreaking (Or Paying For It)" data-url="http://brandontreb.com/tether-your-iphone-without-jailbreaking-or-paying-for-it"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://tether.com
 [2]: http://en.wikipedia.org/wiki/SOCKS
 [3]: https://github.com/tcurdt/iProxy/wiki/Configuring-iProxy
 [4]: https://github.com/tcurdt/iProxy
