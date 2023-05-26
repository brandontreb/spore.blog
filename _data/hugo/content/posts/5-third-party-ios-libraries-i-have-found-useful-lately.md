---
title: '5 Third Party iOS Libraries I Have Found Useful Lately'
date: "2012-08-24T00:00:00.000Z"
type: post 
post_type: article
slug: 5-third-party-ios-libraries-i-have-found-useful-lately
tags: 
- iPhone
---
As I mature as a developer, I try to rely on other people&#8217;s code more an more. Why build something from scratch when a solution already exists that you can fit in your project. In [Pocket MUD Pro][1], I used **13** 3rd party libraries and am using quite a bit more in the project that I&#8217;m currently working on. I figured that I would share some of the libraries that I have been using so that it might save you some time in the future.

## 1. CocoaAsyncSocket

**Link:** <https://github.com/robbiehanson/CocoaAsyncSocket>

Many of my applications involve TCP or UDP networking. There is a lot of boiler plate code involved in every networked application, and CocoaAsyncSocket solves much of that for you.

## 2. Appirater

**Link:** <http://github.com/arashpayan/appirater/>

![Screenshot][2]

Hopefully, you have heard of this one or a similar library by now. It&#8217;s very challenging to get users to want to review your applications, let alone give you a positive review. AppiRater allows you to prompt a user to rate your application based on either number of launches or &#8220;significant events&#8221; which you specify.

## 3. Zip Archive

**Link:** <http://code.google.com/p/ziparchive/>

I try to ship small applications that download assets upon launch. A good way to send these assets over the wire is to zip them up and stick them on your server. I have written an article about this on [iCodeBlog][3].

## 4. Quick Dialog

**Link: ** <https://github.com/escoz/QuickDialog>

Creating forms in iOS is pretty painful. It usually involves custom table cells and a lot of delegate nonsense. QuickDialog takes away some of this pain and allows you to easily create iOS forms. You can even design them using JSON.

![QuickDialog Screenshot][4]

## 5. TSMiniWebBrowser

**Link:** <https://github.com/tonisalae/TSMiniWebBrowser>

Often times, you want a quick and dirty browser in your application. I generally use it to point to in-app documentation or take the user to a page after tapping on a link. It&#8217;s quick and easy.

![Screenshot][5]

I hope you find some value in this list. I&#8217;d love to hear about the libraries **you** use frequently.

Happy Coding!

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="5 Third Party iOS Libraries I Have Found Useful Lately" data-url="http://brandontreb.com/5-third-party-ios-libraries-i-have-found-useful-lately"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://itunes.apple.com/us/app/pocket-mud-pro/id511678455?mt=8
 [2]: http://arashpayan.com/blog/wp-content/uploads/2009/09/AppiraterScreenshot.png
 [3]: http://www.icodeblog.com/2012/08/13/unzipping-files-using-zip-archive/
 [4]: https://github.com/escoz/QuickDialog/raw/master/other/quickdialog2.png
 [5]: https://a248.e.akamai.net/camo.github.com/1cae2dfc9160aa6a8e0583d0682d78462c97d60f/687474703a2f2f646c2e64726f70626f782e636f6d2f752f373630343232322f4769744875622f54534d696e6957656242726f777365722f73686f745f30315f7468756d622e706e67
