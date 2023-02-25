---
title: 'Cocos2D Tutorial &#8211; Dynamically Coloring Sprites'
date: "2011-07-30T00:00:00.000Z"
type: post 
post_type: article
slug: cocos2d-tutorial-dynamically-coloring-sprites
tags: 
- Articles
---
![Custom Bitizens][1]

Have you ever seen a game (such as Tiny Tower) that contains similar sprites that only vary by certain attributes (coloring, shading, accessories, etc&#8230;)? I would often wonder how long it would take the artists to create each permutation of these sprites. After discovering that you can call a method on a CCSprite called setColor, I realized how most of this customization is done in code.

This tutorial will be a continuation of my last post about [creating your own Bitizen in Photoshop][2]. So, if you don&#8217;t already have a Bitizen character to work with, I suggest you follow that tutorial OR download my template [here][3].

#### White Out

As I mentioned above, we are going to be using the setColor method of CCSprite to dynamically color each part of our Bitizen. The way it works is each pixel&#8217;s color is multiplied by the value passed into setColor giving it a &#8220;tint&#8221;. So, pixels that are all white will be fully tinted and pixels that are all black will have no change.

So, our first goal is to create an &#8220;all white&#8221; version of our Bitizen. Don&#8217;t worry about shading for now, I will cover that in a moment. I just started with our Bitizen as a base and created new layers for each of the &#8220;white&#8221; components.

You should end up with 5 new layers:

  * white-head
  * white-skin
  * white-hair
  * white-pants
  * white-shoes

For each layer, trace over the corresponding colored layer. For the &#8220;white-skin&#8221; layer, make sure to trace over the hands as well as the face. This will ensure that your Bitizen&#8217;s color is consistent. When you are done, your Bitizen should look something like this:

![White Bitizen][4]

Looks pretty bland&#8230; The next step is to add our shading. We will be using only black with varying alpha in order to achieve the desired shading. So, make sure to play with it a bit and get the shading to your liking. Add a new shading layer for each component (or simply draw on top of the current layer with the black pencil).

Your bitizen should look something like this after doing all of the shading:

![Shaded Bitzen][5]

#### Chop It Up

The final thing we need to do with our graphic is chop up the pieces so that they can be individually colored. Convert each of the white-* layers to Smart Objects, copy them to a new document, and save them. You should end up with 5 .png files (head.png,skin.png,hair.png,pants.png,shoes.png).

I increased the size of my Bitizen by 4 before doing this step. You might consider increasing their size as well. Remember that the size increase you choose will change some of the values when we recreate the Bitizen in Cocos2D. So, if you want to follow along, make sure your Bitizen is 60&#215;100 before exporting the various parts.

One thing to note is we are going to bring these into Cocos2D as 5 different sprites. There are some optimizations that you could do using sprite sheets, however I want to make things as clear as possible. So, we are going the long way.

[You can download my completed white bitizen here][6].

#### Rebuilding The Bitizen In Cocos2D

Once you have imported the 5 Bitizen image files into Cocos2D, you need to reconstruct them in code. This involves adding each sprite to the layer.

Here is the code to display the skin/head+hands in our layer. As a note, I simply created a new Cocos2D project and am using the retina only mode for my display using [director enableRetinaDisplay:YES]. The offsets will change quite a bit if you are choosing to support non-retina.

<div>
  <pre>&lt;code class=’objc’>int spriteX = 240;
int spriteY = 160;

CCSprite *skin = [CCSprite spriteWithFile:@"skin.png"];
[skin setPosition:ccp(spriteX, spriteY)];
[self addChild:skin];&lt;/code></pre>
</div>

This will draw our white(shaded) head on the screen. That&#8217;s pretty boring so let&#8217;s draw the rest of the body. Update your code to look like the following:

<div>
  <pre>&lt;code class=’objc’>int spriteX = 240;
int spriteY = 160;

CCSprite *skin = [CCSprite spriteWithFile:@"skin.png"];
[skin setPosition:ccp(spriteX, spriteY)];
[self addChild:skin];

int hairOffset = 11;

CCSprite *hair = [CCSprite spriteWithFile:@"hair.png"];
[hair setPosition:ccp(spriteX, spriteY+hairOffset)];
[self addChild:hair];

int shirtYOffset = -9;
int shirtXOffset = 1;

CCSprite *shirt = [CCSprite spriteWithFile:@"shirt.png"];
[shirt setPosition:ccp(spriteX + shirtXOffset, spriteY+shirtYOffset)];
[self addChild:shirt];

int pantsYOffset = -15;
int pantsXOffset = 1;

CCSprite *pants = [CCSprite spriteWithFile:@"pants.png"];
[pants setPosition:ccp(spriteX + pantsXOffset, spriteY+pantsYOffset)];
[self addChild:pants];

int shoesYOffset = -17;
int shoesXOffset = 1;

CCSprite *shoes = [CCSprite spriteWithFile:@"shoes.png"];
[shoes setPosition:ccp(spriteX + shoesXOffset, spriteY+shoesYOffset)];
[self addChild:shoes];&lt;/code></pre>
</div>

Now, you should see the lonely ghost of a Bitizen standing in the center of your screen.

![Ghost Bitizen][7]

Still boring&#8230; Time to spice him up with some color.

#### Tinting Cocos2D Sprites

As I mentioned before, tinting Cocos2D sprites is very simple. I would recommend keeping all sprites that you wish to tint a shade of white/gray otherwise some crazy things will happen.

The setColor method takes an array of integers from 0-255. This array contains 3 numbers (1st for red, 2nd for green, 3rd for blue). For example, we can pass all <font color="red">Red</font> to the setColor method by sending it {255,0,0}.

Let&#8217;s start by tinting our Bitizen&#8217;s shirt a random color. Change the code that displays the shirt to look like this:

<div>
  <pre>&lt;code class=’objc’>CCSprite *shirt = [CCSprite spriteWithFile:@"shirt.png"];
[shirt setPosition:ccp(spriteX + shirtXOffset, spriteY+shirtYOffset)];
ccColor3B shirtColor = {arc4random() % 255,arc4random() % 255,arc4random() % 255};
[shirt setColor:shirtColor];
[self addChild:shirt];&lt;/code></pre>
</div>

Now, every time you run the application, the Bitizen should have a different shirt color. You can apply this principle to each of your sprites to completely customize your Bitizen.

What if you only want to limit certain colors? (you ask). Well, that&#8217;s a great question. I solved this by creating an array of ccColor3Bs. Basically an array of arrays. And then I index into this array and set the color accordingly. Here is an example of setting a random skin color to avoid having blue people (unless maybe you are making Smurfs).

<div>
  <pre>&lt;code class=’objc’>ccColor3B skinColors[] = { 
    {247,224,194},
    {255,232,214},
    {136,119,82},
    {245,232,205},
    {144,110,38}
};
CCSprite *skin = [CCSprite spriteWithFile:@"skin.png"];
[skin setPosition:ccp(spriteX, spriteY)];
ccColor3B skinColor = skinColors[arc4random() % 5];
[skin setColor:skinColor];
[self addChild:skin];&lt;/code></pre>
</div>

I have an array of 5 different arrays and randomly index into it using skinColors[arc4random() % 5]. This will give me a random color within my skin color group.

After running this through a loop and adding random colors to some of the other sprites, I ended up creating the image you see at the top of this post.

#### Conclusion

I hope that this tutorial has found you well and I have demystified the magic that is dynamic sprites. You may download the source code for this tutorial (include the code to generate the screenshot above) [here][8].

If you have any questions or comments, please feel free to leave them in the comments section of this post. Also, make sure you [subscribe to my RSS feed][9] for more great tutorials!

Happy Coding!

<span style="font-family: ‘Lucida Grande’;"><strong><span style="font-weight: normal;"><span style="font-family: arial, verdana, tahoma, sans-serif; font-size: 13px; line-height: 20px;"><em>﻿﻿This post is part of <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://idevblogaday.com/">iDevBlogADay</a>, a group of indie iOS development blogs featuring two posts per day. You can keep up with iDevBlogADay through the <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://idevblogaday.com/">web site</a>, <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://feeds.feedburner.com/idevblogaday">RSS feed</a>, or <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://twitter.com/#search?q=%23idevblogaday">Twitter</a>.</em></span></span></strong></span>

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Cocos2D Tutorial - Dynamically Coloring Sprites" data-url="http://brandontreb.com/cocos2d-tutorial-dynamically-coloring-sprites"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://f.cl.ly/items/42231G3d1P3d1b3H2Q2g/Screen%20shot%202011-07-30%20at%204.39.28%20PM.png
 [2]: http://brandontreb.com/Pixel-Art-Character-Tutorial-Create-A-Bitizen
 [3]: http://cl.ly/2u3h0g2F2H2b1S280519/bitizen.psd
 [4]: http://f.cl.ly/items/0Z08222Z1v233i1G3H1o/Screen%20shot%202011-07-30%20at%204.52.03%20PM.png
 [5]: http://f.cl.ly/items/3f2P3F1b2Z1y1W0W2V3V/Screen%20shot%202011-07-30%20at%203.47.09%20PM.png
 [6]: http://cl.ly/1I102a1F2L323C1R2Y2h
 [7]: http://f.cl.ly/items/090s2v0F1B3d3k3v3V1R/Screen%20shot%202011-07-30%20at%205.10.34%20PM.png
 [8]: http://cl.ly/3h3R2D1p2w2y2X3t0R32
 [9]: http://feeds.feedburner.com/brandontreb
