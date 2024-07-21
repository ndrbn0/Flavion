# Flavion Project: Culinary Ingredient Explorer

## Overview

Flavion is a web application designed for culinary enthusiasts to browse, explore, and contribute to a comprehensive list of ingredients and their flavor profiles. Users can view detailed information about ingredients, see flavor pairings, and add or manage ingredients.

## Features

### Ingredients List

- **Functionality**: Displays ingredient names, flavor tags, and distinct background colors for clarity. Users can scroll vertically to view more ingredients.
- **Tasks**:
  1. **Create branch**: `feature/ingredients-list`
  2. **Fetch and display data**: Implement logic to fetch and display local dummy data for the ingredient list.

### Ingredient Details with Flavor Pairing Suggestions

- **Functionality**: Clicking on an ingredient link shows a details page with the ingredient’s picture, name, flavor tags, and a "Back" link.
- **Tasks**:
  1. **Clickable ingredient links**: Implement links on the ingredient list items.
  2. **Display ingredient details**: Create a new page to show detailed information about the selected ingredient.
  3. **Back navigation**: Implement a "Back" link to return to the previous page.

### Add Ingredient with Flavor Profile

- **Functionality**: A dropdown form allows users to enter ingredient details and submit them. Validation is in place for mandatory fields.
- **Tasks**:
  1. **Form layout**: Design and implement the form layout for adding new ingredients.
  2. **Validation and placeholders**: Add validation for mandatory fields and logic for placeholder images if none are provided.
  3. **Update ingredient list**: Ensure the new ingredient is added to the top of the list upon successful submission.

### Delete Ingredient

- **Functionality**: The ingredient details page includes a "Delete" button with a confirmation dialog to prevent accidental deletions.
- **Tasks**:
  1. **Create branch**: `feature/delete-ingredient`
  2. **Delete functionality**: Add "Delete" button and functionality to remove the ingredient.
  3. **Confirmation dialog**: Implement a confirmation dialog to prevent accidental deletions.

### Edit Ingredient

- **Functionality**: An "Edit" link on the details page opens a form to modify ingredient details, with options to save or cancel changes.
- **Tasks**:
  1. **Create branch**: `feature/edit-ingredient`
  2. **Edit link and form**: Add "Edit" link and form functionality to update ingredient details.
  3. **Form validation**: Handle form validation and updates to ensure data accuracy.

### Add New Ingredient Form as Pop-up

- **Functionality**: The pop-up form appears centered on the screen with a dimmed background. Users can close the form by clicking outside or submit it to update the content.
- **Tasks**:
  1. **Create branch**: `feature/pop-up-form`
  2. **Pop-up form layout**: Design and implement the pop-up form layout.
  3. **Validation and background dimming**: Integrate form validation and background dimming functionality.
  4. **Close form**: Add functionality to close the pop-up by clicking outside.

### Filter Ingredients by Flavours

- **Functionality**: A "Flavor" filter section at the top of the list includes buttons for each flavor tag. Only one filter can be active at a time, and the list updates accordingly.
- **Tasks**:
  1. **Create branch**: `feature/filter-ingredient`
  2. **Filter buttons**: Implement filter buttons and functionality to filter the ingredient list.
  3. **Single active filter**: Ensure only one filter is active at a time and handle cases where no ingredients match the filter.

### Navigation

- **Functionality**: A navigation bar at the bottom of the screen includes links to "Ingredients" and "Pairings," with visual highlighting for the active page.
- **Tasks**:
  1. **Create branch**: `feature/navigation-bar`
  2. **Persistent navigation bar**: Implement a persistent navigation bar.
  3. **Navigation links**: Add and style navigation links.
  4. **Active page highlight**: Ensure functionality to highlight the active page.

### Display Flavor Matches

- **Description**: A dedicated page showcases a list of predefined flavor combinations, providing inspiration for ingredient pairings.
- **Tasks**:
  1. **Create branch**: `feature/display-matches`
  2. **Create "Flavor Matches" page**: Design and implement the "Flavor Matches" page with a clear headline.
  3. **Display predefined flavor combinations**: List predefined flavor combinations on the page.
  4. **List ingredients for each pairing**: Display an ingredients list for each pairing.
  5. **Include rationale for flavor pairing**: Provide a description explaining why each pairing is flavorful.
  6. **Show combined flavor tags**: Display the combined flavor tags of all ingredients in the pairing.
  7. **Link ingredients to details pages**: Ensure each ingredient name links to its respective details page for further information.

### Search Function

- **Description**: A search bar allows users to input search terms and find relevant flavors, ingredients, or pairings quickly.
- **Tasks**:
  1. **Create branch**: `feature/search-function`
  2. **Add "Search" button**: Add a "Search" button to all pages.
  3. **Create SearchComponent**: Create a `SearchComponent` component.
  4. **State for search results**: Introduce a state to hold the search results to be displayed in the UI.
  5. **State for Fuse.js instance**: Introduce a state to store the instance of Fuse.js used for searching.
  6. **Fuse.js options**: Define an object `fuseOptions` specifying configuration options for Fuse.js.
  7. **Handle search function**: Define the `handleSearch` function to respond to changes in the input field. It performs a search using the Fuse instance and updates the results state with the found results.
  8. **Handle search submission**: Create a `handleSearchSubmit` function to handle search submission.

### Favorite Ingredient/Pairing

- **Description**: Users can mark ingredients or pairings as favorites to easily access and manage them later.
- **Tasks**:
  1. **Create branch**: `feature/favorite-button`
  2. **Design UI**: Design the favorite icon and the favorites section layout.
  3. **Implement favorite icon functionality**: Add functionality for the favorite icon to toggle adding/removing ingredients or pairings from the favorites list.
  4. **Highlight favorite state**: Ensure that the favorite button is highlighted when an ingredient/pairing is selected.
  5. **Favorites section**: Create a dedicated section to display favorited ingredients and pairings.
  6. **Empty state message**: Display a message ("You have no favorite ingredients yet.") when the favorites list is empty.
  7. **Alert messages**: Show appropriate alert messages when an ingredient/pairing is added to ("Ingredient/Pairing added to your favorites.") or removed from ("Ingredient/Pairing removed from your favorites.") the favorites list.
  8. **Testing**: Test the favorite icon functionality, real-time updates, alert messages, and empty state handling across different devices and browsers.

### Add Local Storage

- **Description**: Changes made to ingredients (adding, editing, or deleting) should be saved and persist after refreshing the page.
- **Tasks**:
  1. **Add local storage function**: Implement a local storage function to save all changes made within the app.
  2. **Ensure persistence**: Verify that added, edited, and deleted items are saved and persist after page reloads.

### Rate Pairings

- **Description**: Users can rate flavor pairings from 1 to 5 stars, with ratings being updated in real-time and displayed for each pairing.
- **Tasks**:
  1. **Create branch**: `feature/rating-pairing`
  2. **Design star rating interface**: Create the star rating interface for pairing items.
  3. **Implement immediate submission**: Implement functionality to submit the rating immediately upon clicking a star.
  4. **Calculate and display ratings**: Calculate and display the average rating and total number of ratings for each pairing in real-time.
  5. **Display confirmation message**: Show a confirmation message "Thank you for rating this pairing" after submitting a rating.
  6. **Allow rating updates**: Enable users to update their rating, adjusting the average rating accordingly.

### Create Ingredient Pairings

- **Description**: Users can create new ingredient pairings through a pop-up form, including selecting ingredients, providing reasons, and adding images.
- **Tasks**:
  1. **Create branch**: `feature/create-pairing`
  2. **Add Create Pairing button**: Add the "Create Pairing" button to the pairings section.
  3. **Develop pop-up form**: Create a pop-up form that appears when the "Create Pairing" button is clicked.
  4. **Ingredient selection**: Implement a dropdown menu for selecting ingredients from a list of pre-existing ingredients.
  5. **Reason input**: Add an input field for users to enter a reason for the ingredient pairing.
  6. **Image URL input**: Integrate an optional input field for users to provide an image URL for the pairing, displaying a placeholder image if not provided.
  7. **Handle form submission**: Implement logic to save the new pairing to the list upon form submission.
  8. **Display new pairings**: Ensure new pairings are added to the list and visible to all users.

## Installation

1. **Clone the Repository**

   ```bash
   git clone git@github.com:ndrbn0/Flavion.git
   ```

## Installation

1. **Clone the Repository**

   ```bash
   git clone git@github.com:ndrbn0/Flavion.git

   npm i
   npm install local-storage-state
   npm install react
   npm install react-icons --save
   ```

   <!--- please add all dependencies to install along with the others
