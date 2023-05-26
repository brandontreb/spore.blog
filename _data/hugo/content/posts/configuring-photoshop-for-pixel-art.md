---
title: 'Configuring Photoshop For Pixel Art'
date: "2011-07-02T00:00:00.000Z"
type: post 
post_type: article
slug: configuring-photoshop-for-pixel-art
tags: 
- Articles
---
First things first. My wife and I had welcomed a new baby boy into the world on Monday so you guys are going to have to see the obligatory &#8220;dad&#8221; pics.

Here they are

![Jack][1]

![Jack][2]

Ok, now that&#8217;s past us, let&#8217;s chat about pixel art. I have always been a HUGE fan of pixel art both in games and as a form of art. As an aspiring game developer (games coming soon 😉 ), I found pixel art a great fit for me. Not only is is aesthetically pleasing, it also allows developers to create &#8220;better&#8221; art than developer art. All it takes is a little patience.

Today, I&#8217;m going to share with you how I have configured Photoshop to create some pixel art and eventually show you how to make your own Bitizens from [Tiny Tower][3] in a follow up post.

Some of you might argue that Photoshop is not the way to go and that there are *better* tools for Pixel art. I have tried quite a few and keep coming back to PS because of some of it&#8217;s great features (shapes, layering, masks, gradients, noise filters, etc&#8230;). We can use a lot of these tools to our advantage when creating pixel art, PS just needs to be set up correctly.

Just a heads up before I start, I&#8217;m using Adobe Photoshop CS3 for Mac.

#### Change The Way Photoshop Scales Images

![][4]

First, we need to change the way PS scales images. This is useful for when you are ready to export your sprites for production. By default, PS uses a Bicubic algorithm when you want to enlarge an image. This generally produces a very blurry effect. It&#8217;s quite useful in many cases, but terrible for pixel art. Here, we need to tell PS to use a &#8220;Nearest Neighbor&#8221; scaling algorithm. This will preserver all of our edges without PS mucking with the blending.

To change this setting, navigate to **Photoshop->Preferences->General**

![Nearest Neighbor][5]

The only setting you need to modify is &#8220;Image Interpolation&#8221;. Make sure to change it to &#8220;Nearest Neighbor&#8221;.

#### Enabling A Grid

When creating pixel art, it is very useful to have a grid in place in order to determine where to place your next pixel. Without it, you are just blindly placing them. To turn on and configure a grid in PS, navigate to **Photoshop->Preferences->Guides, Grid, Slices & Count&#8230;**

![1px gridlines][6]

Make sure to set **Gridline every** to 1 and **Subdivisions** to 1. This will create a 1px grid on for you to use as a guide.

Once you have configured the grid, click on **View->Show->Grid** to display it. You might have to do this for every document.

#### Configuring the Pencil Tool

When creating pixel art in PS, the pencil tool is your best friend. You will use it ~95% of the time when drawing. We need to make sure that the pencil draws single pixel dots without any interpolation. With the pencil tool selected, click the dropdown next to **brush**, tap the **arrow** and then select **basic brushes**. When prompted to replace current brushes, click **OK**.

![Basic Brushes][7]

Next, select the 1 px brush (it should be in the top left). Most of the time, you will want to draw with single pixels.

![1 px brush][8]

#### Creating A New Document

Deciding on a document size can be tricky. You generally want to create your document as small as possible to avoid having to do more work than you need. The size depends on how &#8220;pixellated&#8221; you want your art to look after scaling. Basically, using the scaling we chose above (nearest neighbor), the &#8220;pixels&#8221; will just increase in size.

Here is a blown up view of our 15&#215;25 image that we will use in the next tutorial to create a Bitizen from Tiny Tower.

![New Document][9]

Since the zoom level isn&#8217;t too high, we are seeing grid slices every 2 pixels rather than 1. As you zoom, you will see the grid size increasing.

#### Multiple Zoom Levels In View

One cool trick with PS is, it allows you to have multiple windows of the same document open. The reason this is handy is you can see various zoom levels for your artwork all at once. While drawing each pixel zoomed in, you can see the result in the desired resolution. This helps out dramatically when you are trying to fine tune your work.

To do this, go to **Window->Arrange->New Window for [projectname.psd]** Now you can control the zoom level of each window individually.

<img src="http://f.cl.ly/items/0o2A0E3h0K470v02273G/Screen%20shot%202011-07-02%20at%2012.39.07%20PM.png" width="450" />

In the next post, I will go over how to make these Bitizens as well as some tips for customization as an example for creating dynamic characters. We will also go over some of the basic techniques that were used.

If you have any comments, questions, or Photoshop Pixel Art Tips, please feel free to post them in the comments.

Happy coding!

<span style="font-family: ‘Lucida Grande’;"><strong><span style="font-weight: normal;"><span style="font-family: arial, verdana, tahoma, sans-serif; font-size: 13px; line-height: 20px;"><em>﻿﻿This post is part of <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://idevblogaday.com/">iDevBlogADay</a>, a group of indie iOS development blogs featuring two posts per day. You can keep up with iDevBlogADay through the <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://idevblogaday.com/">web site</a>, <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://feeds.feedburner.com/idevblogaday">RSS feed</a>, or <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://twitter.com/#search?q=%23idevblogaday">Twitter</a>.</em></span></span></strong></span>

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Configuring Photoshop For Pixel Art" data-url="http://brandontreb.com/configuring-photoshop-for-pixel-art"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://images.instagram.com/media/2011/06/30/a63ad6fab0dc4839a604e885a8a85f50_7.jpg
 [2]: http://images.instagram.com/media/2011/07/01/e77e30a4d504437ba75df8a7129f7d9d_7.jpg
 [3]: http://itunes.apple.com/us/app/tiny-tower/id422667065?mt=8
 [4]: /img/post_images/2011/07/bitizens-compare.png
 [5]: http://f.cl.ly/items/023E3D060e2T420f013j/Screen%20shot%202011-07-02%20at%2010.34.22%20AM.png
 [6]: http://f.cl.ly/items/3c1g0r1g1n3S020z3G1K/Screen%20shot%202011-07-02%20at%2010.42.00%20AM.png
 [7]: http://f.cl.ly/items/3G3M3s0M0O2H3J332x0M/Screen%20shot%202011-07-02%20at%2010.57.03%20AM.png
 [8]: http://f.cl.ly/items/3L132f1e2y2z0Y291e0i/Screen%20shot%202011-07-02%20at%2010.53.40%20AM.png
 [9]: http://f.cl.ly/items/110e2542012Y3I3Y2L1i/Screen%20shot%202011-07-02%20at%2012.31.54%20PM.png
