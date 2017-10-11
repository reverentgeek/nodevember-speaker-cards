const scrapeIt = require( "scrape-it" );
const Nightmare = require( "nightmare" );
const log = require( "./log" );

const scrapeSpeakerList = async url => {
	try {
		const nightmare = new Nightmare( { show: false } );
		const results = await nightmare
			.goto( url )
			.wait( ".speakers" )
			.evaluate( () => {
				return [ ...document.querySelectorAll( ".speakers" ) ].map( e => e.innerHTML );
			} )
			.end();
		const speakerTasks = results.map( async r => {
			return await scrapeIt.scrapeHTML( r, {
				speakers: {
					listItem: ".speaker-with-bio",
					data: {
						name: ".speaker-description h2"
					}
				}
			} );
		} );
		const speakers = await Promise.all( speakerTasks );
		return {
			keynotes: speakers[ 0 ].speakers,
			sessions: speakers[ 1 ].speakers
		};
	} catch ( err ) {
		log.error( err );
		return null;
	}
};

const getSpeakerHtml = async url => {
	try {
		const nightmare = new Nightmare( { show: true } );
		const result = await nightmare
			.goto( url )
			.wait( ".avatar" )
			.evaluate( () => {
				return [ ...document.querySelectorAll( ".main-container" ) ].map( e => e.innerHTML );
			} )
			.end();
		return result[ 0 ];
	} catch ( err ) {
		log.error( err );
		return null;
	}
};

const scrapeSpeakerInfo = async html => {
	const speaker = await scrapeIt.scrapeHTML( html, {
		name: "h1.text-white",
		talk: ".speaker-description h2",
		audience: ".speaker-description p.sub span",
		avatar: { selector: ".avatar", attr: "src" },
		twitter: ".sublinks a span"
	} );
	return speaker;
};

const getSpeaker = async url => {
	log.info( `getting ${ url } ...` );
	const speakerHtml = await getSpeakerHtml( url );
	return await scrapeSpeakerInfo( speakerHtml );
};

module.exports = {
	scrapeSpeakerList,
	getSpeaker
};
