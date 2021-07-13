let bands = [
    {'name' : 'Willie Nelson', 'yearFormed' : '1956', 'genre' : 'Country', 'location' : 'Texas'},
    {'name' : 'Steely Dan', 'yearFormed' : '1971', 'genre' : 'Rock', 'location' : 'New York'},
    {'name' : 'Judas Priest', 'yearFormed' : '1969', 'genre' : 'Metal', 'location' : 'England'},
    {'name' : 'Michael Jackson', 'yearFormed' : '1964', 'genre' : 'Pop', 'location' : 'Indiana'},
    {'name' : 'Heart', 'yearFormed' : '1967', 'genre' : 'Rock', 'location' : 'Washington'}
];

// Returns all objects in array
const getAll = () => {
    return bands;
}

// console.log(getAll());

// Returns a specified object in array
const getItem = (name) => {
    return bands.find((band) => {
        return band.name.toLowerCase() == name.toLowerCase();
    });
}
console.log(getItem('heart'));
// let heart = getItem('heart').genre;
// console.log(heart);

export { getAll, getItem }