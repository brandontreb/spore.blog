---
title: "Idea: Micropub Browser Extension For Replies!!!!!!!"
date: 2023-03-03T00:42:01.921Z
type: post
post_type: article
slug: i8hohphoqfnoaujhlbgtm
tags:
  - indieweb
  - ideas
  - webmention
  - micropub
---
I LOVE finding sites that support [webmentions](https://indieweb.org/Webmention). For me, it's an instant subscribe.  These are people who are looking to build community on the web in a new way.

The process of "replying" and sending a webmention to a post is *still* a bit cumbersome.  Here are the current steps:

1. Read an article that I want to respond to
2. Determine if the article supports webmentions (either they offer a URL box OR you have to view the source to see if they have a webmention endpoint).
3. Copy the URL
4. Paste the URL into the "reply box" in something like [Quill](https://ll.p3k.io)
5. Write your reply

It _works_, but it's not ideal.  Also, the average user is not going to go through the trouble of doing all of this. 

_"There must be a better way..."_

### Solution

I am proposing a brower extension that you would authenticate with your [micropub](https://indieweb.org/Micropub) endpoint using [IndieAuth](https://indieauth.com/).  Once authenticated, the steps to reply to a post become as followed:

1. If the site supports webmentions, the plugin will have an active icon
2. Click the icon to reveal a text box
3. Type your response and click send

(behind the scenes, the extension posts the reply to your blog and then sends a webmention to the URL you are replying to)

This would greatly reduce the friction of using webmentions for responses to posts and I believe would further the adoption of this technology.  

Maybe I will get around to building this someday...

Let me know what you think by sending me a webmention ;)

foo
