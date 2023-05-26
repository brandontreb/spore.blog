---
title: 'Caterpillar-HD Now In The App Store: Tutorial Series To Follow'
date: "2011-11-16T00:00:00.000Z"
type: post 
post_type: article
slug: caterpillar-hd-now-in-the-app-store-tutorial-series-to-follow
tags: 
- Uncategorized
---
I have just released the update to my Centipede clone called [Caterpillar][1]. For those of you who don&#8217;t know, I am doing a 6 part series on how to create this game over at [MobileTuts+][2].

This update adds some interesting functionality on which I will be blogging about in the near future.

I have added iAds to my cocos2D project and when the iAds fail to serve (which is about 75% of the time), I replace them with Admob ads. This was achieved by creating a new Admob ad view inside of the `bannerView:didFailToReceiveAdWithError:` delegate method.

I will either post a full tutorial about doing this Here or on Mobile Tuts. Either way, I&#8217;ll keep you posted.

Also, be sure to [download the game][1], test it out, and lemme know if you have suggestions. Version 1.1 addressed quite a few issues from feedback (namely poor controls).

Happy coding!

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Caterpillar-HD Now In The App Store: Tutorial Series To Follow" data-url="http://brandontreb.com/caterpillar-hd-now-in-the-app-store-tutorial-series-to-follow"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://itunes.apple.com/us/app/caterpillar-hd/id479439790?mt=8
 [2]: http://mobile.tutsplus.com/tutorials/iphone/building-a-caterpiller-game-with-cocos2d/
