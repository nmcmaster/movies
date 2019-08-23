Hello! Thank you for taking a look at my TMDB API app, created with React and Tailwind CSS. 
Some things I think are neat about this app:

- It’s responsive; note that the top banner even adds more or fewer words based on screen size.
- It’s 100% based on dynamic content received from the TMBD api, and designed to gracefully handle cases where certain information (cast, budget etc) are not available for a given title.
- It makes an initial API call to the Discover service of the API to get the list of movies, then, using their TMBD ids, performs additional api calls to get more information on those titles.
- It staggers the later API calls by 10 seconds to avoid request limits.
- The background cycles through a poster image for each title received from Discover. 
- If a movie really annoys you, you can remove it from the grid by hitting the X in top right. Refresh the page to undo.
