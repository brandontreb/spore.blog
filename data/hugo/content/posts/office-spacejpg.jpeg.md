---
title: 'Case Of The Mondays'
date: "2011-02-14T00:00:00.000Z"
type: post 
post_type: article
slug: case-of-the-mondays
tags: 
- Articles
---
<div id="attachment_1421" class="wp-caption alignright" style="width: 330px">
  <a href="/uploads/2011/office-spacejpg.jpeg"><img class="size-full wp-image-1421 " title="office-spacejpg" src="/uploads/2011/office-spacejpg.jpeg" alt="" width="320" height="240" /></a> 
  
  <p class="wp-caption-text">
    Mondays&#8230;
  </p>
</div>

The other day, I was faced with an interesting programming challenge and wanted to share my solution. I just submitted a pretty interesting app to the app store that does a number of things (more details soon). Among those things is the ability to generate a calendar.

#### The Problem

Generating the calendar was the easy part, however when displayed, I wanted it to highlight every Monday of the month. This turned out to be a bit trickier than I imagined.

Really the main challenge here was to determine which day contained the *first* Monday of the month. After that, we just loop incrementing by 7 and are done.

#### Looking At The Date Helpers

Looking at what I had to work with in NSDate, NSCalendar, and NSDateComponents, I really found only 2 things that could help me. From NSDateComponents, I could figure out the current day (numeric) and the current day of the week (numeric). Knowing this information was very important.

#### The Solution

Having the current day and day of the week allowed me to find the date of the Monday on the current week. This was the first challenge as demonstrated below. Assume weekdayComponents is the NSDateComponents generated from the current date.

<div>
  <pre>&lt;code class=’objc’>NSInteger weekday = [weekdayComponents weekday];
NSInteger day         = [weekdayComponents day];

// First, find how many days we are from Monday
int daysAwayFromMonday = weekday - 2;

// Now resolve the monday of this week
int mondayThisWeek = day - daysAwayFromMonday;

// Check if monday this week falls in last month
if(mondayThisWeek &lt;= 0) {
    mondayThisWeek = day + (7 - daysAwayFromMonday);
}&lt;/code></pre>
</div>

mondayThisWeek will now contain the day number of the Monday of the current week. If that Monday falls on the previous month, mondayThisWeek will be negative. Line 12 resolves that by carrying it into next week.

Finally, we just loop subtracting 7 from that Monday until mondayThisWeek is less than 7 to get the first Monday of the month.

<div>
  <pre>&lt;code class=’objc’>while(mondayThisWeek &gt; 7) {
    mondayThisWeek -= 7;
}&lt;/code></pre>
</div>

And there you have it. mondayThisWeek (improperly named at this point) will contain the day number of the first Monday for the current month.

So, this was quite a round-a-bout way to find this value. If you have a better solution, please feel free to trash on mine in the comments 😉 .

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Case Of The Mondays" data-url="http://brandontreb.com/case-of-the-mondays"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>
