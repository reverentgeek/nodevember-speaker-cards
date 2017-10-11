const winston = require( "winston" );
const logger = new winston.Logger( {
	transports: [
		new winston.transports.Console()
	]
} );
logger.cli();
module.exports = logger;
