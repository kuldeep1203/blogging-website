
class WebcryptoAES{
    key:any;//currently typecasting it to any 
    constructor(){
        this.key = null;
    }

    //generate key method

    async generateKey(){
        this.key = await crypto.subtle.generateKey(
            {
                name:'AES-GCM',
                length:256,
            },
            true,
            ['encrypt','decrypt']
        );
    }

    //encrypt plainttext
    async encrypt(plaintext:string){
        if(!this.key){
            throw new Error("key note set .generate a key first");
        }
        const encoder = new TextEncoder();
        const encoded = encoder.encode(plaintext);

        // Generate a random IV
        const iv = crypto.getRandomValues(new Uint8Array(12));

        // Encrypt data
        const ciphertext = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv,
            },
            this.key,
            encoded
        );

        return {
            ciphertext: new Uint8Array(ciphertext), // Convert ArrayBuffer to Uint8Array
            iv: iv,
        };
    }
    async decrypt(ciphertext:BufferSource,iv:Uint8Array){
        if(!this.key){
            throw new Error("key note set .generate a key first");
        }
        const decrypted = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv,
            },
            this.key,
            ciphertext
        );

        const decoder = new TextDecoder();
        return decoder.decode(decrypted);
    }
    
}
export default  WebcryptoAES;