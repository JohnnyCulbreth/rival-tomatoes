# About

This simple web application allows users to compare the Tomatometer score of two movies from the Rotten Tomatoes website. Given the lack of a public API for Rotten Tomatoes, the app uses the Puppeteer library to scrape data directly from the movie's page.

The comparison is based on the structure of the movie's URL in the format **https://www.rottentomatoes.com/m/movie_name**. In about 80% of cases, the **movie_name** simply corresponds to the actual name of the movie, such as **https://www.rottentomatoes.com/m/once_upon_a_time_in_hollywood**. However, due to the nature of URL formation and potential special characters in a movie's name, this may not always hold true. This method serves as the best non-API workaround and users should be aware of this limitation.

The application is built using React for the frontend, express and Puppeteer for the backend, and Material-UI for UI components.

![rival-tomatoes1](https://github.com/JohnnyCulbreth/rival-tomatoes/assets/102640510/e1eb5cb0-600d-44be-86d8-30fa366c4ea0)

![rival-tomatoes2](https://github.com/JohnnyCulbreth/rival-tomatoes/assets/102640510/d05500a1-2fe7-479c-a6c0-d2c388df4f28)

![rival-tomatoes3](https://github.com/JohnnyCulbreth/rival-tomatoes/assets/102640510/e1e692ad-aa81-44f0-a1ea-50341b110d91)

---

# Rival Tomatoes: A Rotten Tomatoes Score Comparer

Welcome to Rival Tomatoes, a unique tool that lets you compare the Tomatometer scores of two movies. This app is ideal for movie enthusiasts looking to compare scores quickly, or for those engaged in a friendly debate on which movie fares better.

The app was created using the following technologies:
- Frontend: React, Material-UI
- Backend: Node.js, Express.js, Puppeteer (for web scraping)

## Getting Started

Clone the repository
`git clone https://github.com/JohnnyCulbreth/rival-tomatoes.git`
`cd rival-tomatoes`

Install Dependencies
`npm install`

Run the Application
Start the frontend:
`npm start`

In another terminal, start the backend:
`node server.js`

The app should now be running on your local machine. Open **http://localhost:3000** to view it in your browser.

## Usage

To use the app, enter the names of two movies you want to compare and click 'Compare'. The app will fetch the Tomatometer score, director, genre, and image from the respective Rotten Tomatoes pages of each movie and display them side by side.

Please note that the movie names are used to form the URL for the movie's page on Rotten Tomatoes. This method works most of the time, but may not be 100% accurate due to special characters or unusual naming conventions. In such cases, you may need to use the exact tail end of the Rotten Tomatoes URL as the movie name.

## Contribution

Feel free to fork this repository, make changes, and open a pull request. Any contributions are greatly appreciated!

Peace!
