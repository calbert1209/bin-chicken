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
const EXPORT_FMT = 'jwk';
const AES_GCM = 'AES-GCM';
const USAGES: ReadonlyArray<KeyUsage> = ['encrypt', 'decrypt'];

function createJwkKey(k: string): JsonWebKey {
  return {
    alg: "A256GCM",
    ext: true,
    k,
    kty: "oct"
  };
}

const AES_GCM_ALGO: AesKeyAlgorithm = { name: AES_GCM, length: 16 };


function importJwkKey(keyData: JsonWebKey) {
  return window.crypto.subtle.importKey(
    EXPORT_FMT,
    keyData,
    AES_GCM_ALGO,
    true,
    USAGES,
  );
}

/***/
function createAESGCMOptions(ivHex: string) {
  return {
  name: 'AES-GCM',
  iv: hexString2Uint8Array(ivHex),
}
}

export async function encrypt2hex(k:string, ivHex: string, plainText: string) {
  const algoOptions = createAESGCMOptions(ivHex);
  const jwk = createJwkKey(k);
  const key = await importJwkKey(jwk);
  const encodedText = new TextEncoder().encode(plainText);
  const buffer = await window.crypto.subtle.encrypt(algoOptions, key, encodedText);
  return uint8Array2hexString(new Uint8Array(buffer));
}

export async function decryptFromHex(k: string, ivHex: string, hexCypherText: string) {
  const algoOptions = createAESGCMOptions(ivHex);
  const jwk = createJwkKey(k);
  const key = await importJwkKey(jwk);
  const cypherText = hexString2Uint8Array(hexCypherText);
  const decrypted = await window.crypto.subtle.decrypt(algoOptions, key, cypherText);
  return new TextDecoder().decode(decrypted);
}

// NOTES
// Import raw key (16 byte random array)
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#raw_import