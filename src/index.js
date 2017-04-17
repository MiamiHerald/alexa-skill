var Alexa = require('alexa-sdk');
var http = require('http');

var states = {
    SEARCHMODE: '_SEARCHMODE'
};

var numberOfResults = 5;

var welcomeMessage = "Welcome to the Miami Herald Newsroom. You can ask me for latest news, local news, sports news, dolphins news, national news or say help. What will it be?";

var welcomeReprompt = "You can ask me for latest news, local news, sports, dolphins news, national news or say help. What will it be?";

var listSectionsMessage = "Which section would you like to hear? Latest news, local news, sports news, dolphins news or national news";

var HelpMessage = "Here are some things you  can say: Read me local news. Tell me the sports headlines. What is the national news. What would you like to do?";

var moreInformation = "See Miamiherald.com for more information."

var tryAgainMessage = "please try again."

var noSectionErrorMessage = "There was an error finding that section, " + tryAgainMessage;

var getMoreInfoRepromptMessage = "What section would you like to hear about?";

var getMoreInfoMessage = "OK, " + getMoreInfoRepromptMessage;

var goodbyeMessage = "OK, make sure to check back for the latest updates from the Miami Herald Newsroom. Goodbye.";

var hearMoreMessage = "Would you like to hear about what else happening on miamiherald.com?";

var newline = "\n";

var output = "";

var breakTime = "<break time = '750ms'/>";

var alexa;

var newSessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = states.SEARCHMODE;
        output = welcomeMessage;
        this.emit(':ask', output, welcomeReprompt);
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
    'listSectionsIntent': function () {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState('listSectionsIntent');
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
        this.emit(':ask', output, welcomeReprompt);
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
                output = "These are the " + numberOfResults + " latest headlines from the Miami Herald. You can read more on miamiherald.com." + breakTime;

                // If we have data.
                for (var i = 0; i < responseData.length; i++) {

                    if (i < numberOfResults) {
                        // Get the name and description JSON structure.
                        var title = responseData[i].titleText;
                        var description = responseData[i].description;
                        var url = responseData[i].url;
                        var index = i + 1;

                        output += " Article " + index + ": " + description + breakTime;

                        cardContent += title + "\n";
                        cardContent += description + "\n\n";
                    }
                }

                output += " Would you like me to read you another section? Or, say stop to exit";
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
                output = "These are the " + numberOfResults + " latest local headlines from the Miami Herald. You can read more on miamiherald.com." + breakTime;

                // If we have data.
                for (var i = 0; i < responseData.length; i++) {

                    if (i < numberOfResults) {
                        // Get the name and description JSON structure.
                        var title = responseData[i].titleText;
                        var description = responseData[i].description;
                        var url = responseData[i].url;
                        var index = i + 1;

                        output += " Article " + index + ": " + description + breakTime;

                        cardContent += title + "\n";
                        cardContent += description + "\n\n";
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
                output = "These are the " + numberOfResults + " latest sports headlines from the Miami Herald. You can read more on miamiherald.com." + breakTime;

                // If we have data.
                for (var i = 0; i < responseData.length; i++) {

                    if (i < numberOfResults) {
                        // Get the name and description JSON structure.
                        var title = responseData[i].titleText;
                        var description = responseData[i].description;
                        var url = responseData[i].url;
                        var index = i + 1;

                        output += " Article " + index + ": " + description + breakTime;

                        cardContent += title + "\n";
                        cardContent += description + "\n\n";
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
                output = "These are the " + numberOfResults + " latest dolphins headlines from the Miami Herald. You can read more on miamiherald.com." + breakTime;

                // If we have data.
                for (var i = 0; i < responseData.length; i++) {

                    if (i < numberOfResults) {
                        // Get the name and description JSON structure.
                        var title = responseData[i].titleText;
                        var description = responseData[i].description;
                        var url = responseData[i].url;
                        var index = i + 1;

                        output += " Article " + index + ": " + description + breakTime;

                        cardContent += title + "\n";
                        cardContent += description + "\n\n";
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
                output = "These are the " + numberOfResults + " latest national headlines from the Miami Herald. You can read more on miamiherald.com." + breakTime;

                // If we have data.
                for (var i = 0; i < responseData.length; i++) {

                    if (i < numberOfResults) {
                        // Get the name and description JSON structure.
                        var title = responseData[i].titleText;
                        var description = responseData[i].description;
                        var url = responseData[i].url;
                        var index = i + 1;

                        output += " Article " + index + ": " + description + breakTime;

                        cardContent += title + "\n";
                        cardContent += description + "\n\n";
                    }
                }

                output += " You can ask me to read another section, or say stop to exit";
            }

            var cardTitle = "Latest National News";

            alexa.emit(':askWithCard', output, hearMoreMessage, cardTitle, cardContent);
        });
    },
    'listSectionsIntent': function () {
        output = listSectionsMessage;
        this.emit(':ask', output, HelpMessage);
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
        this.emit(':ask', output, welcomeReprompt);
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
