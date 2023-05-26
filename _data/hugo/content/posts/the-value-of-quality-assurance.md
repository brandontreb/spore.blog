---
title: 'The Value Of Quality Assurance'
date: "2015-07-28T00:00:00.000Z"
type: post 
post_type: article
slug: the-value-of-quality-assurance
tags: 
- consulting
- business
- qa
- quality
---
It's late, you have been hacking all night to get the client a build.  Finally, around 2:30 am, you hit submit and publish something to the client and go to bed.  When you wake up in the morning, the first thing you see in your inbox is an email titled "Completely Broken!!1!".

How could this be? You stayed up late, you hacked, you tested and you sweat over this build to find that it crashes for the client when they try to do something obvious.

As developers, we often can't see the forrest through the trees.  What this means is, we get so deep into the code working on a new feature or fixes that we often don't notice when we break things. This doesn't mean that we are bad developers, it just means we think differently about development.  It also means we can't personally handle **everything**.

However, from a client's perspective, failures like this can really tarnish your brand.  They start to get the impression that you are unprofessional and even worse, start to doubt your abilities as a developer.

### Enter QA

QA (short for quality assurance) is an idea that someone other than the developer tests the build before the client ever sees it.  These people are responsible for

- Regression testing (as in the scenario above)
- Generating a test plan/matrix
- Ensuring parity (if needed) between multi-platform applications 

If the QA team is doing it's job, the client won't every see these obvious failures mentioned above.  This can greatly improve the client's perception of you/your team.

### Basic Process

OK, QA sounds great, how do I get started?  Well, it's actually relatively simple. First off, I assume you are doing _some flavor_ of agile, and hopefully logging tickets for each task.  If not, you should (even if you are a one man show).  Here is a rough flow that my team follows:

1. Developers determine which tickets to work on for the current sprint 
2. Developers complete a ticket and move it to a "dev complete" column in the task manager (Jira, Trello, Pivotal Tracker, etc...)
3. Developers deliver a build internally
4. The QA team takes the build and goes through their testing matrix to check for regressions.
 - If a regression is found, a bug ticket is created for the responsible developer 
5. New features are added to the QA test matrix and tested
 - If the feature has bugs or doesn't work as intended, the ticket is rejected and pushed back to the developer
6. Once everything passes, the build is green-lit to be sent to the client (usually one build per sprint)

Like anything, you may develop your own version of the above, however this should be a detailed enough outline to get you started.

### Pushback

In my experience, clients will generally give you some pushback when you say that you are billing them for QA hours.  They will say things like "It's OK, I can test the build myself." or "I understand, things won't be perfect. We will through this together".  

While this all sounds good at the surface, the fact of the matter is, it almost always will end unfavorable.  The client might have some level of tolerance early on, but as you start sending them more and more builds, each potentially missing/breaking features, they will become less patient.  I have seen this happen plenty of times even with the most tech savvy of clients.  Here are a few ways you can build QA into your billing process:

**Add it as a line item**

This is where you will most likely see the most opposition.  Make sure to explain to the client that their time is valuable and you don't want to waste it.  Also, ensure that the cost of QA is drastically less than the cost of engineering or you will get questions like "Why am I paying you full price to test?".

Be sure to tell the client that QA is just part of your team's process. You simply don't operate any other way as you **know** that this is the best approach for both parties.  Hopefully, this will establish your expertise in the domain and the client will respect you for that.

**Bake it into the cost of engineering**

Often times, you may not bother with too many line items.  You may just have something like **Engineering $200/hour**.  When/If the client gives any pushback about cost compared to other shops, simply inform them of all they are getting inside of that hour (Engineering, Consulting, QA, Project management, Office management, etc...).  It actually works out to be a much greater value for them than paying say $125/hour for a "code monkey".

### Final Thoughts

I absolutely believe that QA is crucial to the success of any software agency or freelancer. Not only does it allow you to come across as more professional, it also helps keep you sharp as a developer. While I'm not suggesting QA is a silver bullet (I still believe in Unit / Automated testing), I feel that everyone should at least have some layer baked into their process. 
