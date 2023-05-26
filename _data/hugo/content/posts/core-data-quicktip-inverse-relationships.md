---
title: 'Core Data QuickTip: Inverse Relationships'
date: "2010-11-11T00:00:00.000Z"
type: post 
post_type: article
slug: core-data-quicktip-inverse-relationships
tags: 
- Mac
---
One thing I always wondered about Core Data is why the compiler would warn you if you didn&#8217;t specify the inverse relationship. After reading through Apple&#8217;s docs, they essentially say its to make your database more robust by reinforcing those relationships. Plus, you never know when you may have one thing and need to get to the other.

After working on a project with an Enormous Core Data database, I found one very useful thing about inverses. When you specify one side of the relationship, core data automatically hooks up the other. Allow me to explain in code.

Let&#8217;s say we have a person object with many pets&#8230;

<div>
  <pre>&lt;code class=’objc’>Person *john = [[Person alloc] init];
Pet *pet = [[Pet alloc] init];

// Add the one to many relationship from john to pets
[john addPetObject:pet];

// Add the inverse relationship
[pet setPerson:john];&lt;/code></pre>
</div>

So, I was doing this in all of my code and then forgot to one time. However, to my surprise, everything still worked. Why, because once you set up one of the relationships, Core Data automatically handles the other. So, the above code is redundant and could just as easily have been.

<div>
  <pre>&lt;code class=’objc’>[john addPetObject:pet];&lt;/code></pre>
</div>

OR

<div>
  <pre>&lt;code class=’objc’>[pet setPerson:john];&lt;/code></pre>
</div>

and both directions of the relationship would have been established.

Not super exciting, but I found it to be pretty handy and also saved me quite a bit of extra code.

Happy Coding!

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Core Data QuickTip: Inverse Relationships" data-url="http://brandontreb.com/core-data-quicktip-inverse-relationships"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>
