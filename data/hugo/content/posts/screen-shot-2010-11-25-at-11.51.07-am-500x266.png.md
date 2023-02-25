---
title: 'Promoting Your Other Apps Within Your Apps'
date: "2010-11-25T00:00:00.000Z"
type: post 
post_type: article
slug: promoting-your-other-apps-within-your-apps
tags: 
- iDevBlogADay
---
First off, Happy Thanksgiving to my American readers. And a happy Thursday to everyone else. I&#8217;m sitting here on Thursday morning drinking coffee and eating Sticky Buns (kind of like gooey doughnuts). It&#8217;s been a hectic week of family and travel, so please forgive me if this is not the most verbose post.

Showing your other applications within each of your applications (wow, the word application is starting to lose meaning) can have a tremendous impact on your sales. It&#8217;s a great way to promote your other apps for free and will give them much more exposure across a wider audience. Moving all of the promotion logic out to the web allows you to dynamically add and remove apps from the view without updating your apps in the store.

[Insert Cool Graph Backing This Statement Up Here] //I&#8217;m not that cool yet <img src="http://brandontreb.com/wp-includes/images/smilies/frownie.png" alt=":(" class="wp-smiley" style="height: 1em; max-height: 1em;" />

We have seen this in many popular apps. Here is a screenshot from an iDevBlogADay veteran [Owen Goss][1] promoting his other applications from inside of [LandFormer][2].

[<img class="alignnone size-medium wp-image-1080" title="promo" src="/uploads/2010/promo-500x333.png" alt="" width="300" height="200" />][3]

We are going to learn how to make something similar and I will provide you with a web template as well as the view controller to load it.

#### Download The Template

So, I&#8217;m sure there are a million more &#8220;elegant&#8221; ways to display your apps, but I went for super simple. So, 1337 web dev idevblogadayers, please go easy on me in the comments. Download the code below and look in the Web folder.

[Download The Code Files Here][4]

Here is a screenshot of what the template will look like:

[<img class="alignnone size-medium wp-image-1085" title="Screen shot 2010-11-25 at 11.51.07 AM" src="/uploads/2010/Screen-shot-2010-11-25-at-11.51.07-AM-500x266.png" alt="" width="400" height="213" />][5]

It will also work in portrait mode.

#### Upload The Template Files To Your Web Server And Replace My Sample Data

If you have your own website (which you probably should 😉 ), upload the template files to a subdirectory. If not, or you don&#8217;t want to waste bandwidth on it, you can always [host the files on Dropbox][6].

Next, upload your icons (the template auto rounds the corners so you can just use the one&#8217;s bundled with your app) and replace my sample images with yours.

Finally, replace the URL&#8217;s with the URLs to your applications. You can also add/remove table cells to match the number of applications you are promoting.

#### Add The Promotion Code To Your iPhone App

Look in the iPhone folder from the unzipped file you downloaded above and copy the following 3 files into your project:

  * PromotionViewController.m
  * PromotionViewController.h
  * PromotionViewController.xib

Check the box to copy them into your project folder when prompted.

We will now take a look at how to display the promotion view when a button is clicked.

<div>
  <pre>&lt;code class=’objc’>- (IBAction) moreAppsTouched:(id) sender {
    PromotionViewController *controller = [[PromotionViewController alloc]
        initWithNibName:@"PromotionViewController"
        bundle:[NSBundle mainBundle]];
    controller.promotionAddress = @"http://brandontreb.com/apps/idevblogaday/promotion.html";
    [self presentModalViewController:controller animated:YES];
    [controller release];
}&lt;/code></pre>
</div>

Make sure you set controller.promotionAddress to the web address of your promotion.html file.

And there you have it! When the user tapps on a button it will display our promotion view modally and will load up your promo page. I have provided a sample application that pulls up the promotion view when a button has been clicked.

[Download The Sample App Here][7]

If you have any questions or comments, feel free to leave them in the comments.

Happy Coding!

<p style="font-family: ‘Lucida Grande’;">
  &#8212;-
</p></p> 

<div style="font-family: ‘Lucida Grande’;">
  <span style="font-family: ‘Lucida Grande’;"><strong><span style="font-weight: normal;"><span style="font-family: arial, verdana, tahoma, sans-serif; font-size: 13px; line-height: 20px;"><em>﻿﻿This post is part of <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://idevblogaday.com/">iDevBlogADay</a>, a group of indie iOS development blogs featuring two posts per day. You can keep up with iDevBlogADay through the <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://idevblogaday.com/">web site</a>, <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://feeds.feedburner.com/idevblogaday">RSS feed</a>, or <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://twitter.com/#search?q=%23idevblogaday">Twitter</a>.</em></span></span></strong></span>
</div></p> 

<div style="font-family: ‘Lucida Grande’;">
  <span style="font-family: ‘Lucida Grande’;"><strong><span style="font-weight: normal;"><span style="font-family: arial, verdana, tahoma, sans-serif; font-size: 13px; line-height: 20px;"><em><br /> <br /> </em></span></span></strong></span>
</div></p> 

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Promoting Your Other Apps Within Your Apps" data-url="http://brandontreb.com/promoting-your-other-apps-within-your-apps"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://www.streamingcolour.com/blog/
 [2]: http://www.streamingcolour.com/games/landformer/
 [3]: http://brandontreb.com/wp-content/uploads/2010/11/promo.png
 [4]: http://brandontreb.com/wp-content/uploads/2010/11/promotion2.zip
 [5]: http://brandontreb.com/wp-content/uploads/2010/11/Screen-shot-2010-11-25-at-11.51.07-AM.png
 [6]: http://wiki.dropbox.com/TipsAndTricks/HostWebsites
 [7]: http://brandontreb.com/wp-content/uploads/2010/11/PromotionTest1.zip
