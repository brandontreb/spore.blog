---
title: 'Twitter API Programming Tutorial With PHP &#8211; Intro'
date: "2009-02-20T00:00:00.000Z"
type: post 
post_type: article
slug: twitter-api-programming-tutorial-with-php-intro
tags: 
- Articles
---
<center>
  <a href="/uploads/2009/picture-15.png"><img src="/uploads/2009/picture-15.png" alt="picture-15" title=&uuot;picture-15" width="400" height="125" class="alignnone size-full wp-image-85" /></a>
</center>

<span color="#000000">I have recently started using Twitter and completely fell in love with it. Being a programming, this naturally made me want to develop applications for interfacing with it. So, I scoured the internet (checking Twitter&#8217;s website as well) to find good *<span style="color: #ff0000;">simple</span> tutorials for doing this. After searching for a while, I couldn&#8217;t really find any. Ok, I lied, I found a few but they were terrible. I hate tutorials that assume the reader knows more than they actually do. </span>

<span style="color: #000000;">So, I am taking it upon myself to write a series of comprehensive tutorials for interfacing with Twitter. I will first do them all in PHP and then maybe in some other languages. I may even do some in Objective-C to be implemented on the iPhone. These would be written of course at iCodeBlog.com 😉 .</span>

<span style="color: #ff0000;"><span style="color: #000000;">Let&#8217;s just jump right in. Twitter offers a few ways to interface with their web services, which are all documented on their <a href="http://apiwiki.twitter.com/">API Wiki</a>. The documentation is great, assuming you know the code to get connected and make the calls. So, let&#8217;s skip all of the nerdy low level stuff and write an application.</span></span>

<span style="color: #ff0000;"><span style="color: #000000;">Today, I will be teaching you how to simply connect to Twitter and update your status. This will be pretty straight forward and require very little PHP code. So, grab some coffee, open up your favorite PHP editor (notepad?).</span></span>

<span>Ok, so let&#8217;s start by wrapping our code into an easy to call function. We don&#8217;t want to have to copy and paste our Twitter interface code every time we need it in a project. Wouldn&#8217;t it be nice if we could just call it like this</span>

<div>
  <pre>&lt;code class=’php’>updateTwitter("Just Rockin Out")&lt;/code></pre>
</div>

<span>So let&#8217;s begin by declaring a function called <b>updateTwitter</b>. Type the following code</p> 

<div>
  <pre>&lt;code class=’php’>function updateTwitter($status){ 
    // Twitter login information 
    $username = "TwitterUsername"; 
    $password = "TwitterPassword";&lt;/code></pre>
</div>

<p>
  <span>Our function begins with a declaration of a username and password. This will be <i>your</i> Twitter login information. Every Twitter API call requires that you authenticate yourself. Make sure you update the code to include <i>your</i> username and password/</span>
</p>

<p>
  <span>Next, we will add the following code to initialize the variables needed to make our Twitter API call. Continue by adding the following code.</span>
</p>

<div>
  <pre>&lt;code class=’php’>// The url of the update function 
    $url = ‘http://twitter.com/statuses/update.xml’; 
    // Arguments we are posting to Twitter 
    $postargs = ‘status=’.urlencode($status); 
    // Will store the response we get from Twitter 
    $responseInfo=array(); 
    // Initialize CURL 
    $ch = curl_init($url);&lt;/code></pre>
</div>

<p>
  <span>One thing I want to point out is the URL. Notice the update.xml at the end of it. This is telling the Twitter API we want to call the <b>update</b> function and we expect to receive <b>xml</b> back. You could also change it to be <b>update.json</b> if you want to receive json data back.</span>
</p>

<p>
  <span>The next variable <b>postargs</b> is simply the arguments we will pass to the update function. Since these arguments get appended to the URL, they need to be urlencoded. The <b>responseInfo</b> array will contain the return data from the cURL request to Twitter. Finally, we just initialize a new cURL session. cURL is just a protocol for transferring data. You can read up on it <a href="http://en.wikipedia.org/wiki/CURL">on Wikipedia</a> if you feel so inclined.</span>
</p>

<p>
  <span>Next, we need to tell cURL to do a POST rather than a GET and pass it our argument string</span>
</p>

<div>
  <pre>&lt;code class=’php’>// Tell CURL we are doing a POST 
    curl_setopt ($ch, CURLOPT_POST, true); 
    // Give CURL the arguments in the POST 
    curl_setopt ($ch, CURLOPT_POSTFIELDS, $postargs);&lt;/code></pre>
</div>

<p>
  <span>The next part is where the magic happens. Here is the next bit of code (I&#8217;ll explain it below)&#8230;</span>
</p>

<div>
  <pre>&lt;code class=’php’>// Set the username and password in the CURL call 
    curl_setopt($ch, CURLOPT_USERPWD, $username.’:’.$password); 
    // Set some cur flags (not too important) 
    curl_setopt($ch, CURLOPT_VERBOSE, 1); 
    curl_setopt($ch, CURLOPT_NOBODY, 0); 
    curl_setopt($ch, CURLOPT_HEADER, 0); 
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    // execute the CURL call 
    $response = curl_exec($ch); 
    // Get information about the response 
    $responseInfo=curl_getinfo($ch); 
    // Close the CURL connection curl_close($ch);&lt;/code></pre>
</div>

<p>
  <span>Wow! that looks like a lot of nerdy code. Good thing you only have to write it once and don&#8217;t have to understand it (unless you want to). The first line sets the username and password fields in our cURL call. When we first connect with the Twitter API, it will prompt for a username and password. cURL will automatically feed the username and password to the API. </span> <span>The next few lines are not super important. If you one of those people that get hung up on that sort of thing, you can read about them <a href="http://us.php.net/curl">here</a>. We&#8217;re almost done, I promise&#8230;</span> <span>Finally, we make the cURL call itself by calling curl_exec. This will return a response <b>from Twitter</b> which will contains some XML if your call completed successfully. The next line, gets the http response (makes sure you were able to connect to Twitter). If it is anything other than 200 (HTTP OK), it means your cURL request never even reached Twitter.</span> <span>Here is the last bit of code</span>
</p>

<div>
  <pre>&lt;code class=’php’>// Make sure we received a response from Twitter 
    if(intval($responseInfo[‘http_code’])==200){ 
        // Display the response from Twitter 
        echo $response; 
    }else{ 
        // Something went wrong 
        echo "Error: " . $responseInfo[‘http_code’]; 
    } 
} 
?&gt;&lt;/code></pre>
</div>

<p>
  <span>All this code really does is makes sure we got a 200 code (successfully reached Twitter). If so, it prints out the XML that Twitter returned to us. </span> <span>Now you have a handy-dandy function you can call whenever we want to update your Twitter status from your website. Simply type</span>
</p>

<div>
  <pre>&lt;code class=’php’>updateTwitter("Just finished a sweet tutorial on http://brandontreb.com")&lt;/code></pre>
</div>

<p>
  <span>and like magic, your Twitter status will be updated. This has many different uses as you can imagine. Join me next time when I will be putting this code into a PHP class as well as implementing the rest of the Twitter API functions. We will then be able to use this Twitter class in a variety of PHP applications. So , be sure to <a href="http://feeds2.feedburner.com/brandontreb">subscribe to my RSS feed</a> and feel free to ask me any questions in the comments section of this post. You can also download the source code of this tutorial here&#8230; (insert clever tag line here (iCodeBlog&#8217;s is happy iCoding, I need a new one)). </span>
</p>

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Twitter API Programming Tutorial With PHP - Intro" data-url="http://brandontreb.com/twitter-api-programming-tutorial-with-php-intro"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>
