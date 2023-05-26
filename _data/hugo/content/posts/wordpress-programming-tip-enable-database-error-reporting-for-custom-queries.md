---
title: 'WordPress Programming Tip: Enable Database Error Reporting For Custom Queries'
date: "2010-03-12T00:00:00.000Z"
type: post 
post_type: article
slug: wordpress-programming-tip-enable-database-error-reporting-for-custom-queries
tags: 
- Wordpress
---
So this one should seem pretty obvious, but it wasn&#8217;t apparent to me at first. &nbsp;It was only after digging through the wp-db.php file that I discovered how to enable error reporting.

#### The Problem

As you may have discovered, the wp_query() function isn&#8217;t a &#8220;one size fit&#8217;s all&#8221; solution. &nbsp;Often times, you may need to query the WordPress database using a custom MySQL query. &nbsp;Especially &nbsp;if you are using WordPress for anything other than a blog (ie [freshapps.com][1]).

When writing custom queries, it can often be frustrating if you make a mistake in the SQL syntax as WordPress will simply display no results. &nbsp;For example:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="php" style="font-family:monospace;"><span style="color: #000088;">$results</span> <span style="color: #339933;">=</span> <span style="color: #000088;">$wpdb</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">get_results</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">"SELECT * FROM <span style="color: #006699; font-weight: bold;">$wpdb-&gt;posts</span> 
   WHERE post_title = ‘foo bar baz"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #990000;">print_r</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$results</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
<span style="color: #666666; font-style: italic;">// Outputs Array ( )</span></pre>
      </td>
    </tr>
  </table>
</div>

Since we have made an error in our SQL statement (I didn&#8217;t add the second single quote), WordPress will suppress it and simply return an empty array. This is not very helpful for debugging.

#### The Solution

The solution is actually quite simple. The global $wpdb object has a property called show_errors. Setting this property to true will cause WordPress to output the SQL errors to the screen for a given query.

Here it is with our example above

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="php" style="font-family:monospace;"><span style="color: #666666; font-style: italic;">// Enables Wordpress’s DB Error reporting</span>
<span style="color: #000088;">$wpdb</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">show_errors</span> <span style="color: #339933;">=</span> <span style="color: #009900; font-weight: bold;">true</span><span style="color: #339933;">;</span>
&nbsp;
<span style="color: #000088;">$results</span> <span style="color: #339933;">=</span> <span style="color: #000088;">$wpdb</span><span style="color: #339933;">-&gt;</span><span style="color: #004000;">get_results</span><span style="color: #009900;">&#40;</span><span style="color: #0000ff;">"SELECT * FROM <span style="color: #006699; font-weight: bold;">$wpdb-&gt;posts</span> 
   WHERE post_title = ‘foo bar baz"</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
<span style="color: #990000;">print_r</span><span style="color: #009900;">&#40;</span><span style="color: #000088;">$results</span><span style="color: #009900;">&#41;</span><span style="color: #339933;">;</span>
&nbsp;
<span style="color: #666666; font-style: italic;">// Outputs </span>
<span style="color: #666666; font-style: italic;">// WordPress database error: [You have an error in your </span>
<span style="color: #666666; font-style: italic;">// SQL syntax; check the manual that corresponds to your </span>
<span style="color: #666666; font-style: italic;">// MySQL server version for the right syntax to use near </span>
<span style="color: #666666; font-style: italic;">// ”foo bar baz’ at line 1]</span>
<span style="color: #666666; font-style: italic;">// SELECT * FROM wp_posts WHERE post_title = ‘foo bar baz</span></pre>
      </td>
    </tr>
  </table>
</div>

Now we know what went wrong with our query rather than just receiving empty results.

Let me know if you have any questions or comments.

Happy WPCoding!

<div class="zemanta-pixie" style="margin-top:10px;height:15px">
  <a class="zemanta-pixie-a" href="http://reblog.zemanta.com/zemified/a1d99446-c73f-4722-97e6-3e584300069e/" title="Reblog this post [with Zemanta]"><img class="zemanta-pixie-img" src="http://img.zemanta.com/reblog_e.png?x-id=a1d99446-c73f-4722-97e6-3e584300069e" alt="Reblog this post [with Zemanta]" style="border:none;float:right" /></a><span class="zem-script more-related pretty-attribution"></span>
</div>

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="WordPress Programming Tip: Enable Database Error Reporting For Custom Queries" data-url="http://brandontreb.com/wordpress-programming-tip-enable-database-error-reporting-for-custom-queries"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://freshapps.com
