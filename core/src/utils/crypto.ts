import crypto from "crypto";
export async function genRSA(_str: string) {
  return new Promise((resolve, rejects) => {
    crypto.generateKeyPair(
      "rsa",
      {
        modulusLength: 1024,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      },
      (err, _publicKey, privateKey) => {
        if (err) {
          rejects(err);
        }
        resolve(privateKey);
      }
    );
  });
}
