const yargs = require( "yargs" );
const speakerRender = require( "./speakerRender" );
const log = require( "./log" );

const main = async () => {
	const options = yargs
		.option( "build-speaker-name-list", { demand: false, describe: "retrive all the speaker names", type: "boolean" } )
		.option( "build-speaker-list", { demand: false, describe: "scrape all the speaker bios", type: "boolean" } )
		.option( "build-speaker-html", { demand: false, describe: "merge all the speaker html cards", type: "boolean" } )
		.option( "render-speaker-cards", { demand: false, describe: "render all speaker cards", type: "boolean" } )
		.option( "render-speaker-tweets", { demand: false, describe: "render all speaker tweets", type: "boolean" } )
		.argv;

	if ( options[ "build-speaker-name-list" ] ) {
		log.info( "building list of speaker names..." );
		await speakerRender.buildSpeakerNameList();
	}

	if ( options[ "build-speaker-list" ] ) {
		log.info( "building list of all speaker info..." );
		await speakerRender.buildSpeakerList();
	}

	if ( options[ "build-speaker-html" ] ) {
		log.info( "creating all speaker html cards..." );
		await speakerRender.buildSpeakerHtmlCards();
	}

	if ( options[ "render-speaker-cards" ] ) {
		log.info( "rendering all speaker html cards..." );
		await speakerRender.renderSpeakerCards();
	}

	if ( options[ "render-speaker-tweets" ] ) {
		log.info( "rendering all speaker tweets..." );
		await speakerRender.renderSpeakerTweets();
	}
};

main().then( () => {
	log.info( "finished." );
} );
