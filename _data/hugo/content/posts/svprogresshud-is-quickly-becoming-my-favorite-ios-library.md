---
title: 'SVProgressHUD Is Quickly Becoming My Favorite iOS Library'
date: "2011-12-07T00:00:00.000Z"
type: post 
post_type: article
slug: svprogresshud-is-quickly-becoming-my-favorite-ios-library
tags: 
- Uncategorized
---
From the first time I saw this effect in the Tweetie (now [Twitter for iPhone][1]), I was crazy about it. I had written my own hacks to make something *close*, but it was always terrible. Within the past few months, I have been using a perfect/elegant solution to this problem called [SVProgressHUD][2].</p> 

<img src="https://a248.e.akamai.net/assets.github.com/img/07e5ce2827299e152cd8f57ebb6eecf7ce9feedd/687474703a2f2f662e636c2e6c792f6974656d732f32333159324130743074314a30423072334e30702f737670726f6772657373687564332e706e67" width="550" />

Using this in your project is as easy as calling:

<div class="wp_syntax">
  <div class="code">
    <pre class="objc" style="font-family:monospace;"><span style="color: #11740a; font-style: italic;">// showing</span>
<span style="color: #002200;">&#91;</span>SVProgressHUD showWithStatus<span style="color: #002200;">:</span><span style="color: #bf1d1a;">@</span><span style="color: #bf1d1a;">"Logging in…"</span><span style="color: #002200;">&#93;</span>;
<span style="color: #11740a; font-style: italic;">// hiding</span>
<span style="color: #002200;">&#91;</span>SVProgressHUD dismiss<span style="color: #002200;">&#93;</span>;</pre>
  </div>
</div>

[Clone SVProgressHUD On Github][2]

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="SVProgressHUD Is Quickly Becoming My Favorite iOS Library" data-url="http://brandontreb.com/svprogresshud-is-quickly-becoming-my-favorite-ios-library"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://itunes.apple.com/us/app/twitter/id333903271?mt=8
 [2]: https://github.com/samvermette/SVProgressHUD
