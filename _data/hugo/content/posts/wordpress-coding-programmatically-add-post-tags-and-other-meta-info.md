---
title: 'WordPress Coding: Programmatically Add Post Tags (and other meta info)'
date: "2010-03-17T00:00:00.000Z"
type: post 
post_type: article
slug: wordpress-coding-programmatically-add-post-tags-and-other-meta-info
tags: 
- Wordpress
---
<img alt="" src="http://haacked.com/images/haacked_com/WindowsLiveWriter/CategoriesvsTags_833F/561962_price_tag[3].jpg" title="Tags" class="aligncenter" width="600" />  
I was recently working on a script that imports from a custom blogging platform into WordPress and had some need to programmatically add post keywords.

The script to do this is actually quite simple and can be used to update any post attribute.

Here is the code:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="php" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">// Create the post array</span>
<span style="color: #000088;">$post</span> <span style="color: #339933;">=</span> <span style="color: #990000;">array</span><span style="color: #009900;">&#40;</span>
    ‘ID’ <span style="color: #339933;">=&gt;</span> <span style="color: #cc66cc;">5</span><span style="color: #339933;">,</span>
    ‘tags_input’ <span style="color: #339933;">=&gt;</span> ‘foo<span style="color: #339933;">,</span>bar<span style="color: #339933;">,</span>baz’<span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>     
&nbsp;
<span style="color: #666666; font-style: italic;">// Update the post</span>
wp_update_post<span style="color: #009900;">&#40;</span><span style="color: #000088;">$post</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre>
      </td>
    </tr>
  </table>
</div>

This will assign the keywords &#8220;foo&#8221;, &#8220;bar&#8221;, and &#8220;baz&#8221; to the post with ID 5. This task seems trivial, however it&#8217;s very powerful when you think about automation. For example, you could write a script to scrape a google search for your target keyword and find related keywords for each of your posts automatically. Hrm&#8230; plugin idea?

Give it a shot. More info on available parameters can be found on [WordPress&#8217; site here][1]

Here are some of the other fields that you are able to update this way:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="php" style="font-family:monospace;">defaults <span style="color: #339933;">=</span> <span style="color: #990000;">array</span><span style="color: #009900;">&#40;</span>
‘post_status’ <span style="color: #339933;">=&gt;</span> ‘draft’<span style="color: #339933;">,</span> 
‘post_type’ <span style="color: #339933;">=&gt;</span> ‘post’<span style="color: #339933;">,</span>
‘post_author’ <span style="color: #339933;">=&gt;</span> <span style="color: #000088;">$user_ID</span><span style="color: #339933;">,</span>
‘ping_status’ <span style="color: #339933;">=&gt;</span> get_option<span style="color: #009900;">&#40;</span>‘default_ping_status’<span style="color: #009900;">&#41;</span><span style="color: #339933;">,</span> 
‘post_parent’ <span style="color: #339933;">=&gt;</span> <span style="color: #cc66cc;"></span><span style="color: #339933;">,</span>
‘menu_order’ <span style="color: #339933;">=&gt;</span> <span style="color: #cc66cc;"></span><span style="color: #339933;">,</span>
‘to_ping’ <span style="color: #339933;">=&gt;</span>  ”<span style="color: #339933;">,</span>
‘pinged’ <span style="color: #339933;">=&gt;</span> ”<span style="color: #339933;">,</span>
‘post_password’ <span style="color: #339933;">=&gt;</span> ”<span style="color: #339933;">,</span>
‘guid’ <span style="color: #339933;">=&gt;</span> ”<span style="color: #339933;">,</span>
‘post_content_filtered’ <span style="color: #339933;">=&gt;</span> ”<span style="color: #339933;">,</span>
‘post_excerpt’ <span style="color: #339933;">=&gt;</span> ”<span style="color: #339933;">,</span>
‘import_id’ <span style="color: #339933;">=&gt;</span> <span style="color: #cc66cc;"></span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span></pre>
      </td>
    </tr>
  </table>
</div>

Happy WPCoding!

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Wordpress Coding: Programmatically Add Post Tags (and other meta info)" data-url="http://brandontreb.com/wordpress-coding-programmatically-add-post-tags-and-other-meta-info"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://codex.wordpress.org/Function_Reference/wp_insert_post
