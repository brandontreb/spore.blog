---
title: 'Idea: ChatGPT For Filtering Social Media Feeds'
date: "2023-01-25T14:54:52.172Z"
type: post 
post_type: article
slug: vpyzaaro5pjr8y3axaqag9
---
![](https://images.unsplash.com/photo-1579869847557-1f67382cc158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80)

While I was still using Twitter, I set up _a ton_ of keyword filters.  This was especially true during the election seasons.  I prefer using social media to connect with people and find communities surrounding my hobbies and interests.  

While these filters did an _ok_ job, they often times had false positives and filtered out content that I was actually interested in.  An example of this might be a filter on the word **Trump**. My intention was to remove posts around former president Trump as I really have no interest in such discussions.  However, this might filter out something like this:

_"I really feel that React trumps Angular in front-end web development"_

Using keyword filtering, I would have missed out on an otherwise interesting conversation. 

**ChatGPT To The Rescue**

Let's say for example, that I want to only see posts about **crypto** and **AI** from [my blog's JSON feed](https://brandontreb.com/feed.json). I could write a prompt like this:

```
const prompt  = `
Given the following JSON array of posts where the content key contains the 
HTML of the post:    
    
${JSON.stringify(content)}

filter out all posts that are about crypto or AI, and then return the JSON 
string containing the post id from the original post array.`
```
  
In this case the content is just structured JSON data of my blog.  The returned result is

```
[{
	"id": "https://brandontreb.com/2023/01/23/p79q7wz6hlqmckertv2y9"
}, {
	"id": "https://brandontreb.com/2023/01/23/xh7qs5zhj69bbas75c63"
}, {
	"id": "https://brandontreb.com/2023/01/22/tfiettm6fumf0focwa8n0a"
}, {
	"id": "https://brandontreb.com/2023/01/21/6fd95o3q7ihqbqga6hp5e8"
}]
```

In this example, each of the posts are accurately classified as being about crypto or AI though they may or may not contain those keywords.  

Using this method, we can now filter out social media feeds in much more interesting and dynamic ways. I could now say something like 

"_Don't show me political discussions that are negative in nature_". 

This way, I can still be a part of interesting conversations without risking my sanity.  

I'm very interested and excited to explore this further and would love to hear your thoughts on it.
