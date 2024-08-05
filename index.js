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

let alreadyRanCalm = false;
let alreadyRanLemon = false;
let alreadyRanLeftHand = false;
let alreadyRanTongue = false;

neurosity.calm().subscribe((calm) => {
  if (calm.probability > 0.3 && !alreadyRanCalm) {
    createChatResponse("I am demotivated. Please Motivate me");
  }
  alreadyRanCalm = true;
});

// Change the string in kinesis("bitingALemon")
// to the kinesis / leftHandPinch or other types as listed in the
// Metrics Predictions section of the neurosity dashboard if you want
// to try other kinesis types

// Biting A Lemon Example
neurosity.kinesis("bitingALemon").subscribe(async (intent) => {
  // Change the number below to change the probility match for
  // firing off the code in the if statement
  const confidenceMatch = intent.confidence > 0.5;
  if (!alreadyRanLemon && confidenceMatch) {
    console.log("bitingALemon ran");
    const prompt = "a man biting a lemon";
    createImage(prompt);
  }

  //ensure we only run the code once to reduce API calls
  alreadyRanLemon = true;
});

// Left Hand Pinch Example
neurosity.kinesis("leftHandPinch").subscribe(async (intent) => {
  // Change the number below to change the probility match for
  // firing off the code in the if statement
  const confidenceMatch = intent.confidence > 0.5;
  if (!alreadyRanLeftHand && confidenceMatch) {
    console.log("leftHandPinch ran");
    const prompt = "a left hand pinching";
    createImage(prompt);
  }

  //ensure we only run the code once to reduce API calls
  alreadyRanLeftHand = true;
});

// Tongue Example
neurosity.kinesis("tongue").subscribe(async (intent) => {
  // Change the number below to change the probility match for
  // firing off the code in the if statement
  const confidenceMatch = intent.confidence > 0.5;
  if (!alreadyRanTongue && confidenceMatch) {
    console.log("tongue ran");
    const prompt = "a tongue sticking out";
    createImage(prompt);
  }

  //ensure we only run the code once to reduce API calls
  alreadyRanTongue = true;
});

main();
