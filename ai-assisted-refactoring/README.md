# Exercise 4 — AI-Assisted Code Refactoring

Refactor a small `fetch` helper into **modern, production-ready** code with AI assistance.
Decisions (made by the human): **TypeScript** · **`throw` of a plain `Error`** (the specific reason
is carried in `cause`) · **self-contained** single file. No timeout/test added — the goal is to
refactor the logic and show what was wrong, the problems it would cause, and how the refactor fixes
them.

## Requirements (all met)

- [x] **Use AI to refactor the code** — refactored AI-assisted (Claude / Claude Code).
- [x] **Explain which prompts were used** — see [AI prompts used](#ai-prompts-used) below.
- [x] **Deliver the final clean version of the code** — [getUser.ts](getUser.ts), also inlined under [Final clean version](#final-clean-version) and runnable via `npm start`.

## Original code

```js
function getUser(d){ return fetch("https://jsonplaceholder.typicode.com/users/"+d).then(x=>x.json()).then(j=>console.log(j)) }
```

## What's wrong, the future problems, and how the refactor fixes it

| Issue in the original | Problem it would cause | Fixed by |
|---|---|---|
| `console.log(j)` **inside** the function, and it **returns `undefined`** (the last `.then` returns the log) | The function is unusable: callers can't get the data; logging leaks into production; not reusable or testable | **Returns** a typed `User`; the caller decides what to do — no side effect |
| No `response.ok` check (`fetch` does **not** reject on 404/500) | 404/500 are silently treated as success → `undefined`/garbage flows downstream, bugs that are hard to trace | Checks `response.ok` → throws with the HTTP status |
| No error handling (network / JSON parse) | Unhandled promise rejections and silent failures; the app hangs or crashes with no clear signal | A single `try/catch` wraps the request; any failure throws `Failed to fetch user <id>` with the specific reason (network / `HTTP 404` / parse) preserved in `cause` |
| No input validation | `getUser(undefined)` fetches `/users/undefined` → confusing 404, wasted request | Validates `userId` is a positive integer up front |
| Meaningless names `d` / `x` / `j` | Unreadable and hard to maintain as the code grows | Intent-revealing names + a `User` type |
| `.then` chains | Harder to read and to place error handling | `async/await` |
| Untyped | No autocomplete; wrong-shape data slips through at runtime | **TypeScript** types on input (`number`) and output (`User`) |
| URL string concatenation, hardcoded inline | Hard to change base URL / environment; duplicated if reused | A `BASE_URL` constant |

## Final clean version

See [getUser.ts](getUser.ts):

```ts
const BASE_URL = "https://jsonplaceholder.typicode.com";

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export async function getUser(userId: number): Promise<User> {
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error(`Invalid user id: ${userId}`);
  }

  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return (await response.json()) as User;
  } catch (cause) {
    throw new Error(`Failed to fetch user ${userId}`, { cause });
  }
}
```

**How to use it** (the caller owns the logging/handling that used to be baked in):

```ts
try {
  const user = await getUser(1);
  console.log(user);
} catch (error) {
  // network / HTTP / parse / validation — all surface here with a clear message
  console.error(error);
}
```

## Run it from the repo

Requires **Node 18+** (built-in `fetch`).

```bash
cd ai-assisted-refactoring
npm install
npm start            # calls getUser(1) and prints the user
npm start -- 99999   # other ids: 404 (not found) → real reason in `cause`
npm start -- -1      # validation error (never hits the network)
```

The runner ([try.ts](try.ts)) imports `getUser`, calls it, and logs the user or the error
(with its `cause`).

## AI prompts used

The refactor was done **AI-assisted** (Claude / Claude Code), using the project's analysis-first
method. The prompts that drove it:

1. **Task** — *"Exercise 4: AI-Assisted Code Refactoring. Refactor this code into modern,
   production-ready quality: `function getUser(d){ return fetch(".../users/"+d).then(x=>x.json())
   .then(j=>console.log(j)) }`. Use AI to refactor, explain the prompts used, deliver the final
   clean version."*
2. **Method** — *"Use the same formula: **Open Loops · Happy Path / Edge Cases / Errors**, and
   create a **work plan** in the explanation of the exercise."*
3. **Decisions** (answers to the AI's clarifying questions) — *"TypeScript; throw a plain Error;
   self-contained single file."*
4. **Scope** — *"Just refactor the logic: show what's wrong with the current code, what future
   problems it could cause, and how the refactoring solves them."*

> *Note on method:* the AI surfaced the issues, edge cases and error modes, proposed options and a
> work plan, and produced the refactor; the human set the target (language, error style, scope).
