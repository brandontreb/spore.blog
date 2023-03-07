---
title: 'Lua Scripting The UI For Pocket MUD Pro'
date: "2012-05-29T00:00:00.000Z"
type: post 
post_type: article
slug: lua-scripting-the-ui-for-pocket-mud-pro
tags: 
- Uncategorized
- iDevBlogADay
---
I have just updated my MUD client [[Pocket MUD Pro][1]] to be a universal library. It was surprisingly easy to add the iPad support as most of the application was comprised of UITableViews.

The main “MUD” view was the most challenging part as it contains a couple UIWebViews, UIButons, and a UITextField. However, I chose to do something I feel is pretty cool.

#### Scripting The UI With Lua

If I haven’t said it enough, I love lua. Especially in the context of scripting within other applications. Pocket MUD Pro already has complete lua support in triggers in aliases, so I figured I might as well apply that same logic to the UI.

Pocket MUD Pro has 3 core sections for the UI not counting the text input field. The main view (UIWebview), the prompt view (UIWebview), and the button bar (custom UIView).

One of the core challenges I faced on the iPhone, was resizing/reorienting all of these views on orientation change as well as when the keyboard was visible and when it wasn’t. To be honest, I spent most of my cycles getting this part right. On the iPad, I decided to things a little differently which improved the speed of my development overall and paved the way for future updates that will allow user-scripted UIs.

#### The UI Script

I want to start by showing you the lua code that is used to script the UI by default.

<div>
  <pre><code class="’lua’">–MUD 
mudFrame = Frame:new(&quot;mud_frame&quot;) 
mudFrame.type = FrameTypeMUD
mudFrame.portraitFrame = {0,0,768,931}
mudFrame.portraitFrameKeyboard = {0,0,768,667}
mudFrame.landscapeFrame = {0,0,1024,675}
mudFrame.landscapeFrameKeyboard = {0,0,1024,323}
createFrame(mudFrame)</code></pre>
</div>

What’s happening here is, I have created a Frame class that has some properties (type, name, etc…) and injected it into the global lua space for use inside of the UIScripts. Then when the interface gets drawn, I reference the UI script for each of the MUD servers and use it to render the interface.

One interesting thing here is, I set the frames for each of the possible layout scenarios. Portrait, Landscape, with and without the keyboard. That way, when the keyboard hides/dismisses or the user rotates the device, I just reference the this script again and re-render the frame accordingly. This could have been achieved with auto-resizing masks however, it gets much more complex and things get tricky when you want to have a dynamic number of windows.

I follow this exact pattern for the button frames and the prompt frames. As you might have guessed, in a future release, I will open this script area up to MUDders and give the user the ability to script the interface however they would like. Some examples might be:

  * Dedicated map window
  * Dedicated chat window
  * Customized movement buttons
  * Customized backgrounds/borders/themes
  * Custom health/status/mana

Given this powerful UI Scripting style, a user will be able to create complex interfaces such as the one below from inside the app:

<img class="alignnone" title="Achaea" alt="" src="http://img.brothersoft.com/screenshots/softimage/a/achaea-300819-1263188763.jpeg" width="450" />

I still have a ways to go with exposing various functionalities via my custom lua bridge. But things seem to be moving along quite smoothly.

If you want to learn how I was able to bridge lua into my application, consider checking out my talk on lua scripting at [360iDev 2012][2] later this year!

Happy Coding!

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Lua Scripting The UI For Pocket MUD Pro" data-url="http://brandontreb.com/lua-scripting-the-ui-for-pocket-mud-pro"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://itunes.apple.com/us/app/pocket-mud-pro/id511678455?mt=8
 [2]: http://360idev.com/
