class Validator {
    validateUser(username, password) {
        if (!username) {
            throw new Error('Login must not be empty!');
        }
        if (!password) {
            throw new Error('Password must not be empty!');
        }
        return true;
    }
}
module.exports = Validator;