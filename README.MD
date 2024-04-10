# SEA Stage 2 - Data Catalog Project

Welcome to my Dog Catalog project, inspired by the SEA Data Catalog sample. This project leverages data fetched from thedogapi API (https://thedogapi.com/), which provides separate endpoints for breeds and images.

To handle the data effectively, I implemented the following data structures:

- Dog Class: A structured representation of dog data.
- Arrays of Dogs: To store multiple instances of dog data.
- Dictionary: Utilized for maintaining unique dog breeds, with dog names as keys and corresponding dog objects as values. This helps avoid duplication, especially considering variations in image URLs.

##Key Features:

- Search by Keyword: Allows users to search for specific dog breeds or characteristics.
- Sort Ascending or Descending: Provides flexibility in sorting the displayed dog cards.
- Reset Initial Loaded Cards: Enables users to revert to the original set of loaded cards.

##Challenges Faced:

Data Fetching Limitation: Initially, I aimed to retrieve all data in a single request and store it locally as a JSON file. However, due to the lack of a GET endpoint for fetching all data, I had to explore alternative approaches.

Local JSON File Usage: While using a JSON file as a data source seemed feasible, it would have required setting up a local server to access the file through localhost.

##Future Enhancements:

Range Sliders for Filtering: Implementing range sliders would enhance the user experience by allowing filtering based on dog height and weight.

Individual Card Removal: Adding a "Close" button to each card would offer users the ability to remove cards individually, enhancing interactivity and customization options.

Thank you for exploring my Dog Catalog project. If you have any questions or suggestions, feel free to reach out!
