## Nodevember Speaker Cards

The project as-is is probably of no value to you. Unless you are me, and need to generate speaker cards for [Nodevember](http://nodevember.org/) 2017 to be used on social media.

*However*, you may find some the things I'm doing are useful in building your own HTML-to-image rendering scheme for whatever social media campaign you're running.

### Logic in a nutshell

1. Uses [nightmare](https://www.npmjs.com/package/nightmare) and [scrape-it](https://www.npmjs.com/package/scrape-it) to scrape the Nodevember website for speaker profile and talk information.
1. Stores the speaker data in a JSON file.
1. Combines the JSON data with a [handlebars](http://handlebarsjs.com/) template to generate the HTML for a speaker "card."
1. When the speaker card is viewed in the browser, it uses a fork of [dom-to-image](https://github.com/eltonjuan/dom-to-image) to turn the HTML into a high-res PNG, and automatically downloads it.
1. Combines the JSON data with a JavaScript string template to render variations of tweets.

Feel free to "borrow" any of these ideas for your own purposes!
