const jetpack = require( "fs-jetpack" );
const oldList = jetpack.read( "./speakers.old.json", "json" );
const newList = jetpack.read( "./speakers.json", "json" );

const sessionsRemoved = oldList.filter( s => {
	return !newList.keynote && !newList.find( s1 => {
		return s1.name.toLowerCase() === s.name.toLowerCase();
	} );
} );

const sessionsAdded = newList.filter( s => {
	return !oldList.find( s1 => {
		return s1.name.toLowerCase() === s.name.toLowerCase();
	} );
} ).filter( s => !s.keynote );

console.log( "removed", sessionsRemoved );
console.log( "added", sessionsAdded );
