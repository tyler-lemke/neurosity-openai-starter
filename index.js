import { Neurosity } from "@neurosity/sdk";
import "dotenv/config";
import { createImage, createChatResponse } from "./openai.js";

// Reference the Neurosity SDK docs if you want more info
// on how to add other functionality https://docs.neurosity.co/docs/overview

// Make sure that you created the .env file and added your data there
// Don't touch the lines below
const deviceId = process.env.NEUROSITY_DEVICE_ID || "";
const email = process.env.NEUROSITY_EMAIL || "";
const password = process.env.NEUROSITY_PASSWORD || "";

const neurosity = new Neurosity({
  deviceId,
});

const main = async () => {
  await neurosity
    .login({
      email,
      password,
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
  console.log("Logged in");
};

let alreadyRan = false;

neurosity.calm().subscribe((calm) => {
  if (calm.probability > 0.3) {
    createChatResponse("I am demotivated. Please Motivate me");
  }
});

// Change the string in kinesis("bitingALemon")
// to any of the following to try them out after training in the console
//
neurosity.kinesis("bitingALemon").subscribe(async (intent) => {
  // Change the number below to change the probility match for
  // firing off the code in the if statement
  const probabilityMatch = intent.probability > 0.5;
  if (!alreadyRan && probabilityMatch) {
    console.log("bitingALemon ran");
    const prompt = "a man biting a lemon";
    createImage(prompt);
  }

  //ensure we only run the code once to reduce API calls
  alreadyRan = true;
});

main();
