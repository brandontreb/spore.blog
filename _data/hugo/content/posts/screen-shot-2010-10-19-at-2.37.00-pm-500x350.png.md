---
title: 'Ludum Dare Competition: Week 2 Update'
date: "2010-10-20T00:00:00.000Z"
type: post 
post_type: article
slug: ludum-dare-competition-week-2-update
tags: 
- iPhone
---
So another week has gone by and I have made quite a bit of progress, here are the additions since I last posted.

  * Texturing
  * Lighting
  * Skybox
  * Better Terrain generation
  * Environment Fog
  * Basic navigation

So judging by the screenshot, you might really be thinking that I&#8217;m working on Minecraft for the iPhone (I used textures that someone created for Minecraft). While this isn&#8217;t my intention, it is starting to look like my engine would be perfect for a simple port. Perhaps, I may consider creating something inspired by Minecraft in the future. For now, I will be sticking to my current game idea which I call Cube Hive.

As I continue to update this blog, the game idea will become more and more apparent but basically I want to create a game [similar to this][1] on the iPhone in a cube environment.

Anyway, here is a screenshot of where I&#8217;m at:

[<img class="size-medium wp-image-983 alignnone" title="Screen shot 2010-10-19 at 2.37.00 PM" src="/uploads/2010/Screen-shot-2010-10-19-at-2.37.00-PM-500x350.png" alt="" width="500" height="350" />][2]

Oh, and BTW doing Fog in OpenGL ES is crazy easy. Here is the code (thanks to [Mike Daley][3] of [71 Squared][4] for showing me this)

<div>
  <pre>&lt;code class=’objc’>GLfloat fogColor[] = {1.0f, 1.0f, 1.0f, 1.0f};
    glFogf(GL_FOG_MODE, GL_LINEAR);
    glFogfv(GL_FOG_COLOR, fogColor);
    glFogf(GL_FOG_DENSITY, 0.5f);
    glHint(GL_FOG_HINT, GL_DONT_CARE);
    glFogf(GL_FOG_START, 10);
    glFogf(GL_FOG_END, 20);
    glEnable(GL_FOG);&lt;/code></pre>
</div>

That&#8217;s it! Such a great effect with so little effort.

Anyway, I don&#8217;t foresee my game being completed by the end of this month for the Ludum Dare competition. However, I have been working on a killer MUD client for the iPhone that I will most likely submit. I feel that current solutions are clunky, ugly, and unintuitive (sorry if you are a reader and a dev of one of these :/).

I should have some screenshots up soon.

I would love to hear thoughts/opinions of doing a Minecraft inspired game as well?

<div style="">
  <a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-text="Ludum Dare Competition: Week 2 Update" data-url="http://brandontreb.com/ludum-dare-competition-week-2-update"  data-via="brandontreb" data-related="brandontreb:">Tweet</a>
</div>

 [1]: http://sites.google.com/site/handkor/hive’sprojectpage
 [2]: http://brandontreb.com/wp-content/uploads/2010/10/Screen-shot-2010-10-19-at-2.37.00-PM.png
 [3]: http://twitter.com/#!/mikedaley
 [4]: http://www.71squared.com/
