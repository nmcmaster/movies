// this is a bit old, thus the use of class components, but I think it mostly holds up! Hosted at:

http://hospitable-sign.surge.sh/

Hello! Thank you for taking a look at my TMDB API app, created with React and Tailwind CSS. 
Some things I think are neat about this app:

- It’s responsive; note that the top banner even removes a few words for the smartphone screen size breakpoint.
- It’s 100% based on dynamic content received from the TMBD api, and designed to gracefully handle cases where certain information (cast, budget etc) are not available for a given title.
- It makes an initial API call to the Discover service of the API to get the list of movies, then, using their TMBD ids, performs additional api calls to get more information on those titles.
- It staggers the later API calls by 10 seconds to avoid request limits. If you're looking at a film in the modal view within the first 10 seconds of loading the page, revenue and budget will drop in as those values are written to state. (Curiously, although Discover will return results sorted by revenue, it will not provide that value explicitly-- a follow-up query using the individual film's TMDB ID is required to retrieve that information).
- The background cycles through a poster image for each title received from Discover. 
- If a movie really annoys you, you can remove it from the grid by hitting the X in top right. Refresh the page to undo.
