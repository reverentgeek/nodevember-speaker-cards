const jetpack = require( "fs-jetpack" );
const handlebars = require( "handlebars" );
const opn = require( "opn" );
const speakerScraper = require( "./speakerScraper" );
const log = require( "./log" );

const buildSpeakerNameList = async () => {
	const speakers = await speakerScraper.scrapeSpeakerList( "http://nodevember.org" );
	jetpack.write( "./speaker-names.json", speakers );
};

const buildSpeakerList = async () => {
	const speakerNames = jetpack.read( "./speaker-names.json", "json" );
	const sessionUrls = speakerNames.sessions.map( n => `http://nodevember.org/talk/${ n.name }` );
	const keynoteUrls = speakerNames.keynotes.map( n => `http://nodevember.org/keynote/${ n.name }` );

	try {
		const sessionTasks = sessionUrls.map( speakerScraper.getSpeaker );
		const speakers = await Promise.all( sessionTasks );
		jetpack.write( "./speakers.json", speakers );
	} catch ( err ) {
		log.error( err );
	}

	try {
		const keynoteTasks = keynoteUrls.map( speakerScraper.getSpeaker );
		const keynotes = await Promise.all( keynoteTasks );
		jetpack.write( "./keynotes.json", keynotes );
	} catch ( err ) {
		log.error( err );
	}
};

const buildSpeakerHtmlCards = () => {
	const speakers = jetpack.read( "./speakers.json", "json" );
	const speakerOverrides = jetpack.read( "./speaker-overrides.json", "json" );
	const templateFile = jetpack.read( "./template.hbs" );
	const template = handlebars.compile( templateFile );
	speakers.forEach( speaker => {
		const override = speakerOverrides.find( o => o.name === speaker.name );
		if ( override ) {
			Object.assign( speaker, override );
			log.info( `overriding ${ speaker.name }` );
		}
		const html = template( speaker );
		const fileName = `./speaker-cards/${ speaker.name.toLowerCase().replace( /[ .]/g, "_" ) }.html`;
		log.info( `creating ${ fileName }` );
		jetpack.write( fileName, html );
	} );
};

const renderSpeakerCards = () => {
	const speakers = jetpack.read( "./speakers.json", "json" );
	speakers.forEach( speaker => {
		const url = `http://localhost:8080/${ speaker.name.toLowerCase().replace( /[ .]/g, "_" ) }.html`;
		log.info( `rendering ${ url }` );
		opn( url );
	} );
};

const renderSpeakerTweets = () => {
	const speakers = jetpack.read( "./speakers.json", "json" );
	speakers.forEach( speaker => {
		const slug = speaker.name.toLowerCase().replace( /[ .]/g, "_" );
		log.info( `rendering ${ slug }` );
		const tweet = `Come hear ${ speaker.twitter } at @nodevember present "${ speaker.talk }" #nodevember2017

Excited to have ${ speaker.twitter } at @nodevember present "${ speaker.talk }" #nodevember2017`;
		jetpack.write( `./tweets/${ slug }.txt`, tweet );
	} );
};

module.exports = {
	buildSpeakerNameList,
	buildSpeakerList,
	buildSpeakerHtmlCards,
	renderSpeakerCards,
	renderSpeakerTweets
};
