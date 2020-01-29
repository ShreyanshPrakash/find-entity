# find-entity
A npm package that finds the list of entities such as customers, shops etc, within a given distance from a reference point.


### Getting Started

Install
```
npm install find-entity
```

Run
```
npm run start
```

### Instructions to use

After running the code, it will automatically read the demo file in assets folder.
It Uses **readline** to read the file line by line and push into an array.
Sorting is done initially as the file data against which the reference point needs to be searched remains same.

Demo data used
```
latitude = 53.339428;
longitude = -6.257664; 
distanceToSearch = 100;
EARTH_RADIUS = 6371;
```

Results for the demo data is logged.




** This package is avalibale in [npm](https://www.npmjs.com/package/find-entity) **

Dependencies
```
geographic-item-search
```

