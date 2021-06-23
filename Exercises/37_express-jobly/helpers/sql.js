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
    //string adjustments
    if(name){
        name = "%" + name.toLowerCase() + "%";
    } 
    
    //check max>min
    if(minEmployees && maxEmployees) {
        if (minEmployees > maxEmployees) 
        {
            throw new BadRequestError("Min Employees can not be greater than Max Employees");
        }
    }
    let nameText = "";
    let minText = "";
    let maxText = "";
    const outputSqlCountValue = [[],[],[]]
    let counter = 1;
    if(name) {
        nameText = `LOWER(name) LIKE`
        outputSqlCountValue[0].push(nameText);
        outputSqlCountValue[1].push(counter);
        outputSqlCountValue[2].push(name);
        counter++;
    }
    if(minEmployees) {
        minText = `num_employees >=`
        outputSqlCountValue[0].push(minText);
        outputSqlCountValue[1].push(counter);
        outputSqlCountValue[2].push(minEmployees);
        counter++;
    }
    if(maxEmployees) {
        maxText = `num_employees <=`
        outputSqlCountValue[0].push(maxText);
        outputSqlCountValue[1].push(counter);
        outputSqlCountValue[2].push(maxEmployees);
        counter++;
    }

    //return construction
    let returnText = "WHERE";
    if(outputSqlCountValue[0].length == 0) {
        return {
            text:"",
            values:[]
        };
    }

    returnText = returnText + ` ${outputSqlCountValue[0][0]} $${outputSqlCountValue[1][0]}`
    for(let i = 1;i<outputSqlCountValue[0].length;i++){
        returnText = returnText + ` AND ${outputSqlCountValue[0][i]} $${outputSqlCountValue[1][i]}`
    }
    return {
        "text":returnText,
        "values":outputSqlCountValue[2]
    }
}

/** filteringJobs ( { name minSalary maxSalary minEquity maxEquity })
 * Helper method for crafting the SQL query needed for filtering jobs
 * All inputs are optional, but they must be in object form if you want a return other than an empty string
 * Errors in min > max.
 * Constructs the WHERE statement, and has an array of values that will be submitted alongside the query.
 * Returns:
 * {
 *  text: "WHERE name = $1",
 *  values: ["bob"]
 * }
 */

function filteringJobs({title,minSalary,maxSalary,minEquity,maxEquity,hasEquity}) {
    //string adjustments
    if(title){
        title = "%" + title.toLowerCase() + "%";
    } 
    if(minEquity){
        minEquity = "" + minEquity;
    } 
    if(maxEquity){
        maxEquity = "" + maxEquity;
    } 

    //check max>min
    if(minSalary && maxSalary) {
        if (minSalary > maxSalary) 
        {
            throw new BadRequestError("Min Salary can not be greater than Max Salary");
        }
    }

    if(minEquity && maxEquity) {
        if (minEquity > maxEquity) 
        {
            throw new BadRequestError("Min Equity can not be greater than Max Equity");
        }
    }

    let titleText = "";
    let minSText = "";
    let maxSText = "";
    let minEText = "";
    let maxEText = "";
    let hasEquityText = "";
    const outputSqlCountValue = [[],[],[]]
    let counter = 1;
    if(title) {
        titleText = `LOWER(title) LIKE`
        outputSqlCountValue[0].push(titleText);
        outputSqlCountValue[1].push(counter);
        outputSqlCountValue[2].push(title);
        counter++;
    }
    if(minSalary) {
        minSText = `salary >=`
        outputSqlCountValue[0].push(minSText);
        outputSqlCountValue[1].push(counter);
        outputSqlCountValue[2].push(minSalary);
        counter++;
    }
    if(maxSalary) {
        maxSText = `salary <=`
        outputSqlCountValue[0].push(maxSText);
        outputSqlCountValue[1].push(counter);
        outputSqlCountValue[2].push(maxSalary);
        counter++;
    }
    if(minEquity) {
        minEText = `equity >=`
        outputSqlCountValue[0].push(minEText);
        outputSqlCountValue[1].push(counter);
        outputSqlCountValue[2].push(minEquity);
        counter++;
    }
    if(maxEquity) {
        maxEText = `equity <=`
        outputSqlCountValue[0].push(maxEText);
        outputSqlCountValue[1].push(counter);
        outputSqlCountValue[2].push(maxEquity);
        counter++;
    }

    //return construction
    let returnText = "WHERE";    

    if(outputSqlCountValue[0].length == 0 && !hasEquity) {
        return {
            text:"",
            values:[]
        };
    }

    if(hasEquity && outputSqlCountValue[0].length > 1) {
        hasEquityText = ` AND equity IS NOT NULL`
        returntext = returnText + hasEquityText
    }
    else if(hasEquity) {
        hasEquityText = ` equity IS NOT NULL`
        returnText = returnText + hasEquityText
    }
    else {
        returnText = returnText + ` ${outputSqlCountValue[0][0]} $${outputSqlCountValue[1][0]}`
    }

    for(let i = 1;i<outputSqlCountValue[0].length;i++){
        returnText = returnText + ` AND ${outputSqlCountValue[0][i]} $${outputSqlCountValue[1][i]}`
    }

    return {
        "text":returnText,
        "values":outputSqlCountValue[2]
    }
}




module.exports = { sqlForPartialUpdate,filteringCompanies,filteringJobs };
