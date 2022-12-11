/*****************************************
 * Hex <--> Uint8Array
 */
 function hexString2Uint8Array(hex: string) {
  const count = Math.floor(hex.length / 2);
  const output = [];
  for(let i = 0; i < count; i++) {
    const cursor = i * 2;
    const pair = hex.substring(cursor, cursor + 2);
    output.push(parseInt(pair, 16));
  }

  return new Uint8Array(output);
}

function uint8Array2hexString(u8: Uint8Array) {
  return [...u8]
    .map(value => {
      const hex = value.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');
}

/*****************************************
 * Key Creation
 */
const AES_GCM = 'AES-GCM';
const PBKDF2 = 'PBKDF2';
const SHA_256 = 'SHA-256';
const READ_WRITE_USAGE: ReadonlyArray<KeyUsage> = ['encrypt', 'decrypt'];
const DERIVE_USAGE: ReadonlyArray<KeyUsage> = ['deriveKey', 'deriveBits'];

const SALT = new Uint8Array(
  [140, 228, 171, 171, 157, 177, 126, 48, 206, 61, 152, 162, 189, 176, 174, 116]
);

const PBKDF2_PARAMS: Pbkdf2Params = {
  name: PBKDF2,
  hash: SHA_256,
  salt: SALT,
  iterations: 10,
};

function createAesGcmOptions(ivHex: string) {
  return {
    name: AES_GCM,
    iv: hexString2Uint8Array(ivHex),
  };
}

/*
 * Get some key material to use as input to the deriveKey method.
 * The key material is a password supplied by the user.
 * FROM: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey
*/
function getKeyMaterial(password: string) {
  const enc = new TextEncoder();
  return window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    PBKDF2,
    false,
    DERIVE_USAGE,
  );
}

function deriveKey(keyMaterial: CryptoKey) {
  return window.crypto.subtle.deriveKey(
    PBKDF2_PARAMS,
    keyMaterial,
    { name: AES_GCM, length: 256},
    true,
    READ_WRITE_USAGE,
  );
}

export async function encrypt2hex(password: string, ivHex: string, plaintext: string, ) {
  const keyMaterial = await getKeyMaterial(password);
  const key = await deriveKey(keyMaterial);

  const enc = new TextEncoder();
  const cypherBuffer = await window.crypto.subtle.encrypt(
    createAesGcmOptions(ivHex),
    key,
    enc.encode(plaintext),
  );

  return uint8Array2hexString(new Uint8Array(cypherBuffer));
}

export async function decryptFromHex(password: string, ivHex: string, hexCypherText: string) {
  const keyMaterial = await getKeyMaterial(password);
  const key = await deriveKey(keyMaterial);
  const cypherText = hexString2Uint8Array(hexCypherText);

  const decrypted = await window.crypto.subtle.decrypt(
    createAesGcmOptions(ivHex),
    key,
    cypherText,
  );

  return new TextDecoder().decode(decrypted);
}
