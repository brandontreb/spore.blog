---
title: 'Beginning Jailbroken iOS Development &#8211; Building And Deployment'
date: "2011-04-22T00:00:00.000Z"
type: post 
post_type: article
slug: beginning-jailbroken-ios-development-building-and-deployment
tags: 
- iPhone
---
Welcome to the next installment of my jailbroken iOS development series. If you haven&#8217;t already done so, read my previous post to get up to speed.

[Beginning Jailbroken iOS Development &#8211; Getting The Tools][1]

Now that your environment has been set up, it&#8217;s time to start hacking your project, building, and deploying it. This tutorial will be fairly quick and will just demonstrate how to build a .deb file and install it on your device. This will not cover creating a Cydia repository for public access (this is for a later tutorial).

#### Introduction

Start by creating a simple project. Refer to the [previous tutorial][1] to determine how to do this. I will use the example of the #1 iphone/application and will be calling it fooProject.

<div>
  <pre>&lt;code class=’bash’>$/opt/theos/bin/nic.pl
NIC 1.0 - New Instance Creator
——————————
  [1.] iphone/application
  [2.] iphone/library
  [3.] iphone/preference_bundle
  [4.] iphone/tool
  [5.] iphone/tweak
Choose a Template (required): 1
Project Name (required): fooProject
Package Name [com.yourcompany.fooproject]:    
Author/Maintainer Name [Brandon Trebitowski]: 
Instantiating iphone/application in fooproject/…
Done.&lt;/code></pre>
</div>

This will create a new directory for our project with the following files.

  1. **control**: Contains information about your application/tweak. This is the info you see when you install something from Cydia (name, author, version, etc&#8230;)
  2. **[applicationName]Application.mm**: This is essentially your appDelegate file. It creates a window, adds your RootViewController and displays it.
  3. **main.m** : Same main file that you would use in an iPhone project. Just initializes your [applicationName]Application.mm file on launch.
  4. **Makefile**: contains the necessary build commands to compile your project. I&#8217;ll go over this in detail in a bit
  5. **Resources**: This folder contains your info.plist and is also where you can place all of your images
  6. **RootViewController.h/mm**: A simple view controller

#### The Makefile

theos provides some great tools that simplify the build process as much as possible. I know some of you might shudder at the sound of a Makefile, but trust me, it&#8217;s very painless.

Let&#8217;s first take a look at the anatomy of the Makefile that was generated.

<div>
  <pre>&lt;code class=’bash’>include theos/makefiles/common.mk&lt;/code></pre>
</div>

This line simply tells theos to include the common make commands in your build script to save you some work.

<div>
  <pre>&lt;code class=’bash’>APPLICATION_NAME = fooProject&lt;/code></pre>
</div>

The name of the application we are building. The Makefile will use this constant to do a number of things under the hood. Don&#8217;t modify this unless your application changes names.

<div>
  <pre>&lt;code class=’bash’>[applicationName]_FILES = main.m fooProjectApplication.mm RootViewController.mm&lt;/code></pre>
</div>

This is the meat of the Makefile. It&#8217;s the list of m (or mm in this case) files that need to be compiled. *Note: you do not add your .h files here. So, whenever you add a new .m file to the project, make sure to append it to this list or it won&#8217;t get built.

<div>
  <pre>&lt;code class=’bash’>[applicationName]_FRAMEWORKS = UIKit Foundation QuartzCore AudioToolbox CoreGraphics&lt;/code></pre>
</div>

This line is not included by default, but is needed if you want to use ANY frameworks; be them Apple&#8217;s or h4x0red ones.

<div>
  <pre>&lt;code class=’bash’>include $(THEOS_MAKE_PATH)/application.mk&lt;/code></pre>
</div>

More defaults to help theos build your project.

#### Setting up Your Environment

Do you remember in the last tutorial that we had to set an environment variable in order to use theos? Well, we need to set a couple more to build and deploy.

Here are the 3 that you MUST have.

<div>
  <pre>&lt;code class=’bash’>export THEOS=/opt/theos/
export SDKVERSION=4.3
export THEOS_DEVICE_IP=192.168.1.122&lt;/code></pre>
</div>

<img src="/img/post_images/2011/04/sbsettings.png" style="float:right;padding:5px" />

The first line, you should have already done. Otherwise you would not have been able to run the nic tool above. The second defines your current SDK version. This will tell theos where to look for your frameworks and whatnot. (ex If you only have 4.2 installed, set this to 4.2). Finally, the last line, tells theos the ip address of your device.

Once theos does the package install, it will sftp the package to your device for installation. One thing to note here is your iPhone MUST be on the same network as the computer you are developing on.

If you don&#8217;t know your device&#8217;s ip address, it&#8217;s in the SBSettings menu. If you don&#8217;t have SBSettings, go download it from Cydia and think about why you would have a jailbroken device without this app installed&#8230;

<div style="clear:both">
  &nbsp;
</div>

#### Building The Project

Building is just as easy as running the make command inside of your project&#8217;s root directory.

Here is an example of building my fooProject app using the command:

**make**.

<div>
  <pre>&lt;code class=’bash’>$ make
Making all for application fooProject…
 Compiling main.m…
 Compiling fooProjectApplication.mm…
 Compiling RootViewController.mm…
 Linking application fooProject…
 Stripping fooProject…
 Signing fooProject…&lt;/code></pre>
</div>

If your project contains errors, they will be flushed out here. Also, theos treats warnings as errors (as should you) 😉 . So, if you have any warnings you won&#8217;t be able to build.

When you are ready to distribute your application, you must build a .deb package. Luckily, theos does this for us with a simple command:

**make package**.

<div>
  <pre>&lt;code class=’bash’>make package
Making all for application fooProject…
make[2]: Nothing to be done for ‘internal-application-compile’.
Making stage for application fooProject…
 Copying resource directories into the application wrapper…
dpkg-deb: building package ‘com.yourcompany.fooproject’ in ‘/Users/brandontreb/Desktop/fooproject/com.yourcompany.fooproject_0.0.1-1_iphoneos-arm.deb’.&lt;/code></pre>
</div>

You should now see a file like *com.yourcompany.fooproject\_0.0.1-1\_iphoneos-arm.deb* in your project&#8217;s root directory. One great feature of theos is it handles versioning automatically. So subsequent builds will increment the build number. If you change your version in the info.plist file, it will start the build counter over (2-1, 2-2, etc&#8230;).

At this point, you *could* sftp this file to your device and run:

<div>
  <pre>&lt;code class=’bash’>dpkg -i com.yourcompany.fooproject_0.0.1-1_iphoneos-arm.deb&lt;/code></pre>
</div>

as root to test the installation. However, that is quite a bit of a pain. Luckily, theos will do all of this for you by simply using the command:

**make package install**

<div>
  <pre>&lt;code class=’bash’>$ make package install
Making all for application fooProject…
make[2]: Nothing to be done for `internal-application-compile’.
Making stage for application fooProject…
 Copying resource directories into the application wrapper…
dpkg-deb: building package ‘com.yourcompany.fooproject’ in ‘/Users/brandontreb/Desktop/fooproject/com.yourcompany.fooproject_0.0.1-3_iphoneos-arm.deb’.
install.copyFile "/Users/brandontreb/Desktop/fooproject/com.yourcompany.fooproject_0.0.1-3_iphoneos-arm.deb" "com.yourcompany.fooproject_0.0.1-3_iphoneos-arm.deb"
root@192.168.1.122’s password: 
com.yourcompany.fooproject_0.0.1-3_iphoneos-arm.deb                                                                                                                                                                                                                              100% 4434     4.3KB/s   00:00    
install.exec "dpkg -i com.yourcompany.fooproject_0.0.1-3_iphoneos-arm.deb"
root@192.168.1.122’s password: 
Selecting previously deselected package com.yourcompany.fooproject.
(Reading database … 2006 files and directories currently installed.)
Unpacking com.yourcompany.fooproject (from com.yourcompany.fooproject_0.0.1-3_iphoneos-arm.deb) …
Setting up com.yourcompany.fooproject (0.0.1-3) …&lt;/code></pre>
</div>

You will have to enter your password several times during the process. The default is **alpine**.

After this has been run, you will need to restart (or respring) your iPhone. Respringing takes a simple button tap if you have SBSettings installed (have you installed it yet?).

#### Conclusion

You now have all of the tools needed to start hacking your very first jailbroken iOS application. In the next tutorial, we are going to learn about MobileSubstrate hacks and how to overwrite Apple functionality. I will give a basic example of how to display an alert message every time your device boots up.

Until next time, happy hacking!

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Beginning Jailbroken iOS Development - Building And Deployment" data-url="http://brandontreb.com/beginning-jailbroken-ios-development-building-and-deployment"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: /beginning-jailbroken-ios-development-getting-the-tools/
