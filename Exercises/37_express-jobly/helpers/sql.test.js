const { sqlForPartialUpdate, filteringCompanies } = require("./sql");
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

    test("throws error: min > max", function () {
        try {
            filteringCompanies({name:"bob",minEmployees:10,maxEmployees:5});
            fail();
          } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
          }
    });
});