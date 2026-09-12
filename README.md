# Cinema App

A movie, TV series, and celebrity discovery app built with React, Tailwind CSS, and the [TMDB API](https://www.themoviedb.org/documentation/api). Browse trending titles, filter and sort catalogues, watch trailers, and build a personal watchlist — all saved locally in your browser.

## Features

- **Home** — trending, popular, and top-rated rows for both movies and series
- **Movies** — full catalogue with genre filter and sort
- **Movie Detail** — overview, cast, trailer, and similar movies
- **Series** — full catalogue with genre filter and sort
- **Series Detail** — overview, seasons/episodes, cast, trailer, and similar series
- **Celebrities** — full catalogue filterable by department (Acting, Directing, etc.) and sortable
- **Celebrity Detail** — biography and the movies/series they've worked on
- **Search** — one search box across movies, series, and celebrities, with debounced input so it doesn't spam the API
- **Watchlist** — add or remove any movie or series; saved in `localStorage`, so it survives a page refresh
- **404 page** — friendly not-found screen with a link back home

