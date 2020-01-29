# find-entity
A npm package that finds the list of entities such as customers, shops etc, within a given distance from a given 
reference point( latitude, longitude ).


## Getting Started

Install
```
npm install find-entity
```

Run
```
npm run start
```

## Package Summary

**Phase 1**

After running the code, it will automatically read the sample file in assets folder for.
It uses **readline** to read the file, line by line and push into an array.
Sorting is done in ascending order initially as the file data, against which the reference point needs to be searched remains the same. Hence, sorting wont be required for every subsequent searches.

Demo data used
```
latitude = 53.339428;
longitude = -6.257664; 
distanceToSearch = 100;
EARTH_RADIUS = 6371;
```

Results for the demo data is logged in ascending order.

**Phase 2**

A CLI is presented with a list of questions to get the input for any further search of any random reference point( latitude, longitude )

Questions
```
"Do you want to search entity( customer, shop ,etc ) near your area ? (Y/N) : ",  // If you want to search another reference point
"Enter reference point\'s latitude in degree : ",                                 // latitude in degrees
"Enter reference point\'s longitude in degree : ",                                // longitude in degrees
"Max distance in Kms from reference point to search : ",                          // Area to search from reference point
"Radius of Earth ( default: 6371 ) :"                                             // Radius of Earth, defaults to 6371Kms
``` 

The result for the above input will be logged and CLI will loop till you answer **N** to the first question.




**This package is published on [npm](https://www.npmjs.com/package/find-entity)**

Dependencies
```
geographic-item-search
```


## Future Scope
```
-Initialize with random file taking file path as input from CLI( Interface 1 )
-UI and Api to expose the logic on the web for better user experience ( Interface 2 )
