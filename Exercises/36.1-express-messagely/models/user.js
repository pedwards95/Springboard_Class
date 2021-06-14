/** User class for message.ly */

const ExpressError = require("../expressError");
const bcrypt = require("bcrypt");
const db = require("../db");
const {BCRYPT_WORK_FACTOR} = require("../config")

/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) { 
    try{
        if(!username|| !password || !first_name || !last_name || !phone) {
            throw new ExpressError(`Some required information is missing.`,400)
        }
        const hashedPassword = await bcrypt.hash(password,BCRYPT_WORK_FACTOR);
        const result = await db.query(`
        INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING username, password, first_name, last_name, phone`,
        [username, hashedPassword, first_name, last_name, phone, getDate(), getDate()]);
        return result.rows[0];
    } catch(e) {
        return e;
    }
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) { 
    const results = await db.query(`
        SELECT username,password 
        FROM users
        WHERE username = $1`,[username])
    const user = results.rows[0];
    if(user){
        if(await bcrypt.compare(password,user.password)) {
            return true;
        }
    }
    return false;
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) { 
        const results = await db.query('UPDATE users SET last_login_at = $2 WHERE username=$1 RETURNING username',[username,getDate()])
        if(results) {
            return true;
        }
        throw new ExpressError(`User not found!.`,404)
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() { 
    const result = await db.query(`
        SELECT username, first_name, last_name, phone 
        FROM users`)
    if(!result.rows[0]) {
        throw new ExpressError(`No users found.`,404)
    }
    return result.rows;
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) { 
    const results = await db.query(`
        SELECT username, first_name, last_name, phone, join_at, last_login_at 
        FROM users
        WHERE username = $1`,[username])
    if(!results.rows[0]) {
        throw new ExpressError(`User not found.`,404)
    }
    return results.rows[0];
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    const results = await db.query(`
        SELECT m.id, u.username, u.first_name, u.last_name, u.phone, m.body, m.sent_at, m.read_at
        FROM messages AS m
        INNER JOIN users AS u
        ON m.to_username = u.username
        WHERE from_username = $1`,[username])
    if(!results.rows[0]) {
        throw new ExpressError(`This user has not sent any messages.`,404)
    }
    return results.rows;
   }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {id, first_name, last_name, phone}
   */

  static async messagesTo(username) { 
    const results = await db.query(`
        SELECT m.id, u.id, u.first_name, u.last_name, u.phone, m.user, m.body, m.sent_at, m.read_at 
        FROM messages AS m
        INNER JOIN users AS u
        ON messages.from_username = users.username
        WHERE to_username = $1`,[username])
    if(!results.rows[0]) {
        throw new ExpressError(`This user has not recieved any messages.`,404)
    }
    return results.rows;
  }
}

function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}



module.exports = User;