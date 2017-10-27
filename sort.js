const jetpack = require( "fs-jetpack" );
const speakers = jetpack.read( "./speakers.old.json", "json" );

const nameSort = ( s1, s2 ) => {
	if ( s1.name < s2.name ) {
		return -1;
	}

	if ( s1.name > s2.name ) {
		return 1;
	}
	return 0;
};

speakers.sort( nameSort );
jetpack.write( "./speakers.old.json", speakers );
