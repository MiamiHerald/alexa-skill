var Alexa = require('alexa-sdk');
var http = require('http');

var states = {
    SEARCHMODE: '_SEARCHMODE'
};

var numberOfResults = 5;

var welcomeMessage = "Welcome to the Miami Herald Newsroom. You can ask me for latest news, local news, sports, dolphins news, national news or say help. What will it be?";

var welcomeRepromt = "You can ask me for an latest news, local news, sports, dolphins news, national news or say help. What will it be?";

var HelpMessage = "Here are some things you  can say: Read me local news. Tell me the sports headlines. What is the national news. What would you like to do?";

var moreInformation = "See Miamiherald.com for more information."

var tryAgainMessage = "please try again."

var noSectionErrorMessage = "There was an error finding that section, " + tryAgainMessage;

var getMoreInfoRepromtMessage = "What number attraction would you like to hear about?";

var getMoreInfoMessage = "OK, " + getMoreInfoRepromtMessage;

var goodbyeMessage = "OK, make sure to check back for the latest updates from the Miami Herald Newsroom.";

var latestIntroMessage = "These are the " + numberOfResults + " latest headlines from the Miami Herald, you can read more on miamiherald.com. ";

var hearMoreMessage = "Would you like to hear about what else happening on miamiherald.com?";

var newline = "\n";

var output = "";

var alexa;

var newSessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = states.SEARCHMODE;
        output = welcomeMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
    'getLatestIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getLatestIntent');
    },
    'getLocalIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getLocalIntent');
    },
    'getSportsIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getSportsIntent');
    },
    'getDolphinsIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getDolphinsIntent');
    },
    'getNationalIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('getNationalIntent');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    },
};

var startSearchHandlers = Alexa.CreateStateHandler(states.SEARCHMODE, {
    'getLatestIntent': function () {
        httpGet('latest', function (response) {

            // Parse the response into a JSON object ready to be formatted.
            var responseData = JSON.parse(response);
            var cardContent = "Data provided by Miami Herald\n\n";

            // Check if we have correct data, If not create an error speech out to try again.
            if (responseData == null) {
                output = "There was a problem with getting data please try again";
            }
            else {
                output = latestIntroMessage;

                // If we have data.
                for (var i = 0; i < responseData.length; i++) {

                    if (i < numberOfResults) {
                        // Get the name and description JSON structure.
                        var headline = responseData[i].mainText;
                        var index = i + 1;

                        output += " Article " + index + ": " + headline + ";";

                        cardContent += " Headline " + index + ".\n";
                        cardContent += headline + ".\n\n";
                    }
                }

                output += " You can ask me to read another section, or say stop to exit";
            }

            var cardTitle = "Latest News";

            alexa.emit(':askWithCard', output, hearMoreMessage, cardTitle, cardContent);
        });
    },
    'getLocalIntent': function () {
        httpGet('local', function (response) {

            // Parse the response into a JSON object ready to be formatted.
            var responseData = JSON.parse(response);
            var cardContent = "Data provided by Miami Herald\n\n";

            // Check if we have correct data, If not create an error speech out to try again.
            if (responseData == null) {
                output = "There was a problem with getting data please try again";
            }
            else {
                output = latestIntroMessage;

                // If we have data.
                for (var i = 0; i < responseData.length; i++) {

                    if (i < numberOfResults) {
                        // Get the name and description JSON structure.
                        var headline = responseData[i].mainText;
                        var index = i + 1;

                        output += " Article " + index + ": " + headline + ";";

                        cardContent += " Headline " + index + ".\n";
                        cardContent += headline + ".\n\n";
                    }
                }

                output += " You can ask me to read another section, or say stop to exit";
            }

            var cardTitle = "Latest Local News";

            alexa.emit(':askWithCard', output, hearMoreMessage, cardTitle, cardContent);
        });
    },
    'getSportsIntent': function () {
        httpGet('sports', function (response) {

            // Parse the response into a JSON object ready to be formatted.
            var responseData = JSON.parse(response);
            var cardContent = "Data provided by Miami Herald\n\n";

            // Check if we have correct data, If not create an error speech out to try again.
            if (responseData == null) {
                output = "There was a problem with getting data please try again";
            }
            else {
                output = latestIntroMessage;

                // If we have data.
                for (var i = 0; i < responseData.length; i++) {

                    if (i < numberOfResults) {
                        // Get the name and description JSON structure.
                        var headline = responseData[i].mainText;
                        var index = i + 1;

                        output += " Article " + index + ": " + headline + ";";

                        cardContent += " Headline " + index + ".\n";
                        cardContent += headline + ".\n\n";
                    }
                }

                output += " You can ask me to read another section, or say stop to exit";
            }

            var cardTitle = "Latest Sports News";

            alexa.emit(':askWithCard', output, hearMoreMessage, cardTitle, cardContent);
        });
    },
    'getDolphinsIntent': function () {
        httpGet('dolphins', function (response) {

            // Parse the response into a JSON object ready to be formatted.
            var responseData = JSON.parse(response);
            var cardContent = "Data provided by Miami Herald\n\n";

            // Check if we have correct data, If not create an error speech out to try again.
            if (responseData == null) {
                output = "There was a problem with getting data please try again";
            }
            else {
                output = latestIntroMessage;

                // If we have data.
                for (var i = 0; i < responseData.length; i++) {

                    if (i < numberOfResults) {
                        // Get the name and description JSON structure.
                        var headline = responseData[i].mainText;
                        var index = i + 1;

                        output += " Article " + index + ": " + headline + ";";

                        cardContent += " Headline " + index + ".\n";
                        cardContent += headline + ".\n\n";
                    }
                }

                output += " You can ask me to read another section, or say stop to exit";
            }

            var cardTitle = "Latest Dolphins News";

            alexa.emit(':askWithCard', output, hearMoreMessage, cardTitle, cardContent);
        });
    },
    'getNationalIntent': function () {
        httpGet('national', function (response) {

            // Parse the response into a JSON object ready to be formatted.
            var responseData = JSON.parse(response);
            var cardContent = "Data provided by Miami Herald\n\n";

            // Check if we have correct data, If not create an error speech out to try again.
            if (responseData == null) {
                output = "There was a problem with getting data please try again";
            }
            else {
                output = latestIntroMessage;

                // If we have data.
                for (var i = 0; i < responseData.length; i++) {

                    if (i < numberOfResults) {
                        // Get the name and description JSON structure.
                        var headline = responseData[i].mainText;
                        var index = i + 1;

                        output += " Article " + index + ": " + headline + ";";

                        cardContent += " Headline " + index + ".\n";
                        cardContent += headline + ".\n\n";
                    }
                }

                output += " You can ask me to read another section, or say stop to exit";
            }

            var cardTitle = "Latest National News";

            alexa.emit(':askWithCard', output, hearMoreMessage, cardTitle, cardContent);
        });
    },
    'AMAZON.YesIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.NoIntent': function () {
        output = HelpMessage;
        this.emit(':ask', HelpMessage, HelpMessage);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.HelpIntent': function () {
        output = HelpMessage;
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', output, HelpMessage);
    },
    'AMAZON.CancelIntent': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit(":tell", goodbyeMessage);
    },
    'SessionEndedRequest': function () {
        // Use this function to clear up and save any data needed between sessions
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function () {
        output = HelpMessage;
        this.emit(':ask', output, welcomeRepromt);
    }
});

exports.handler = function (event, context, callback) {
    alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandlers, startSearchHandlers);
    alexa.execute();
};

// Create a web request and handle the response.
function httpGet(query, callback) {
  console.log("/n QUERY: "+query);

    var options = {
        host: 'dev.miamifly.net',
        path: '/alexa/' + query + '.json',
        method: 'GET'
    };

    var req = http.request(options, (res) => {

        var body = '';

        res.on('data', (d) => {
            body += d;
        });

        res.on('end', function () {
            callback(body);
        });

    });
    req.end();

    req.on('error', (e) => {
        console.error(e);
    });
}

String.prototype.trunc =
      function (n) {
          return this.substr(0, n - 1) + (this.length > n ? '&hellip;' : '');
      };
