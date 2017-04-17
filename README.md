# Miami Herald Newsroom Alexa Skill

## Installation

* run `npm install` inside of the src directory, this will install the Alexa SDK and http packages

* The current Sample Utterances are located in `speechAssets/SampleUtterances.txt`

## Updating

* The code is hosted and executed on [Amazon Lamda](https://aws.amazon.com/lambda/).  When you're ready to update, create a new .zip file inside the src directory containing the `index.js`, `package.json` and `node_modules` folder.

* Login to Lambda, select the `miamiHeraldNewsroom` function and upload the new .zip where it says 'Function package'

## That's it

* If you want to update any of the Sample Utterances, that can be done on the [Amazon Alexa skill editor](https://developer.amazon.com/)
