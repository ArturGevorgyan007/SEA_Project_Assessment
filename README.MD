# SEA Stage 2 - Data Catalog Project

This is my Dog Catalog project built on SEA Data Catalog sample. Dog data is fetching from thedogapi API (https://thedogapi.com/). 
There is a separate breeds enpoints and images endpoints. I used images endpoints that have info about breed. 
With auth_key I could get maximum 100 dog info per requests. 
The code is making 30 requests, which generates approx. 170 different dog breeds.I kept original code in comments as well.

 1. I used the following data structures:
      -Dog class, 
      -arrays of dogs and,
      -dictionary with dog names as a key and dog objext as a value (for stroing unique dog breeds, as there are duplicate dogs data with only difference of image URLs)

 2. I have the following features:
      - search by keyword
      - sort ascending or descending
      - reset initial loaded cards

## Challenges
1. Initially I wanted to fetch all data with one requests and save all data in JSON file in mycode directory. However there was not GET endpoint for fetching all data.
2. I could use JSON local file as a data source, since I would need to establish local server to call the file through localhost.

## Further enhancements
1. If I have a more tim I would add Range sliders to filter by dog height and weight.
2. I was thinking to add "Close" button for each card to remove cards individually.

