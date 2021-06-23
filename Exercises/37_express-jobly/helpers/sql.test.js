const { sqlForPartialUpdate, filteringCompanies, filteringJobs } = require("./sql");
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate, Destructures passed in variables", function () {
    test("works: basic", function () {
        const result = sqlForPartialUpdate({ "username": "test", "job": "worker", "age":40 });
        expect(result).toEqual({
            setCols: '"username"=$1, "job"=$2, "age"=$3',
            values: ["test","worker",40]
        });
    });

    test("works: variable name change", function () {
        const result = sqlForPartialUpdate({ "username": "test", "job": "worker", "age":40 },{"username":"user_name"});
        expect(result).toEqual({
            setCols: '"user_name"=$1, "job"=$2, "age"=$3',
            values: ["test","worker",40]
        });
    });

    test("should throw bad request:no keys", function () {
        try {
            sqlForPartialUpdate({ });
            fail();
          } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
          }
    });
});

describe("filteringCompanies, returns correct WHERE statement", function () {
    test("works: name,min,max", function () {
        const result = filteringCompanies({name:"bob",minEmployees:2,maxEmployees:5});
        expect(result).toEqual({
            text : "WHERE LOWER(name) LIKE $1 AND num_employees >= $2 AND num_employees <= $3",
            values : ["%bob%",2,5]
        });
    });

    test("works: name,min", function () {
        const result = filteringCompanies({name:"bob",minEmployees:2});
        expect(result).toEqual({
            text : "WHERE LOWER(name) LIKE $1 AND num_employees >= $2",
            values : ["%bob%",2]
        });
    });

    test("works: max", function () {
        const result = filteringCompanies({maxEmployees:5});
        expect(result).toEqual({
            text : "WHERE num_employees <= $1",
            values : [5]
        });
    });

    test("works: no input", function () {
        const result = filteringCompanies({});
        expect(result).toEqual({
            text : "",
            values : []
        });
    });

    test("throws error: min > max", function () {
        try {
            filteringCompanies({name:"bob",minEmployees:10,maxEmployees:5});
            fail();
          } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
          }
    });
});


describe("filteringJobs, returns correct WHERE statement", function () {
    test("works: title,minSalary,maxSalary,minEquity,maxEquity", function () {
        const result = filteringJobs({title:"bob",minSalary:2,maxSalary:5,minEquity:.6,maxEquity:.9});
        expect(result).toEqual({
            text : "WHERE LOWER(title) LIKE $1 AND salary >= $2 AND salary <= $3 AND equity >= $4 AND equity <= $5",
            values : ["%bob%",2,5,"0.6","0.9"]
        });
    });

    test("works: maxsalary,minequity", function () {
        const result = filteringJobs({maxSalary:2000,minEquity:0.2});
        expect(result).toEqual({
            text : "WHERE salary <= $1 AND equity >= $2",
            values : [2000,"0.2"]
        });
    });

    test("works: maxEquity", function () {
        const result = filteringJobs({maxEquity:58});
        expect(result).toEqual({
            text : "WHERE equity <= $1",
            values : ["58"]
        });
    });

    test("works: no input", function () {
        const result = filteringJobs({});
        expect(result).toEqual({
            text : "",
            values : []
        });
    });

    test("works: equity true", function () {
        const result = filteringJobs({hasEquity:true});
        expect(result).toEqual({
            text : "WHERE equity IS NOT NULL",
            values : []
        });
    });

    test("works: equity false", function () {
        const result = filteringJobs({minSalary:2000,hasEquity:false});
        expect(result).toEqual({
            text : "WHERE salary >= $1",
            values : [2000]
        });
    });

    test("throws error: min > max", function () {
        try {
            filteringCompanies({name:"bob",minEmployees:10,maxEmployees:5});
            fail();
          } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
          }
    });
});