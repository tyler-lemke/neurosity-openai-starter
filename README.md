This project will help you get started using the Neurosity SDK with OpenAI.

## Getting Started

1. Install the following software
   - [VSCode](https://code.visualstudio.com/download)
   - [NodeJS LTS](https://nodejs.org/en)
2. Create your [neurosity account](https://console.neurosity.co/) and connect your device
3. Create a [OpenAi Platform account](https://platform.openai.com/)
   - add a small amount to your [credit balance](https://platform.openai.com/settings/organization/billing/overview) and don't add auto recharge to make sure you keep your costs low
4. [Download the code](https://github.com/tyler-lemke/neurosity-openai-starter/archive/refs/heads/main.zip)
5. Unzip the code
6. Open the unzipped folder in VSCode
7. Open the terminal from the context of your folder
8. Type this command in the terminal
   ```
   npm install
   ```
9. create a copy of .example-env and name it .env
10. Fill out all of the credentials needed here from your neurosity device [Your Device Id here](https://console.neurosity.co/settings)
11. [Create an API key from OpenAI](https://platform.openai.com/api-keys) and copy it
12. Paste the API key into the .env file
13. Go back to the VS Code Terminal and use the following command to run
   ```
   npm start
   ```