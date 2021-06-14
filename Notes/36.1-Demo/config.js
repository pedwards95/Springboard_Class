let DB_URI;

if(process.env.NODE_ENV === "test") {
    DB_URI = "postgresql:///express_auth_test";
} else {
    DB_URI = "postgresql:///express_auth";
}

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const BCRYPT_WORK_FACTOR = 12;

module.exports = {
    DB_URI,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR
};