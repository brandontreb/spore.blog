---
title: 'Beginning Jailbroken iOS Development &#8211; Getting The Tools'
date: "2011-04-11T00:00:00.000Z"
type: post 
post_type: article
slug: beginning-jailbroken-ios-development-getting-the-tools
tags: 
- iPhone
---
Developing for [jailbroken][1] is actually quite similar to regular iOS development with one addition. More Power! oh oh oh (said in a Tim Taylor voice (sorry for non-Americans that don&#8217;t get the reference)). With your device jailbroken, you have the ability to hook in to pretty much every class that Apple writes allowing you quite a bit of control over the iPhone&#8217;s functionality.

In today&#8217;s tutorial, I will simply be discussing the best way to get up and running with the tools necessary to write a jailbroken iPhone app. We will not be doing any coding, however this tutorial will be necessary for all posts going forward.

**Theos**

There are many ways to go about writing a jailbroken iOS app. Most of them are quite complex. [@DHowett][2] has come up with a brilliant tool called [theos][3] which drastically simplifies the process. My tutorial will pretty much be a regurgitation of his tutorial [found here][3] with some added cheesy jokes.

Theos is a command line utility that essentially generates a template for creating applications, libraries, preference bundles, tools, and mobile substrate hacks. These cover 99% of the jailbroken apps that you are likely to create.

One thing to note is DHowett talks about doing jailbroken iOS development on both Mac and Linux; my tutorials will be Mac-only.

#### Step 1: Install the iOS SDK

You will first need to install the official iOS SDK.

<http://developer.apple.com/devcenter/ios/index.action>

You can register for a free account and download the latest SDK. Once installed reboot your Mac and come back here. I&#8217;ll wait&#8230;

#### Step 2: Setting Up The Environment Variables

Start by deciding on a good location to install theos. The suggested location is */opt/theos*. The only issue with doing it here is you will need to have administrator permissions as well as have to enter your password when updating files. For teaching purposes, I am going to assume you will install it here too.

Open the terminal and type:

<div>
  <pre>&lt;code class=’bash’>export THEOS=/opt/theos&lt;/code></pre>
</div>

What we are doing is setting an environment variable. You can always see if this variable is set by typing *echo $THEOS* in the command line. It will need to be (re)set every time you reopen the terminal to develop a jailbroken app.

#### Step 3: Getting theos

DHowett uses subversion for version control on theos, so you need to make sure and have it installed. If you followed step one above, it should have been installed by default. We will be checking out theos into the THEOS directory specified in step 2.

In the terminal type:

<div>
  <pre>&lt;code class=’bash’>svn co http://svn.howett.net/svn/theos/trunk $THEOS&lt;/code></pre>
</div>

You most likely will be asked for your password. You should now see the */opt/theos* directory created with theos installed.

#### Step 4: Getting ldid

We now need to install the ldid tool. ldid is a tool written by [Saurik][4] (if you don&#8217;t know who he is, stop reading now). Basically, it simulates the signing process for the iPhone, allowing you to install your jailbroken apps/hacks on an actual device.

You can find this tool in many places, however DHowett has generously hosted it for us on his dropbox account.

Now, I had a tricky time getting this to download directly to my */opt/theos* folder. So, I downloaded it to my desktop and then moved it in to */opt/theos/bin/ldid*

<div>
  <pre>&lt;code class=’bash’>curl -s http://dl.dropbox.com/u/3157793/ldid &gt; ~/Desktop/ldid
chmod +x ~/Desktop/ldid
mv ~/Desktop/ldid $THEOS/bin/ldid&lt;/code></pre>
</div>

Alternatively, if you can get it to work properly, do it like DHowett suggests and download it directly into place.

<div>
  <pre>&lt;code class=’bash’>curl -s http://dl.dropbox.com/u/3157793/ldid &gt; $THEOS/bin/ldid; chmod +x $THEOS/bin/ldid&lt;/code></pre>
</div>

#### Step 5: Install dpkg

Dpkg is a tool to bundle up your app into a Debian package for distribution in a Cydia repository. You can install it through Macports.

<div>
  <pre>&lt;code class=’bash’>sudo port install dpkg&lt;/code></pre>
</div>

#### Step 6: Creating A New Project

theos uses a tool called nic (new instance creator) to create a new project. Simply run nic by typing:

<div>
  <pre>&lt;code class=’bash’>$THEOS/bin/nic.pl&lt;/code></pre>
</div>

and it starts the new instance creator. Here is a sample of making a jailbroken application.

<div>
  <pre>&lt;code class=’bash’>brandon-trebitowskis-macbook-pro:Desktop brandontreb$ $THEOS/bin/nic.pl
NIC 1.0 - New Instance Creator
——————————
  [1.] iphone/application
  [2.] iphone/library
  [3.] iphone/preference_bundle
  [4.] iphone/tool
  [5.] iphone/tweak
Choose a Template (required): 1
Project Name (required): FartLight
Package Name [com.yourcompany.fartlight]: com.brandontreb.fartlight
Author/Maintainer Name [Brandon Trebitowski]: 
Instantiating iphone/application in fartlight/…
Done.&lt;/code></pre>
</div>

This will create a new folder with a basic template called fartlight (killer project, I know). In addition to the usual files it will contain a Makefile (for building the application) and a control file (information about the application when it&#8217;s in a Cydia repository).

This should now give you the basis for creating a jailbroken application/tweak/hack. In the next tutorial we will go over building, signing, and deployment. For now, you can check out the project I created with nic called [inPulseNotifier][5]. It&#8217;s a combination of a tweak (5) and a preference bundle (3) for the app settings.

Feel free to ask me a question in the comments and check out #theos on IRC.

**Update** [Check out the next tutorial in this series here][6].

Happy coding!

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Beginning Jailbroken iOS Development - Getting The Tools" data-url="http://brandontreb.com/beginning-jailbroken-ios-development-getting-the-tools"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://en.wikipedia.org/wiki/IOS_jailbreaking
 [2]: http://twitter.com/dhowett
 [3]: http://iphonedevwiki.net/index.php/Theos/Getting_Started
 [4]: http://www.saurik.com/
 [5]: https://github.com/brandontreb/inPulseNotifier
 [6]: /beginning-jailbroken-ios-development-building-and-deployment/
