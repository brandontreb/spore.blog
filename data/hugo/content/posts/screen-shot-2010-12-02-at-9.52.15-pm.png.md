---
title: 'Creating A Twitter Client For OSX &#8211; Part 1'
date: "2010-12-02T00:00:00.000Z"
type: post 
post_type: article
slug: creating-a-twitter-client-for-osx-part-1
tags: 
- Mac
---
With the upcoming release of the Mac App Store, I can only imagine another gold rush is upon us. Clever Indie developers making money hand over fist while the store as well as developers find their identities. With that being said, I feel that there is a serious lack of interesting (maintained) Twitter clients for OSX. I say &#8220;maintained&#8221; because Tweetie for OSX is just fantastic, however Twitter said they don&#8217;t have any plans for it at this time. So, I want to provide devs with the tools to create an amazing Twitter client for the Mac that I will want to use <img src="http://brandontreb.com/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />

Quite some time ago, I began (and never completed) a series on [writing a Twitter client for OSX][1]. It was very well received by the development community, however once Twitter switched over to OAUTH, I became too lazy to update it <img src="http://brandontreb.com/wp-includes/images/smilies/frownie.png" alt=":(" class="wp-smiley" style="height: 1em; max-height: 1em;" /> . So, I figured a tutorial series for [#iDevBlogADay][2] would be the perfect opportunity to complete it.

So we are going to start from the ground up. In today&#8217;s tutorial, we are going walk through getting the initial resources and setting up Twitter to authenticate our application. We will also post a basic tweet.

#### Setting Up Twitter

In order for your application to interface with Twitter, you must register it with them over at <http://developer.twitter.com>.

  1. Go to <http://developer.twitter.com> and sign up if needed
  2. Click on [Your Apps][3]
  3. Click [Register A New App][4] and fill out all of the information about your client
  4. You&#8217;re all set!

#### Getting Necessary Resources

I spent a bit of time researching the various options for handling OAUTH and all of the fun stuff that goes along with Twitter integration and found that [MGTwitterEngine][5] was the least painful to implement. I say least painful because it has a few quirks of it&#8217;s own along with not having the best documentation in the world.

So after battling for a bit to get the thing compiled, I have figured out the setup process :). You could also read [Matt&#8217;s installation instructions][6], but I will regurgitate them here a little differently and hopefully be more clear. So here it is:

  1. Make sure you have git installed. If not, [download it for OSX here][7].
  2. cd to the directory that you want to clone the files to
  3. Clone the MGTwitterEngine repository. Type:  
    $ **git clone git://github.com/mattgemmell/MGTwitterEngine.git**
  4. cd into the MGTwitterEngine folder (we will install the dependancies at this level)
  5. Now install the dependancies ([TouchJSON][8] and [OAUTHConsumer][9]). Note: There is an option to use yajl (yet another json library), but I found it a pain to integrate, so we will just throw it out.  
    $ **git clone git://github.com/schwa/TouchJSON.git**  
    $ **git clone git://github.com/ctshryock/oauthconsumer.git**

Altogether, this is the order of commands you should have:

<div>
  <pre>&lt;code class=’bash’>$ cd ~/Desktop
$ git clone git://github.com/mattgemmell/MGTwitterEngine.git
$ cd MGTwitterEngine
$ git clone git://github.com/schwa/TouchJSON.git
$ git clone git://github.com/ctshryock/oauthconsumer.git&lt;/code></pre>
</div>

#### Building MGTwitterEngine (What a freakin pain)

I find it interesting that this project is riddled with errors directly upon download. So much work went into it, yet it&#8217;s so challenging to get working.

Now open up MGTwitterEngine.xcodeproj. You will notice that there are quite a few missing files (they show in red). That&#8217;s fine. DELETE THEM ALL&#8230;

  1. Delete the **yajl** group with everything in it
  2. Delete the **Twitter YAJL Parsers** group and everything in it
  3. Delete **OAToken_KeychainExtensions.m** and **OAToken_KeychainExtensions.h** (they are not used)
  4. Delete **CJSONDataSerializer.h** and **CJSONDataSerializer.m**
  5. Delete **CSerializedJSONData.h** and **CSerializedJSONData.m**
  6. Click the arrow on the OAuthConsumer group and you will notice that the **Crypto** is missing. We still need this group, but it&#8217;s in the wrong place. Delete this group and then open up your MGTwitterEngine folder in Finder. Navigate to **MGTwitterEngine->oauthconsumer**. Drag the **Crypto** folder into your project.
  7. We need to change the C Language Dialect to C99. To do this right click on MGTwitterEngine in XCode and click Get Info. Scroll down to C Language Dialect and click the drop down changing it to C99  
    [<img class="alignnone size-full wp-image-1097" title="Screen shot 2010-12-02 at 9.22.12 PM" src="/uploads/2010/Screen-shot-2010-12-02-at-9.22.12-PM.png" alt="" width="474" height="64" />][10]
  8. Finally, we need to tell MGTwitterEngine that we want to use TouchJSON instead of yajl. To do this open up **MGTwitterEngineGlobalHeader.h** and set TOUCHJSON_AVAILABLE to 1.
  9. If you still have any hair left at this point, click Build and Run to and check out the output in the Console
 10. If you don&#8217;t feel like jumping through all of these hoops you can download my MGTwitterEngine project with all of this fun stuff completed. [Download it here][11].

#### Testing MGTwitterEngine

For today&#8217;s tutorial, we will just be displaying our timeline and updating our status using the demo file provided by MGTwitterEngine. In the next tutorial, we will actually be integrating the engine into a new project. So, open up **AppController.m** in the **Demo** group. Matt has given us some nice variables to fill in, in order to make this thing work. Let&#8217;s update to applicationDidFinishLaunching method to look like the code below:

<div>
  <pre>&lt;code class=’objc’>- (void)applicationDidFinishLaunching:(NSNotification *)aNotification
{
        // Put your Twitter username and password here:
        NSString *username = @"brandontreb";
    NSString *consumerKey = @"aKKEsJHTDNsv4xVlMHmMqw";
    NSString *consumerSecret = @"oldpeoplenakedcriscotwister";

        // Create a TwitterEngine and set our login details.
        twitterEngine = [[MGTwitterEngine alloc] initWithDelegate:self];
    [twitterEngine setUsesSecureConnection:NO];
    [twitterEngine setConsumerKey:consumerKey secret:consumerSecret];
    [twitterEngine setUsername:username];

    token = [[OAToken alloc] initWithKey:@"16369316-GgqA00WO0poCAj0XAFhJYDDRthVvWMxTnVyKdfWa1"
                                  secret:@"StrongEnoughForAManButMadeForAWoman"];
    [twitterEngine setAccessToken:token];
    [twitterEngine getHomeTimelineSinceID:0 startingAtPage:0 count:20];
}&lt;/code></pre>
</div>

So obviously I changed my consumer secret and Access Token Secret. You will need to fill this out with your information. Here is how to obtain them.

**Consumer Key & Consumer Secret**

When logged into http://developer.twitter.com/apps/ , click on the application that you created in the first step:

[<img class="alignnone size-full wp-image-1101" title="Screen shot 2010-12-02 at 9.51.55 PM" src="/uploads/2010/Screen-shot-2010-12-02-at-9.51.55-PM.png" alt="" width="322" height="133" />][12]

Scroll down and you should see the Consumer Key and the Consumer Secret.

[<img class="alignnone size-full wp-image-1102" title="Screen shot 2010-12-02 at 9.50.46 PM" src="/uploads/2010/Screen-shot-2010-12-02-at-9.50.46-PM.png" alt="" width="399" height="158" />][13]

**Access Token & Access Token Secret**

In the right column, you should see a link titled &#8220;My Access Token&#8221;. Click on it.

[<img class="alignnone size-full wp-image-1103" title="Screen shot 2010-12-02 at 9.52.05 PM" src="/uploads/2010/Screen-shot-2010-12-02-at-9.52.05-PM.png" alt="" width="218" height="38" />][14]

Now you should see YOUR Access Token and Access Token Secret

[<img class="alignnone size-full wp-image-1104" title="Screen shot 2010-12-02 at 9.52.15 PM" src="/uploads/2010/Screen-shot-2010-12-02-at-9.52.15-PM.png" alt="" width="444" height="156" />][15]

#### Have Fun!

After you copy the tokens, keys, and secrets into the app, you should be able start making calls to Twitter using the engine. Build and run the application at this point and watch your home timeline get output to the console. One thing I want to point out is we are displaying an NSDictionary. That means MGTwitterEngine did all of the parsing for us (using TouchJSON), which is super rad.

One more thing to try for fun is to update your status. It will even show that you updated it from YOUR application on Twitter. Add the following line and run it again.

<div>
  <pre>&lt;code class=’objc’>[twitterEngine sendUpdate:@"@brandontreb is a code gangster!  Check out his #iDevBlogADay post on making your own Twitter client here http://bit.ly/gGrZvI"];&lt;/code></pre>
</div>

Well, that does it for today. Join me next week when I will show you how to move the engine into your own project and we will begin displaying tweets in a basic table view.

Happy Coding!

[Click Here To Go To Part 2][16]

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
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Creating A Twitter Client For OSX - Part 1" data-url="http://brandontreb.com/creating-a-twitter-client-for-osx-part-1"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://brandontreb.com/objective-c-programming-tutorial-creating-a-twitter-client-part-1/
 [2]: http://idevblogaday
 [3]: http://developer.twitter.com/apps
 [4]: http://developer.twitter.com/apps/new
 [5]: https://github.com/mattgemmell/MGTwitterEngine/
 [6]: https://github.com/mattgemmell/MGTwitterEngine/wiki/Building-and-testing-MGTwitterEngine
 [7]: http://code.google.com/p/git-osx-installer/
 [8]: https://github.com/schwa/TouchJSON
 [9]: https://github.com/ctshryock/oauthconsumer
 [10]: /uploads/2010/Screen-shot-2010-12-02-at-9.22.12-PM.png
 [11]: http://brandontreb.com/wp-content/uploads/2010/12/MGTwitterEngine.zip
 [12]: /uploads/2010/Screen-shot-2010-12-02-at-9.51.55-PM.png
 [13]: /uploads/2010/Screen-shot-2010-12-02-at-9.50.46-PM.png
 [14]: /uploads/2010/Screen-shot-2010-12-02-at-9.52.05-PM.png
 [15]: /uploads/2010/Screen-shot-2010-12-02-at-9.52.15-PM.png
 [16]: http://brandontreb.com/creating-a-twitter-client-for-osx-part-2-displaying-tweets/
