# CCG Technical React Test

Check out https://ccg.akmiller.co.uk for a deployed version of this code.

# Build locally

This is a GatsbyJS project so doing the following ought to work:

1. `yarn install`
2. for the dev server: `gatsby develop` or
3. to replicate a production: `gatsby build && gatsby serve`

NB. If the above gatsby commands do not work then install the gatsby cli: `npm i -g gatsby-cli`

## Challenge 1 Notes

- Authentication of sorts is in but unsecure, as I would never do authentication like this in a production environment.
  It was done this way to leave the original data files intact. Otherwise I would normally set up a backend to expose the data over an API.
  But it does mean a user can only access their data
- Responsive & aesthetic design,
  - I have not tested or designed the site for mobile at all. This would be the next step. Initial thoughts would be to leverage the fact that I have created different urls to 'slide' between different bits of the dashboard
- Amount of Data:
  - Variants will need to be handled differently? due to the 1.2 Million line file, ~120,000 objects in the array
  - Gatsby's build process is just to slow in terms of iterating over each object to load into Gatsby

# Challenge 2 Notes

- Complete! Although not designed for mobile so much as with challenge 1. It wouldn't take much time but I was focusing on the variants data issue

# Challenge 3 Notes

- Space has been left on the desktop page to render variants, once I had worked out how to load the data into the site.
- My current thought might loading it just as a file and not transforming it during the build, then using `fetch` to get the data during runtime and render it then.
