const csv = require( "csvtojson" );
const jetpack = require( "fs-jetpack" );

const nameSort = ( s1, s2 ) => {
	if ( s1.name < s2.name ) {
		return -1;
	}

	if ( s1.name > s2.name ) {
		return 1;
	}
	return 0;
};

const speakers = [];
csv()
	.fromFile( "./speaker-list.csv" )
	.on( "json", speaker => {
		speakers.push( speaker );
	} )
	.on( "done", err => {
		if ( err ) {
			console.log( err );
			return;
		}
		const filtered = speakers.filter( speaker => {
			return speaker.state === "accepted" && speaker.confirmed === "TRUE" && speaker[ "Scheduled?" ] === "x";
		} );
		const mapped = filtered.map( s => {
			return {
				name: s.name,
				talk: s.title,
				audience: `Audience: ${ s.audience_level }`,
				avatar: s.avatar,
				twitter: `@${ s.twitter }`,
				keynote: s.twitter === "seldo" || s.twitter === "KimCrayton1" || s.twitter === "Aimee_Knight" || s.twitter === "benmvp"
			};
		} );
		mapped.sort( nameSort );
		jetpack.write( "./speakers.json", mapped );
		console.log( "done." );
	} );
