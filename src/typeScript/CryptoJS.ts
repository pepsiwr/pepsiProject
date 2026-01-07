import CryptoJS from 'crypto-js';

const Crypto = {
    randomKey: '',
    initialize: async () => {
        Crypto.randomKey = 'pepsI2024_@Pepsi2024'; // Replace with your actual key management logic
    },
    encrypted: async (data: any) => {
        await Crypto.initialize();
        // Convert the secret key to a WordArray object
        const key = CryptoJS.enc.Utf8.parse(Crypto.randomKey);

        // Perform AES encryptionDD
        const encrypted = CryptoJS.AES.encrypt(data, key, {
            mode: CryptoJS.mode.ECB, // You can choose the mode as per your requirements
            padding: CryptoJS.pad.Pkcs7, // You can choose the padding as per your requirements
        });

        // Convert the encrypted data to a base64-encoded string
        return encrypted.toString()?.replace(/\//g, '_');
    },
    decryptText: async (encrypted: any) => {
        await Crypto.initialize();
        // Convert the secret key to a WordArray object
        const key = CryptoJS.enc.Utf8.parse(Crypto.randomKey);

        // Perform AES decryption
        const decrypted = CryptoJS.AES.decrypt(encrypted?.replace(/_/g, '/'), key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        });

        // Convert the decrypted data to a UTF-8 string
        return decrypted.toString(CryptoJS.enc.Utf8);
    },
    // generateRandomKey: () => {
    //     // Generate a random 256-bit key and convert it to a base64-encoded string
    //     const randomKey = CryptoJS.lib.WordArray.random(256 / 8).toString(
    //         CryptoJS.enc.Base64
    //     );
    //     return randomKey;
    // },
}
export default Crypto;