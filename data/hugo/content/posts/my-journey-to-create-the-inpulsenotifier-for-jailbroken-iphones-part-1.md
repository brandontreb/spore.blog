---
title: 'My Journey To Create The inPulseNotifier For Jailbroken iPhones &#8211; Part 1'
date: "2011-04-12T00:00:00.000Z"
type: post 
post_type: article
slug: my-journey-to-create-the-inpulsenotifier-for-jailbroken-iphones-part-1
tags: 
- iPhone
---
Many of you may have seen my tweets or blog posts regarding my development of a native iOS interface for the [inPulse Watch][1]. I just wanted to share a bit with you about the development process and talk about my updates moving forward.

#### What is the inPulse Watch?

For those of you who don&#8217;t know, the inPulse watch is a programmable wristwatch with a bluetooth controller. It can run a single app at a time on top of it&#8217;s firmware that is installed on the watch via a bluetooth interface with your computer. People have written all sorts of apps from analog clocks to roguelikes and Connway&#8217;s Game of Life. Check out <http://inpulsewatch.com/watchapps.asp> to see the latest apps.

<center>
  <br /> <img src="http://ec2-50-16-103-63.compute-1.amazonaws.com/images/inPulse.png" style="float:left;margin:25px;" width="100" /><br /> <img src="http://inpulsewatch.com/apps/logo14.JPG" style="float:left;margin:25px;" width="100" /><br /> <img src="http://inpulsewatch.com/apps/logo12.jpg" style="float:left;margin:25px;" width="100" /><br />
</center>

<div style="clear:both">
  &#038;nbsp
</div></p> 

#### It Begins

After waiting about 10 days for my watch (yeah it&#8217;s a long waiting period since they have seen quite a bit of recent success), it finally came in the mail. Enthusiastically, I opened it up and followed their [getting started guide][2]. Within a few minutes I was running some of the sample applications in the forums.

#### No iOS Support?

One of the coolest features of the watch is the ability to have your smartphone notifications show up on it. You are able to read SMS, Email, Calendar, etc&#8230; for a wide variety of Blackberry and Android phones.

After digging around a bit, I was disappointed to see that there was limited (no) iPhone support. They had some old file that used BTStack at some point to communicate a simple canned message to the iPhone. No documentation, no support, nada.

#### Building The App

<img src="http://code.google.com/p/btstack/logo?cct=1278342571" style="float:left;margin:5px;" />

As I had no experience developing for a jailbroken iPhone, I had no idea how to even compile this sample app. So, I used the Google machine and found the [Google repository][3] for BTStack (the bluetooth library of choice for jailbroken iOS apps). I was able to download the source and build a sample application that basically connected my iPhone to a bluetooth device.

Well, this got me started. So I did what any curious developer would do and started plugging crap in. I replaced the sample file that was packaged with BTStack with a slightly modified version of inPulse&#8217;s sample iPhone file. Sure enough, I was able to build and install it.

#### We Have Connection

After figuring out how to hardcode my watch&#8217;s address into the source, I was able to determine that the iPhone had actually connected to the watch. I monitored the packets and threw up an alert view (No NSLogging available at this point) when a connection was made.

So, now that we are connected, let&#8217;s trying sending the sample message&#8230;fail! I couldn&#8217;t even send the time.

At this point, I decided to move the code I had written into a sample iPhone project so that I could do attached debugging. This showed me that the packets were arriving on the watch since I received an ack packet back. So, the watch sees the messages, but doesn&#8217;t consider them notifications.

#### Time to hit the docs

<img src="/img/post_images/2011/04/pulse_protocol.png" style="float:right" />  
Knowing that the packets were received gave me quite a bit of hope. I figured that I must have had the protocol incorrect. So, I dug into the inPulse protocol document which outlined what the packet structures should look like. My C skills aren&#8217;t the strongest so I had to look up quite a few things.

Sure enough, they had upped the version number of their protocol by 1 and mine was outdated. So, I updated what I could and gave it another shot&#8230;fail.

No messages were displaying. At this point I was ready to give up. I read online somewhere that the BT implementation on the watch was not supported by inPulse and felt dead in the water. So I took a break for a couple days.

When I came back to it, I was tapping through my watch and noticed that the calendar appointments had some data in them on the watch. Could it be? Did my notifications arrive? (I was trying to send SMS notifications). So I dug into the docs again&#8230;

#### We have a message!!!

<img src="/img/post_images/2011/04/hello_world.jpg" style="float:left;margin:10px;" width="200" />

Sure enough, I had some fields declared as * uint16_t * when they should have been * uint8_t * . My headers were the wrong size!!! All of a sudden I was able to send every type of notification to the watch and have it displayed.

It was now time to build out an actual application for release to inPulse. The next hurdle would be hooking into the iPhone&#8217;s messaging system and forwarding along the messages. Now the real iPhone hacking begins.

[This post is continued here][4]

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="My Journey To Create The inPulseNotifier For Jailbroken iPhones - Part 1" data-url="http://brandontreb.com/my-journey-to-create-the-inpulsenotifier-for-jailbroken-iphones-part-1"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://getinpulse.com
 [2]: http://www.getinpulse.com/guide/
 [3]: http://code.google.com/p/btstack/
 [4]: /my-journey-to-create-the-inpulsenotifier-for-jailbroken-iphones-part-2
