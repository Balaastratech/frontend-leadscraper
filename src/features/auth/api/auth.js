import fakeUsers from "../../../mock/fakeUsers";

/* ──────────────────────────────
   Utilities
──────────────────────────────── */
function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function hash(pw) {
  return "hash_" + pw; // fake hash
}

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateToken() {
  return Math.random().toString(36).substring(2, 12);
}

/* Store verification codes and reset tokens */
let verificationCodes = {};     // email → code
let resetTokens = {};           // email → reset token

/* ──────────────────────────────
   CHECK IF EMAIL EXISTS
──────────────────────────────── */
export async function checkEmailExists(email) {
  await wait(200);
  return fakeUsers[email] ? true : false;
}

/* ──────────────────────────────
   SIGNUP STEP 1:
   ENTER EMAIL & SEND VERIFICATION CODE
──────────────────────────────── */
export async function startSignup(email) {
  await wait(300);

  if (fakeUsers[email]) throw new Error("exists");

  const code = generateCode();
  verificationCodes[email] = code;

  console.log(
    "%c[MOCK EMAIL] Verification code for " + email + ": " + code,
    "color:#22c55e; font-weight:bold;"
  );

  return { email, sent: true };
}

/* ──────────────────────────────
   SIGNUP STEP 2:
   VERIFY EMAIL CODE
──────────────────────────────── */
export async function verifySignupCode(email, code) {
  await wait(300);

  if (verificationCodes[email] !== code) {
    throw new Error("invalid_code");
  }

  return { verified: true };
}

/* ──────────────────────────────
   SIGNUP STEP 3:
   CREATE ACCOUNT (SET PASSWORD)
──────────────────────────────── */
export async function createAccount(email, password) {
  await wait(300);

  fakeUsers[email] = {
    email,
    passwordHash: hash(password),
    verified: true
  };

  delete verificationCodes[email];

  return { success: true };
}

/* ──────────────────────────────
   LOGIN
──────────────────────────────── */
export async function login(email, password) {
  await wait(200);

  const user = fakeUsers[email];

  if (!user) throw new Error("no_account");
  if (!user.verified) throw new Error("not_verified");
  if (user.passwordHash !== hash(password)) throw new Error("bad_password");

  return {
    user: {
      email,
      name: "User",
      role: "user"
    },
    token: "mock-" + Date.now()
  };
}

/* ──────────────────────────────
   RESET PASSWORD STEP 1:
   Generate reset token and simulate email
──────────────────────────────── */
export async function resetRequest(email) {
  await wait(300);

  const token = generateToken();
  resetTokens[email] = token;

  console.log(
    "%c[MOCK EMAIL] Reset token for " + email + ": " + token,
    "color:#3b82f6; font-weight:bold;"
  );

  return { email, token };
}

/* ──────────────────────────────
   RESET PASSWORD STEP 2:
   Validate token & set new password
──────────────────────────────── */
export async function resetPassword(token, newPassword) {
  await wait(300);

  // find email by token
  const email = Object.keys(resetTokens).find(
    (k) => resetTokens[k] === token
  );

  if (!email) throw new Error("invalid_token");

  fakeUsers[email].passwordHash = hash(newPassword);

  delete resetTokens[email];

  return { success: true };
}
