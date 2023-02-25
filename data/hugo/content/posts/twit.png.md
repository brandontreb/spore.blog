---
title: 'The Only Twitter API PHP Class You Will Ever Need'
date: "2009-02-27T00:00:00.000Z"
type: post 
post_type: article
slug: the-only-twitter-api-php-class-you-will-ever-need
tags: 
- Articles
---
[<img class="alignright size-full wp-image-123" title="twit" src="/uploads/2009/twit.png" alt="twit" width="135" height="135" />][1]

<span style="color: #ff6600;"><strong><strong>Note</strong> </strong></span>**Twitter has switchted their entire interface to use OAUTH and this class no longer works (I should probably change the title hahaha). I will post an oauth connection tutorial in the near future, so make sure to **[**subscribe to my RSS feed**][2]** for all of the sweet sweets updates!**

**Cheers!**

So, I started writing a Twitter API Programming series last week&#8230; [Here is part 1][3]. I have found that there is not much else to teach when it comes to interfacing with Twitter. Basically, we just need to implement all of the Twitter functions.

I have taken it upon myself to create a fully functional **Twitter API PHP class**. It has every Twitter function you will ever need (less the direct messages). I have also fully documented it with comments directly from the Twitter API so that the functions are easy to understand. Here is how you would use the class. The first parameter of every function is the return type. For Twitter it can be either xml, json, or rss for some functions.

<div>
  <pre>&lt;code class=’php’>include("Twitter.class.php");
    $twitter = new Twitter();
    $twitter-&gt;username = "twitteruser";
    $twitter-&gt;password = "twitterpass";
    // Show public timeline
    echo $twitter-&gt;public_timeline();
    // Update your status
    echo $twitter-&gt;update(‘xml’,’This PHP class is flippin sweet!’);
    // Start following a user
    echo $twitter-&gt;create(‘xml’,’brandontreb’);&lt;/code></pre>
</div>

These are just 3 of the functions implemented in this class. The full function list includes:

  * public_timeline
  * friends_timeline
  * user_timeline
  * update
  * replies
  * friends
  * followers
  * show
  * create
  * destroy
  * exists

All of these functions are fully documented and simple to use. You can also check out Twitter&#8217;s API [here][4] (but you shouldn&#8217;t need to).

So, now you can fully **integrate Twitter into any PHP application you create! **

### Download The PHP Twitter Class here [Twitter.class.php][5]

Also, make sure you [subscribe to my RSS feed][2]. More great programming tutorial to come.

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="The Only Twitter API PHP Class You Will Ever Need" data-url="http://brandontreb.com/the-only-twitter-api-php-class-you-will-ever-need"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: /uploads/2009/twit.png
 [2]: http://feeds2.feedburner.com/brandontreb
 [3]: http://brandontreb.com/twitter-api-programming-tutorial-with-php-getting-started/
 [4]: http://apiwiki.twitter.com/REST+API+Documentation
 [5]: http://brandontreb.com/wp-content/uploads/2009/02/Twitter.class.php1.zip
