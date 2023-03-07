---
title: 'Creating A Twitter Client In Objective-C Client Part 2'
date: "2009-07-28T00:00:00.000Z"
type: post 
post_type: article
slug: creating-a-twitter-client-in-objective-c-client-part-2
tags: 
- Mac
---
## This tutorial has moved! I have updated it to support Twitter&#8217;s Oauth, you can find the first tutorial in there series by clicking the link below

## [Creating A Twitter Client For OSX – Part 1][1]

This is part 2 in our series about creating a Twitter client in Objective-C. In case you missed it, here is a [link to part 1][2] of this series.

In the last tutorial I showed you how to retrieve data from Twitter and display the XML in the Console. Today, we will be focusing on sending messages to Twitter via [POST][3]. We will be implementing the code to update our Twitter status. So let&#8217;s just dig right in.

## 1. Updating The TwitterRequest Header File

Open up TwitterRequest.h and add the following code (Click the image to enlarge)

[<img class="size-full wp-image-362 alignnone" title="screenshot_16" src="/uploads/2009/screenshot_16.png" alt="screenshot_16" width="666" height="395" />][4]

We have added two properties. The first **isPost** will be true when we are calling a method that requires a POST to Twitter. This will be methods such as update_status, follow, etc&#8230; Next, the variable **requestBody** will hold the POST arguments that will be sent to Twitter. These will be things such as status text or friend id.

Finally, we will be adding a method called **statuses_update**. The reason I named it this is because that is what the method is called in the [Twitter API][5]. Like our **friends_timeline** method, it takes a delegate and selector to call when the request is complete.

**Important:** I didn&#8217;t highlight this in the screenshot but make sure you change **theRequest** from an **NSURLRequest** to **NSMutableURLRequest**. It will give us some additional methods to set up the POST.

## 2. Updating The Twitter Request Class

Open up **TwitterRequest.m **and add the following code (Click the image to enlarge):

[<img class="size-full wp-image-363 alignnone" title="screenshot_17" src="/uploads/2009/screenshot_17.png" alt="screenshot_17" width="670" height="293" />][6]

I&#8217;ll start by explaining the **status_update** method. We first set the global **isPost** property to true. This will tell the request method to make a POST. The next 2 lines set the callback stuff as we did before. The only new line here is setting the **requestBody** variable. This is just a string that looks like &#8220;status=new twitter status&#8221;.

The addition to the **request **method is what will allow us to POST to Twitter. First, we check if the **isPost** property is set. This will be true if **request** is called from our **status_update **method. Next, we call the **setHTTPMethod** of the request to POST. This is pretty obvious.

The following line let&#8217;s Twitter know the type of data that we are sending to it. Next, we call **setHTTPBody** to set the body of the request. At some point we will want to URL Encode this string, but that will be for a different tutorial. Just don&#8217;t use any special characters such as & and = in your update to Twitter right now. All that is happening on this line is we convert the string to NSData using the **dataUsingEncoding **method of NSString and set it to the HTTPBody.

The last line just sets the Content-Length property to the length of our string. This is needed to correctly do a POST.

## 3. Calling The statuses_update Method To Update Your Twitter Status

Open up **ApplicationDelegate.m** and add the following code (click the image to enlarge):

[<img class="size-full wp-image-367 alignnone" title="screenshot_03" src="/uploads/2009/screenshot_03.jpg" alt="screenshot_03" width="659" height="217" />][7]

One thing to notice here is I commented out the line to get the friends timeline. This is because having both requests running at the same time with the same request object could cause conflicts. The best way to approch this to create an entirly new TwitterRequest object. I just wanted to keep it short.

This is pretty straight forward. We call the **statuses_update** method the same way we called the **friends_timeline** method except pass in the update text. The information received back from Twitter will look something like this:

[<img class="size-full wp-image-368 alignnone" title="screenshot_01" src="/uploads/2009/screenshot_01.jpg" alt="screenshot_01" width="616" height="564" />][8]

It&#8217;s basically all of your personal profile information.

That&#8217;s it for today. If you have any comments or questions, feel free to leave them in the comments of this post or [write me on Twitter][9]. You can also download the source for this version below.

[Twitter Mac Client Tutorial 2 – Source][10]

Happy Coding!

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Creating A Twitter Client In Objective-C Client Part 2" data-url="http://brandontreb.com/creating-a-twitter-client-in-objective-c-client-part-2"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://brandontreb.com/creating-a-twitter-client-for-osx-part-1/
 [2]: http://brandontreb.com/objective-c-programming-tutorial-creating-a-twitter-client-part-1/
 [3]: http://en.wikipedia.org/wiki/POST_(HTTP)
 [4]: /uploads/2009/screenshot_16.png
 [5]: http://apiwiki.twitter.com/Twitter-API-Documentation
 [6]: /uploads/2009/screenshot_17.png
 [7]: /uploads/2009/screenshot_03.jpg
 [8]: /uploads/2009/screenshot_01.jpg
 [9]: http://twitter.com/brandontreb
 [10]: http://brandontreb.com/wp-content/uploads/2009/07/Chirpie1.zip
