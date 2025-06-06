# Entertainment Web App

## Overview

The Entertainment Web App is a modern web application built with React, designed to provide users with a seamless experience for browsing and bookmarking movies and TV series. The project was bootstrapped with Create React App, ensuring a robust and scalable setup.

## Features

- **Responsive Design**: Optimized layout for different device screen sizes.
- **Multiple Pages**: Includes Home, Movies, TV Series, and Bookmarked Shows.
- **Bookmarking**: Allows users to bookmark their favorite movies and TV series.
- **Search Functionality**: Enables users to search across all pages.
- **Dynamic Content**: Fetches data from an external API for up-to-date content.
- **Infinite Scroll**: Automatically loads more content as the user scrolls to the bottom of the page.
- **Efficient Data Fetching**: Uses **TanStack Query** for caching, fetching, and managing server state.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Create React App**: A tool to set up a modern web app by running one command.
- **TanStack Query**: For efficient data fetching, caching, and infinite scroll implementation.
- **External API**: For fetching dynamic content.
- **Styled Components**: For scoped and component-based styling.
- **Flexbox**: For flexible and responsive layout.
- **CSS Grid**: For grid-based layout.

## Code Organization

The React code is well-organized, following best practices for component structure and state management. The application is broken down into reusable components, making the code DRY (Don't Repeat Yourself) and easy to maintain. State is managed effectively, with clear data flow throughout the components. **TanStack Query** is used to handle server state and implement infinite scroll seamlessly.

## Design and Styling

The project follows a mobile-first workflow and utilizes modern CSS techniques like Flexbox and CSS Grid for layout. Styled Components are used for styling, providing a scoped and component-based styling solution.

## Infinite Scroll

The app implements infinite scroll using **TanStack Query** and `react-intersection-observer`. This ensures a smooth user experience by dynamically loading more content as the user scrolls down, without requiring manual pagination.
