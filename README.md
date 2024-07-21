# Flavion Project: Culinary Ingredient Explorer

## Overview

Culinary Ingredient Explorer is a web application designed for culinary enthusiasts to browse, explore, and contribute to a comprehensive list of ingredients and their flavour profiles. Users can view detailed information about ingredients, see flavour pairings, and add or manage ingredients.

## Features

### Ingredients List

- **Value Proposition**: Explore a comprehensive list of ingredients to get inspired for your cooking experiments.
- **Functionality**: Displays ingredient names, flavour tags, and distinct background colors for clarity. Users can scroll vertically to view more ingredients.
- **Tasks**:
  1. Create branch `feature/ingredients-list`
  2. Fetch and display local dummy data

### Ingredient Details with Flavour Pairing Suggestions

- **Value Proposition**: View detailed information about an ingredient and its recommended flavour pairings.
- **Functionality**: Clicking on an ingredient link shows a details page with the ingredient’s picture, name, flavour tags, and a "Back" link.
- **Tasks**:
  1. Implement clickable ingredient links
  2. Display ingredient details on a new page
  3. Implement a "Back" link

### Add Ingredient with Flavour Profile

- **Value Proposition**: Add new ingredients and their flavour profiles to share culinary discoveries.
- **Functionality**: A dropdown form allows users to enter ingredient details and submit them. Validation is in place for mandatory fields.
- **Tasks**:
  1. Design and implement the form layout
  2. Add validation and placeholder image logic
  3. Add the ingredient to the top of the list upon successful submission

### Delete Ingredient

- **Value Proposition**: Remove an ingredient from the list to keep the data accurate.
- **Functionality**: The ingredient details page includes a "Delete" button with a confirmation dialog to prevent accidental deletions.
- **Tasks**:
  1. Create branch `feature/delete-ingredient`
  2. Add "Delete" button and functionality
  3. Implement confirmation dialog

### Edit Ingredient

- **Value Proposition**: Edit the details of an ingredient to correct inaccuracies.
- **Functionality**: An "Edit" link on the details page opens a form to modify ingredient details, with options to save or cancel changes.
- **Tasks**:
  1. Create branch `feature/edit-ingredient`
  2. Add "Edit" link and form functionality
  3. Handle form validation and updates

### Add New Ingredient Form as Pop-up

- **Value Proposition**: Use a pop-up form for adding and editing ingredients to improve user experience.
- **Functionality**: The pop-up form appears centered on the screen with a dimmed background. Users can close the form by clicking outside or submit it to update the content.
- **Tasks**:
  1. Create branch `feature/pop-up-form`
  2. Design and implement the pop-up form layout
  3. Integrate validation and background dimming
  4. Add functionality to close the pop-up by clicking outside

### Filter Ingredients by Flavours

- **Value Proposition**: Filter ingredients by their flavour profiles to easily find matching ingredients.
- **Functionality**: A "Flavor" filter section at the top of the list includes buttons for each flavour tag. Only one filter can be active at a time, and the list updates accordingly.
- **Tasks**:
  1. Create branch `feature/filter-ingredient`
  2. Implement filter buttons and functionality
  3. Ensure single active filter and handle no matching ingredients

### Navigation

- **Value Proposition**: Easily navigate between pages using a persistent navigation bar.
- **Functionality**: A navigation bar at the bottom of the screen includes links to "Ingredients" and "Pairings," with visual highlighting for the active page.
- **Tasks**:
  1. Implement persistent navigation bar
  2. Add and style navigation links
  3. Ensure functionality and highlight active page

## Installation

1. **Clone the Repository**

   ```bash
   git clone git@github.com:ndrbn0/Flavion.git

   npm i
   npm install local-storage-state
   npm install react
   npm install react-icons --save
   ```
