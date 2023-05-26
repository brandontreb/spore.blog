---
title: 'Programming Tip Of The Day #1 &#8211; Ternary Operator'
date: "2009-12-03T00:00:00.000Z"
type: post 
post_type: article
slug: programming-tip-of-the-day-1-ternary-operator
tags: 
- Articles
---
So, I though I&#8217;d start this series called Programming Tip Of The Day to write about useful things I come across in programming. Both to educate my readers and as a personal archive of ideas and tips.

I will kick it off today with a quick rant about the **ternary operator**. I <3 the ternary operator. It&#8217;s quick, efficient and saves a lot of ugly code.

For those of you who don&#8217;t know, the ternary operator is made up of 3 elements: The condition and two results. It is of the form:

## (condition) ? (result if true) : (result if false);

This is much nicer than an if statement. So here is a brief example about how a ternary operator can replace an if-statement.

### if-statement

<div>
  <pre>&lt;code class=’c’>if(isSnowing) {
    iMustBe = "cold";
} else {
    iMustBe = "warm";
}&lt;/code></pre>
</div>

### Same thing using ternary

<div>
  <pre>&lt;code class=’c’>iMustBe = isSnowing ? "cold" : "warm";&lt;/code></pre>
</div>

That is so much easier to read (IMHO). You can even do clever things in printing. Here is a small example in PHP for using the ternary operator when doing an echo.

<div>
  <pre>&lt;code class=’php’>&lt;?php
  echo "I am a ".((height &gt; 72) ? "tall" : "short")." person!";
?&gt;&lt;/code></pre>
</div>

Most languages support the ternary operator. Check out [this wiki page][1] if you want more info.

Happy programming!

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Programming Tip Of The Day #1 - Ternary Operator" data-url="http://brandontreb.com/programming-tip-of-the-day-1-ternary-operator"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://en.wikipedia.org/wiki/Ternary_operation
