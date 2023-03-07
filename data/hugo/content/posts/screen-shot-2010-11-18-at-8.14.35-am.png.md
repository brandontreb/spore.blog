---
title: 'XCode Tips And Shortcuts To Improve Your Workflow'
date: "2010-11-18T00:00:00.000Z"
type: post 
post_type: article
slug: xcode-tips-and-shortcuts-to-improve-your-workflow
tags: 
- Articles
---
#### Intro

This is my first [#iDevBlogADay][1] post and I wanted to give a quick intro before jumping in. My name is Brandon Trebitowski and I&#8217;m a software developer and author from Albuquerque, New Mexico. I graduated from the University of New Mexico in 2008 with a bachelors degree in computer science. For the past 2 years, I have been writing mobile applications (primarily for the iPhone) for [ELC Technologies][2].

I also started <http://icodeblog.com> and currently write on it about once a month.

#### A Post On XCode Shortcuts?

[<img class="alignleft" title="XCode Shortcuts" src="http://www.1729.us/xcode/Xcode%20Shortcuts.png" alt="" width="130" height="134" />][3]Well, I&#8217;m sure by now, you have seen countless [infographics and &#8220;cheat sheets&#8221;][3] chock full of XCode shortcuts, tips, etc&#8230; These can be great resources, however, if you are anything like me, you see these, tweet the link, and move on never looking at them again. The only difference between these and the XCode key-bindings menu IMHO is a fancy background. So, I thought I would share some of the most important shortcuts that I have adopted to really improve my workflow. We spend so much time inside of XCode, it is worth the time to learn some of these.

#### Build Commands

By now, I would hope that you don&#8217;t click the &#8220;Build and Go/Debug&#8221; with your mouse whenever you want to run your application. If you do, no worries, here are some of the build quick keys.

**⌘ return &#8211; **This builds and launches the application in debug mode.  
**shift ⌘ return **&#8211; Kills the running application in the simulator.  
**shift ⌘ k &#8211; **Cleans the build target.  
**shift ⌘ a &#8211; **Build and Analyze. This is quite possible the most important command to learn. This invokes the static analyzer to help spot memory issues in your code. Run this as early and often as possible.

My general workflow after writing a bit of code is to kill the last run, clean, analyze (hopefully not spend time on memory issues), and then build and debug. These 4 commands in sequence are much faster than searching out the menu items for each of those commands.

#### File Management and Navigation

Navigating around files is one of the most common tasks you will perform in XCode. It is really to your advantage to speed things up.

**option ⌘ ↑** &#8211; This quickly switches between your .h and .m file.  
**⌘ ↑ &#8211; **Move to the top of the file  
**⌘ ↓ &#8211; **Move to the bottom of the file <img class="size-full wp-image-1026 alignright" title="Screen shot 2010-11-18 at 8.14.35 AM" src="/uploads/2010/Screen-shot-2010-11-18-at-8.14.35-AM.png" alt="" width="265" height="188" />  
**shift ⌘ d &#8211; **This was recently showed to my by [@cruffenach][4] and it has drastically sped up my workflow. This is the command for &#8220;Open Quickly&#8221;. It brings up a small window with a search box at the top. Typing in the box instantly searches your project and allows you to quickly open up files by pressing return on the selected file. I can&#8217;t believe I had been using XCode for so long before I found out about this command.

#### Binding Your Own Quick Keys

Some commands simply don&#8217;t have quick keys. For example, I constantly use the **Edit -> Sort -> By Name** command to sort my source files alphabetically. By default, you must click through all of the menus and select the command to get it to work. However, XCode (like most OSX applications) will allow you to define your own quick keys and here&#8217;s how.

  1. Open up the XCode Preferences
  2. Click on the Key Bindings tab
  3. Navigate to the command that you want to bind keys for. (hint: they are organized the same way they in the top menu)
  4. Once you have found the command, double click in the Key column
  5. Press the keys that you wish to bind (I bound **option shift ⌘ s** for sorting)
  6. If there are any conflicts, XCode will let you know. Otherwise, press apply and you&#8217;re good to go.

#### Wrap Up

Well, this concludes my relatively short first post for [#idevblogaday][1]. If you have any shortcuts of your own that you can&#8217;t live without, please share them in the comments. I&#8217;m always up to improve my workflow.

Thank you to everyone (especially [@mysterycoconut][5]) for allowing me to be a part of this community and I look forward to sharing my knowledge and experiences with you.

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
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="XCode Tips And Shortcuts To Improve Your Workflow" data-url="http://brandontreb.com/xcode-tips-and-shortcuts-to-improve-your-workflow"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://idevblogaday.com
 [2]: http://elctech.com/
 [3]: http://www.1729.us/xcode/Xcode%20Shortcuts.png
 [4]: http://twitter.com/cruffenach
 [5]: http://twitter.com/mysterycoconut
