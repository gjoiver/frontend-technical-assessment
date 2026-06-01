import { getUser } from "./getUser";

// Pass an id as an argument, e.g. `npm start -- 99999`; defaults to 1.
const userId = Number(process.argv[2] ?? 1);

getUser(userId)
  .then((user) => console.log("OK:", user))
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error("ERROR:", error.message, "| cause:", error.cause);
    } else {
      console.error("ERROR:", error);
    }
  });
