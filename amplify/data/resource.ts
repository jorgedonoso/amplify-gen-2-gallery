import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Profile: a
    .model({
      image: a.string().required(),

      // Basic
      gender: a.string(),
      age: a.float(),
      ethnicity: a.string(),

      // Hair
      hairColor: a.string(),
      hairLength: a.string(),
      bald: a.float(),

      // Eyes
      eyeColor: a.string(),

      // Face
      smile: a.float(),

      // Makeup
      eyeMakeup: a.float(),
      lipMakeup: a.float(),

      // Emotions
      happiness: a.float(),
      sadness: a.float(),
      anger: a.float(),
      surprise: a.float(),
      neutral: a.float(),

      // Facial hair
      moustache: a.float(),
      beard: a.float(),
      sideburns: a.float(),

      // Confidence / quality
      bugProbability: a.float(),
    })
    .authorization((allow) => [allow.guest().to(["read"])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "identityPool",
  },
});
