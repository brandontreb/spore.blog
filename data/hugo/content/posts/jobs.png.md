---
title: 'Image Manipulation: Retrieving And Updating Pixel Values For A UIImage'
date: "2011-01-06T00:00:00.000Z"
type: post 
post_type: article
slug: image-manipulation-retrieving-and-updating-pixel-values-for-a-uiimage
tags: 
- iDevBlogADay
---
<div id="attachment_1371" class="wp-caption alignright" style="width: 410px">
  <a href="/uploads/2011/jobs.png"><img class="size-full wp-image-1371 " title="jobs" src="/uploads/2011/jobs.png" alt="" width="400" height="224" /></a> 
  
  <p class="wp-caption-text">
    Grayscale Jobs
  </p>
</div>

With the recent success of cool photo manipulation apps such as Camera+ and Instagram, it got me wondering. How do these photo apps modify the pixel data of the image.

After doing a bit of research on the subject, I found countless posts on Stack Overflow and the Developer forums about various methods to get and set the pixel values of a UIImage. Most of them unanswered or partially answered. I tested out many solutions and banged my head on my computer into the whee hours of the morning with no success. Every solution I tried seemed to completely destroy the image.

It wasn&#8217;t until this morning, I had an &#8220;aha&#8221; moment, changed one line of code and was able to produce a grayscale version of a UIImage.

Having the ability to get and set pixel values of a UIImage is super important if you want to create a photo related app that has &#8220;Filters&#8221;. Once you know the basics, you can apply your ninja math skillz to implement cool filter algorithms on the pixels. Below, I will show you onc such algorithm for converting an image to grayscale (it&#8217;s not *that* clever).

I should note, that a good majority of my code comes from Olie&#8217;s solution on this [Stack Overflow post][1]. His example simply returns and array of UIColor objects for a given image. Mine will modify those colors and write them back to a UIImage.

#### Converting A UIImage Into A Pixel Array

Here is the first part of our grayscale method. It is creating a char array from a global UIImage property named workingImage.

<div>
  <pre>&lt;code class=’objc’>- (IBAction) grayscale:(id) sender {
    CGContextRef ctx;
    CGImageRef imageRef = [self.workingImage CGImage];
    NSUInteger width = CGImageGetWidth(imageRef);
    NSUInteger height = CGImageGetHeight(imageRef);
    CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
    unsigned char *rawData = malloc(height * width * 4);
    NSUInteger bytesPerPixel = 4;
    NSUInteger bytesPerRow = bytesPerPixel * width;
    NSUInteger bitsPerComponent = 8;
    CGContextRef context = CGBitmapContextCreate(rawData, width, height,
    bitsPerComponent, bytesPerRow, colorSpace,
    kCGImageAlphaPremultipliedLast | kCGBitmapByteOrder32Big);
    CGColorSpaceRelease(colorSpace);

    CGContextDrawImage(context, CGRectMake(0, 0, width, height), imageRef);
    CGContextRelease(context);
    .
    .
    .&lt;/code></pre>
</div>

This is a lot of Core Graphics fanciness that isn&#8217;t super important to understand. It&#8217;s just getting the RGBA values from the image and writing them into the rawData char array. There are 4 bytes per pixel (red, green, blue, alpha), so this array contains 4 \* height \* width elements.

#### Modifying The Pixels of a UIImage

Here is where the magic happens. You can replace this code with the logic necessary to apply the filter you are making. Another clever way to approach this would be to pass this code in as a block into the method (I&#8217;ll leave that as an exercise for the reader :)).

<div>
  <pre>&lt;code class=’objc’>.
.
.
    int byteIndex = 0;
    for (int ii = 0 ; ii &lt; width * height ; ++ii)
    {
    int outputColor = (rawData[byteIndex] + rawData[byteIndex+1] +
        rawData[byteIndex+2]) / 3;

    rawData[byteIndex] = (char) (outputColor);
    rawData[byteIndex+1] = (char) (outputColor);
    rawData[byteIndex+2] = (char) (outputColor);

        byteIndex += 4;
    }

.
.
.&lt;/code></pre>
</div>

The first part is pretty straight forward, we have a for loop that goes from 0 to width * height. We index into the rawData array using a counter that we increment by 4 each time (remember 4 bytes per pixel). As you can imagine, the first pixel (rawData[byteIndex]) represents the red pixel, then green for +1, blue for +2, and finally alpha for +3. Note that the alpha byte is last because kCGImageAlphaPremultipliedLast flag above.

In order to do grayscale, we simple set all of the color values to the average color value. So, for example the color \[218,232,244\] (which is the light blue color of the WordPress editor&#8217;s toolbar) would be converted to [231,231,231] which is a fairly light gray color.

The most important step that everyone in the forums seemed to miss was casting the new value to a char. Remember we are using a char array, setting ints as values will generally screw up your image. (This was my &#8220;aha&#8221; moment that I mentioned above)

#### Writing The Pixels Back To a UIImage

The final step is to write the pixel data back to a UIImage. Again, I borrowed some of this code from somewhere else and unfortunately lost the link. If I find it, I will update the post.

<div>
  <pre>&lt;code class=’objc’>.
.
.
    ctx = CGBitmapContextCreate(rawData,
        CGImageGetWidth( imageRef ),
        CGImageGetHeight( imageRef ),
        8,
        CGImageGetBytesPerRow( imageRef ),
        CGImageGetColorSpace( imageRef ),
        kCGImageAlphaPremultipliedLast ); 

    imageRef = CGBitmapContextCreateImage (ctx);
    UIImage* rawImage = [UIImage imageWithCGImage:imageRef];  

    CGContextRelease(ctx);  

    self.workingImage = rawImage;  

    free(rawData);
}&lt;/code></pre>
</div>

All we are doing here is creating a new Bitmap Context, writing it to our CGImageRef and constructing a new UIImage from that CGImageRef. Finally, we just update our workingImage with the modified one. Fancy, I know&#8230;

Now, much of this code is to work with my example (download below), but it could easily be tweaked to fit within your super awesome photo app. If you have any questions or comments PLEASE leave them here or send them to me on Twitter (but probably leave them here 😉 ).

[Download The Sample Source Project][2]

  * Note on the sample code: Before you give me crap about doing this in the main thread, I know. Don&#8217;t do these operation on the main thread. The example is meant to be quick and dirty and by no means is ready for production. Enjoy!

<span style="font-family: ‘Lucida Grande’;"><strong><span style="font-weight: normal;"><span style="font-family: arial, verdana, tahoma, sans-serif; font-size: 13px; line-height: 20px;"><em>﻿﻿This post is part of <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://idevblogaday.com/">iDevBlogADay</a>, a group of indie iOS development blogs featuring two posts per day. You can keep up with iDevBlogADay through the <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://idevblogaday.com/">web site</a>, <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://feeds.feedburner.com/idevblogaday">RSS feed</a>, or <a style="text-decoration: none; color: #004199; padding: 0px; margin: 0px;" href="http://twitter.com/#search?q=%23idevblogaday">Twitter</a>.</em></span></span></strong></span>

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Image Manipulation: Retrieving And Updating Pixel Values For A UIImage" data-url="http://brandontreb.com/image-manipulation-retrieving-and-updating-pixel-values-for-a-uiimage"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://stackoverflow.com/questions/448125/how-to-get-pixel-data-from-a-uiimage-cocoa-touch-or-cgimage-core-graphics
 [2]: http://brandontreb.com/wp-content/uploads/2011/01/ImageManip.zip
