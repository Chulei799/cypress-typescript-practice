import randomstring from "randomstring";

class Utils {

    generateRandomEmail(length: number = 12): string {
        return randomstring.generate({ length: length, charset: 'alphanumeric' }) + '.test@testmail.com';
    }
}

export default new Utils();