---
title: 'Displaying Your FeedBurner Subscriber Count Anywhere &#8211; PHP Coding Tutorial'
date: "2009-08-10T00:00:00.000Z"
type: post 
post_type: article
slug: displaying-your-feedburner-subscriber-count-anywhere-php-coding-tutorial
tags: 
- Articles
---
<center>
  <a href="http://feedburner.com"><img src="/uploads/2009/feedburner-logo1.png" alt="feedburner-logo1" title="feedburner-logo1" width="200" height="200" class="alignnone size-full wp-image-438" /></a>
</center>

If you are a serious blogger (and I&#8217;m sure you are), you probably track your RSS subscribers with [FeedBurner][1]. If you don&#8217;t, you should be. One thing that has always bugged me about FeedBurner is if you ever wanted to display the number of subscribers on your blog, you were stuck using their image. The image looks like this:

[<img style="border:0" src="http://feeds.feedburner.com/~fc/brandontreb?bg=99ccff&fg=444444&anim=0" alt="" width="88" height="26" />][2]

I&#8217;m sure you have seen this logo everywhere. Well, not too many people know it, but FeedBurner actually has a very simple API that allows you to just get the subscriber count so you can display it however you would like.

So rather than being limited to this boring icon, you can display your live subscriber count anywhere on your blog. If you are feeling adventurous, you could even super impose it on to your own custom image using the GD library (tutorial to come if sufficient interest, post in the comments if you would like to see it).

Let&#8217;s get started&#8230;

## 1. Activate the Awareness API Inside Of Feedburner

Log in to FeedBurner. Click the **Publicize** tab and the click **Awareness API**. Finally, click **Activate**. The service is now enabled.

[<img class="alignnone size-full wp-image-420" title="awareness_api" src="/uploads/2009/awareness_api.jpg" alt="awareness_api" width="477" height="331" />][3]

## 2. Write The PHP Code To Interface With FeedBurner

There is a lot of data that you could potentially get from FeedBurner, but the code below will just show you how to get your **subscriber count**.

All you need to do is make a simple GET request using CURL to the URL https://feedburner.google.com/api/awareness/1.0/GetFeedData?uri=brandontreb . Of course replacing **brandontreb** with your feed&#8217;s name.

<div>
  <pre>&lt;code class=’php’>&lt;?php

$url    = "https://feedburner.google.com/api/awareness/1.0/GetFeedData?uri=brandontreb";
$ch     = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, $url);
$data = curl_exec($ch); 
curl_close($ch);        
if ($data) {
    echo $data;
    preg_match(‘/circulation=\"([0-9]+)\"/’,$data, $matches);
    if ($matches[1] != 0) {
        $subscriberCount = $matches[1];
    }
}

echo "Join the other $subscriberCount people and subscriber to my RSS feed."

?&gt;&lt;/code></pre>
</div>

This code is pretty straight forward with a little trickiness to parse the XML. We first make a [CURL][4] connection to the URL. Just replace **brandontreb** with the title of your RSS feed inside of FeedBurner.

Next we print the data. Note: You won&#8217;t see the data in your browser unless you do a **view source**. Since it is XML, your browser will treat it like HTML and not display it. So, we do a [preg_match][5] for the element **circulation** and get it&#8217;s value. (Pretty sick right?). The value of our **subscriber count** will be at index 1 of the matches array.

Then, we just print the subscriber count and voila! 

Now, you are no longer a slave to that generic FeedBurner subscriber count icon. Be sure to [check out their API][6] for other cool things that you can do with their web services. If you have any questions, feel free to leave them in the comments section of this post. Happy Coding!

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Displaying Your FeedBurner Subscriber Count Anywhere - PHP Coding Tutorial" data-url="http://brandontreb.com/displaying-your-feedburner-subscriber-count-anywhere-php-coding-tutorial"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://feedburner.com
 [2]: http://feeds.feedburner.com/brandontreb
 [3]: /uploads/2009/awareness_api.jpg
 [4]: http://us3.php.net/curl
 [5]: http://us3.php.net/manual/en/function.preg-match.php
 [6]: http://code.google.com/apis/feedburner/awareness_api.html
