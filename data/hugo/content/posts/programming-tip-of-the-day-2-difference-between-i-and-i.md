---
title: 'Programming Tip Of The Day #2 &#8211; Difference Between i++ and ++i'
date: "2009-12-04T00:00:00.000Z"
type: post 
post_type: article
slug: programming-tip-of-the-day-2-difference-between-i-and-i
tags: 
- Articles
---
To some, this should seem a bit obvious and if I am insulting your intelligence by discussing it, I am sorry. But, one of the main reasons I want to discuss this topic is, I was asked this question in a job interview for Lockheed Martin.

**What is the difference between i++ and ++i?**

The answer is actually quite simple.

### <span style="color: #00ccff;">i++</span> first evaluates the value of i and then increments it

### <span style="color: #00ccff;">++i</span> increments the value of i and then evaluates it

Here is a brief example to demonstrate what I mean.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="php" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">// Example: i++ </span>
<span style="color: #000088;">$i</span> <span style="color: #339933;">=</span> <span style="color: #cc66cc;">5</span><span style="color: #339933;">;</span>
<span style="color: #b1b100;">echo</span> <span style="color: #0000ff;">"The value of i is "</span> <span style="color: #339933;">.</span> <span style="color: #000088;">$i</span><span style="color: #339933;">++</span> <span style="color: #339933;">;</span>
<span style="color: #666666; font-style: italic;">// Output "The value of i is 5"</span>
<span style="color: #666666; font-style: italic;">// i = 6</span>
&nbsp;
<span style="color: #666666; font-style: italic;">// Example: ++i </span>
<span style="color: #000088;">$i</span> <span style="color: #339933;">=</span> <span style="color: #cc66cc;">5</span><span style="color: #339933;">;</span>
<span style="color: #b1b100;">echo</span> <span style="color: #0000ff;">"The value of i is "</span> <span style="color: #339933;">.</span> <span style="color: #339933;">++</span><span style="color: #000088;">$i</span><span style="color: #339933;">;</span>
<span style="color: #666666; font-style: italic;">// Output "The value of i is 6"</span>
<span style="color: #666666; font-style: italic;">// i = 6</span></pre>
      </td>
    </tr>
  </table>
</div>

So, now if you are ever asked about this in an interview, you will have a response.

Happy programming!

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Programming Tip Of The Day #2 - Difference Between i++ and ++i" data-url="http://brandontreb.com/programming-tip-of-the-day-2-difference-between-i-and-i"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>
