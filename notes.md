
# work

- ksr
  - front end architecture - responsive layout utilities - yir, sundance

# Kickstarter
2013 – present

One thing I've learned over the years is that page performance matters – a lot –
for both user experience and business goals.
For some unknown reason, no one was paying attention to the 5 second page load time
or the broken mobile web experience.
At a whopping 1.1MB, our CSS needed some serious refactoring.
And for such a simple consumer-facing site,
there's absolutely no reason not to better optimize for mobile devices with responsive web design techniques.

Not only that, I noticed that the front-end workflow of my coworkers was a slow and difficult process.
I knew that building HTML and CSS shouldn't be this hard and shouldn't take this long.

I decided to tackle some of the front-end architecture and workflow problems,
with the aim to better document our style guide and pattern library.
This also meant cleaning up and consolidating all the inconsistent styles.

The legacy CSS architecture used a plethora of Sass mixins and was organized by Rails views.
The old architecture 'scoped' each view by using the body's id at the beginning of the cascade.
CSS cannot be scoped – it's global by nature - and I knew the architecture they were using was
generally considered bad practice.
The outcome of this architecture was that virtually no styles were reusable.
Even the typographic scale and grid system used mixins.

After discussing with the other designers and developers,
we decided to begin architecting an OOCSS-based library to slowly ween us off the old system.
The other front-end designers were very enthusiastic and quickly picked up the new CSS approach
and immediately began contributing.
Each new feature rolled out since then has relied heavily on the new library styles and,
although there hasn't been a dedicated effort to refactor,
we've managed to reduce the overall size of our CSS by about 25% – from 1.1MB to 855KB.

## Jess Quote
https://twitter.com/harllee/status/403175957089222656?screen_name=harllee

## Zack Quote
https://github.com/kickstarter/kickstarter/commit/7b0cf3e256a032f13609d6961911f5d621814d2d

OOCSS PR https://github.com/kickstarter/kickstarter/pull/694

## Microsite
The same library styles were used in the Year in Review and Sundance Film Festival page, both of which I developed.

## Open Sourcing It
In attempt to share some of my learnings (and since the Kickstarter style guide is not public),
I distilled some of the basics of our library styles into an open source side project: BASSCSS.

https://twitter.com/avand/status/449249730841681920
https://twitter.com/jgarber/status/448848146551300096


## Singles Club
I'm helping my coworker Chris M with his site for singlesclub.fm. This site is also built entirely upon BASSCSS.


# Stitch Fix
2013

Stitch Fix is a women's fashion subscription service built around a custom recommendation algorithm
and trained in-house stylists. It's what people within the company call a 'mullet app' – that is,
neat and simple in the front, but a complex mess in the back.

I joined just after the launch of their new consumer-facing site as the first designer.
We spent a month or so cleaning up small parts of the interface, including the landing page,
sign up flow, site navigation, visual branding, and the company blog.

Based on the company priorities and the bottlenecks in the user journey
– new customers generally had to wait 4 – 6 weeks after signing up to actually use the service –
we decided to turn our focus towards replacing the internal tool that the stylists used to research customers
and choose the clothing and accessories we sent them.

Before switching tasks, I worked with the Marketing Director to help develop an A/B testing strategy 
for the consumer-facing site that could run while we worked on the internal tool.

The tool that the stylists were using was build on Django
and was essentially a series of tables displaying the database. 
We knew about a lot of low-hanging fruit in regards to improving the tool,
but I decided to do some lean UX research before doing any sketches.

The first week, I ran testing sessions with four stylists.
The sessions began with an open-ended contextual inquiry
and lead into shadowing each participant as they 'packed a fix'.
After transcribing highlights and taking some notes,
I shared the results with the rest of the development team and discussed the findings.

The second week, I facilitated a post-it note sketching session with the entire team of stylists.
Coming from non-product-development jobs before, they really enjoyed the session,
and a lot of great ideas came out of it.
After documenting the session, the development team met again to discuss.

The next two weeks, we focused on sketching ideas and build rapid prototypes to test with.



- stitchfix
  - a/b testing
  - internal tools
  - contextual inquiry
  - user testing
  - collaborative design facilitation
  - participatory design sessions
  - front end architecture

- living social
  - logo design & branding
  - icon system
  - iphone app
    - collaborative design
    - guerilla user testing
  - information architecture
    - team org
    - navigation
  - style guide
  - pattern library
  - a/b testing conversion funnel
  - ux direction
  - design team tools

- opower
  - icon design/branding
  - whitelabel branding design
  - data visualization
  - style guide

