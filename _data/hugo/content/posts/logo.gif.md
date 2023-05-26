---
title: 'Money You Might Be Missing Out On &#8211; LinkShare API Integration'
date: "2009-11-12T00:00:00.000Z"
type: post 
post_type: article
slug: money-you-might-be-missing-out-on-linkshare-api-integration
tags: 
- Articles
---
<center>
  <a href="http://linkshare.com"><img src="/uploads/2009/logo.gif" alt="logo" title="logo" width="232" height="80" class="alignnone size-full wp-image-605" /></a>
</center>

As you may know, I am the developer of the site [FreshApps.com][1]. One thing we had been doing to make some extra money is to use [Linkshare][2] to be an affiliate for Apple.

If you don&#8217;t know, [Linkshare][2] is a service that allows you to become an affiliate of thousands of companies. You simply select one of the companies products, get the linkshare link, and put the link on your site. Now, every time someone clicks that link and makes a purchase, you will get a percentage of the revenue.

## The Problem

The only problem was, we have thousands of apps and converting the links manually seemed like such a daunting process. So, as you can imagine we converted around 10 links and never looked at it again.

Well, earlier today, the designer of the site [JJ Mancini][3], asked me to check and see if linkshare had an API. I checked it out and sure enough, they did and it was no more complex than interfacing with a URL shortening service. So, I wrote the script and within minutes, all of our downloads links were converted into something that can now make us some revenue.

## The Solution

Now that I have created the script, I figured I would pretty it up and share it with you. Keep in mind, the script is stupid easy, so if I am insulting your intelligence by showing it, I apologize.

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="php" style="font-family:monospace;"><span style="color: #000000; font-weight: bold;">&lt;?php</span>
    <span style="color: #666666; font-style: italic;">/* linkshare.php */</span>
&nbsp;
    <span style="color: #666666; font-style: italic;">// Your linkshare API token</span>
    <span style="color: #000088;">$token</span> <span style="color: #339933;">=</span> <span style="color: #0000ff;">"89705XXXXd11ab28ae548bXXXX4ad6475279faXXXX65da0ec8ed77XXXXeb067"</span><span style="color: #339933;">;</span>
    <span style="color: #666666; font-style: italic;">// Apples Merchant ID</span>
    <span style="color: #000088;">$mid</span>   <span style="color: #339933;">=</span> <span style="color: #0000ff;">"13508"</span><span style="color: #339933;">;</span>
&nbsp;
    <span style="color: #000088;">$linkShareLinks</span> <span style="color: #339933;">=</span> <span style="color: #990000;">array</span><span style="color: #009900;">&#40;</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>  
&nbsp;
    <span style="color: #666666; font-style: italic;">// I assume links in an array of links to the app store</span>
    <span style="color: #b1b100;">foreach</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$links</span> <span style="color: #b1b100;">as</span> <span style="color: #000088;">$link</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
        <span style="color: #000088;">$linkShareURL</span> <span style="color: #339933;">=</span> <span style="color: #0000ff;">"http://feed.linksynergy.com/createcustomlink.shtml?"</span><span style="color: #339933;">.</span>
            <span style="color: #0000ff;">"token=<span style="color: #006699; font-weight: bold;">$token</span>&mid=<span style="color: #006699; font-weight: bold;">$mid</span>&murl=<span style="color: #006699; font-weight: bold;">$link</span>&mt=8&buylink=yes"</span><span style="color: #339933;">;</span>
        <span style="color: #000088;">$linkShareReturn</span> <span style="color: #339933;">=</span> <span style="color: #990000;">file_get_contents</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$linkShareURL</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
        <span style="color: #b1b100;">if</span><span style="color: #009900;">&#40;</span><span style="color: #990000;">stristr</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$linkShareReturn</span><span style="color: #339933;">,</span> <span style="color: #0000ff;">"click.linksynergy.com"</span><span style="color: #009900;">&#41;</span><span style="color: #009900;">&#41;</span> <span style="color: #009900;">&#123;</span>
            <span style="color: #990000;">array_push</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$linkShareLinks</span><span style="color: #339933;">,</span><span style="color: #000088;">$linkShareReturn</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
        <span style="color: #009900;">&#125;</span> 
    <span style="color: #009900;">&#125;</span>
&nbsp;
    <span style="color: #990000;">print_r</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$linkShareLinks</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #000000; font-weight: bold;">?&gt;</span></pre>
      </td>
    </tr>
  </table>
</div>

And that&#8217;s it! The variable $linkShareLinks will now contain all of the App Store links converted to your account&#8217;s linkshare url. If you have any site with that contains ads for apps in the app store (review site, developer blog, etc&#8230;), you would be crazy not to integrate with linkshare.

Give it a try, and feel free to ask questions in the comments section.

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Money You Might Be Missing Out On - LinkShare API Integration" data-url="http://brandontreb.com/money-you-might-be-missing-out-on-linkshare-api-integration"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://freshapps.com
 [2]: http://linkshare.com
 [3]: http://vanillahd.com
