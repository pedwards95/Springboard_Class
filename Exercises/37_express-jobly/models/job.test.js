"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newJob = {
    title: "New",
    salary: 100,
    equity: "0.1",
    companyHandle: "c1",
  };

  test("works", async function () {
    let job = await Job.create(newJob);
    expect(job).toEqual(newJob);

    const result = await db.query(
          `SELECT title, salary, equity, company_handle
           FROM jobs
           WHERE title = 'New'`);
    expect(result.rows).toEqual([
      {
        title: "New",
        salary: 100,
        equity: "0.1",
        company_handle: "c1",
      },
    ]);
  });

  test("bad request with dupe", async function () {
    try {
      await Job.create(newJob);
      await Job.create(newJob);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let jobs = await Job.findAll();
    expect(jobs).toEqual([
      {
        title: "j1",
        salary: 100,
        equity: "0.1",
        companyHandle: "c1"
      },
      {
        title: "j2",
        salary: 200,
        equity: "0.2",
        companyHandle: "c2"
      },
      {
        title: "j3",
        salary: 300,
        equity: "0.3",
        companyHandle: "c3"
      },
    ]);
  });
});


/************************************** find */

describe("find", function () {
  test("works: no filter", async function () {
    let jobs = await Job.find();
    expect(jobs).toEqual([
      {
        title: "j1",
        salary: 100,
        equity: "0.1",
        companyHandle: "c1"
      },
      {
        title: "j2",
        salary: 200,
        equity: "0.2",
        companyHandle: "c2"
      },
      {
        title: "j3",
        salary: 300,
        equity: "0.3",
        companyHandle: "c3"
      },
    ]);
  });

  test("works: title,minSalary,maxSalary,maxEquity,maxEquity", async function () {
    let jobs = await Job.find({title:"j1",minSalary:100,maxSalary:200,minEquity:"0.1",maxEquity:"0.2"});
    expect(jobs).toEqual([
        {
            title: "j1",
            salary: 100,
            equity: "0.1",
            companyHandle: "c1"
        },
    ]);
  });
  test("works: minSalary,minEquity", async function () {
    let jobs = await Job.find({minSalary:200,minEquity:"0.2"});
    expect(jobs).toEqual([
        {
            title: "j2",
            salary: 200,
            equity: "0.2",
            companyHandle: "c2"
        },
        {
            title: "j3",
            salary: 300,
            equity: "0.3",
            companyHandle: "c3"
        },
    ]);
  });
  test("works: maxEquity", async function () {
    let jobs = await Job.find({maxEquity:"0.1"});
    expect(jobs).toEqual([
        {
            title: "j1",
            salary: 100,
            equity: "0.1",
            companyHandle: "c1"
        },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let job = await Job.get("j1");
    expect(job).toEqual(
        {
            title: "j1",
            salary: 100,
            equity: "0.1",
            companyHandle: "c1"
        });
  });

  test("not found if no such Job", async function () {
    try {
      await Job.get("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  const updateData = {
        title: "New",
        salary: 999,
        equity: "0.9"
  };

  test("works", async function () {
    let job = await Job.update("j1", updateData);
    expect(job).toEqual({
      ...updateData,
      companyHandle: "c1"
    });

    const result = await db.query(
        `SELECT title, salary, equity, company_handle AS "companyHandle"
        FROM jobs
        WHERE title = 'New'`);
    expect(result.rows).toEqual([{
      title: "New",
      salary: 999,
      equity: "0.9",
      companyHandle: "c1"
    }]);
  });


  test("not found if no such Job", async function () {
    try {
      await Job.update("nope", updateData);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Job.update("nope", {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Job.remove("j1");
    const res = await db.query(
        "SELECT title FROM jobs WHERE title='j1'");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such Job", async function () {
    try {
      await Job.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
