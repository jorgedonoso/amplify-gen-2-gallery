import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "images",
  access: (allow) => ({
    "public/*": [allow.guest.to(["read"])],
  }),
});
