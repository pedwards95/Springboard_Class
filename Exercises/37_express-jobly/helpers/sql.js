const { BadRequestError } = require("../expressError");

/** sqlForPartialUpdate ( dataToUpdate , jsToSql )
 * A helper method to convert objects into SQL queries. 
 * Takes a list of key value pairs, then seperates just the keys.
 * 
 * Example:
 * {
 *  ab:1,
 *  bc:2
 * }
 * keys = ["ab","bc"]
 * 
 * Then, if applicable, changes those names based on an optional 2nd passed in object.
 * This would be used if the SQL variable names are different.
 * 
 * Example:
 * {
 *  "bc" : "b_c"
 * }
 * keys = ["ab","b_c"]
 * 
 * The function then joins them together into a string that would be commonly used in SQL, assigning variable numbers.
 * 
 * Example:
 * `"ab"=$1, "b_c"=$2`
 * 
 * It then takes the original values. These do not need to be mutated, as they are already in a form that can be passed in to a SQL query.
 * Returns:
 * {
 * selCols:"ab" = $1, "b_c" = $2,
 * values:[1,2]
 * }
 * 
 * Final Result with added SQL:
 * db.query(`UPDATE random_table SET "ab" = $1, "b_c" = $2 WHERE random_id = random_number`, [1,2])
 * 
 * **/

function sqlForPartialUpdate(dataToUpdate, jsToSql={}) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) => {
    return `"${jsToSql[colName] || colName}"=$${idx + 1}`
  });
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

/** filteringCompanies ( { name minEmployees maxEmployees })
 * Helper method for crafting the SQL query needed for filtering companies
 * All inputs are optional, but they must be in object form if you want a return other than an empty string
 * Errors in min > max.
 * Constructs the WHERE statement, and has an array of values that will be submitted alongside the query.
 * Returns:
 * {
 *  text: "WHERE name = $1",
 *  values: ["bob"]
 * }
 */

function filteringCompanies({name,minEmployees,maxEmployees}) {
    name = name || "";
    if(name){
        name = "%" + name.toLowerCase() + "%";
    } 
    minEmployees = minEmployees || 0;
    maxEmployees = maxEmployees || 0;
    if(minEmployees && maxEmployees) {
        if (minEmployees > maxEmployees) 
        {
            throw new BadRequestError("Min Employees can not be greater than Max Employees");
        }
    }
    let nameText = "";
    let minText = "";
    let maxText = "";
    if(name) {
        nameText = `LOWER(name) LIKE`
    }
    if(minEmployees) {
        minText = `num_employees >=`
    }
    if(maxEmployees) {
        maxText = `num_employees <=`
    }

    //return conditions
    let returnText = "WHERE";
    if(nameText && minText && maxText) {
        return {
            text : `${returnText} ${nameText} $1 AND ${minText} $2 AND ${maxText} $3`,
            values : [name,minEmployees,maxEmployees]
        }
    }
    if(nameText && minText && !maxText) {
        return {
            text : `${returnText} ${nameText} $1 AND ${minText} $2`,
            values : [name,minEmployees]
        }
    }
    if(nameText && !minText && maxText) {
        return {
            text : `${returnText} ${nameText} $1 AND ${maxText} $2`,
            values : [name,maxEmployees]
        }
    }
    if(!nameText && minText && maxText) {
        return {
            text : `${returnText} ${minText} $1 AND ${maxText} $2`,
            values : [minEmployees,maxEmployees]
        }
    }
    if(!nameText && !minText && maxText) {
        return {
            text : `${returnText} ${maxText} $1`,
            values : [maxEmployees]
        }
    }
    if(!nameText && minText && !maxText) {
        return {
            text : `${returnText} ${minText} $1`,
            values : [minEmployees]
        }
    }
    if(nameText && !minText && !maxText) {
        return {
            text : `${returnText} ${nameText} $1`,
            values : [minEmployees]
        }
    }
    if(!nameText && !minText && !maxText) {
        return "";
    }
}




module.exports = { sqlForPartialUpdate,filteringCompanies };
