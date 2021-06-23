"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate,filteringJobs } = require("../helpers/sql");

/** Related functions for jobs. */

class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { id, title, salary, equity, company_handle }
   *
   * Returns { id, title, salary, equity, companyHandle }
   *
   * Throws BadRequestError if job already in database.
   * */

  static async create({ title, salary, equity, companyHandle }) {
    const duplicateCheck = await db.query(
          `SELECT title
           FROM jobs
           WHERE title = $1 AND salary = $2 AND equity = $3 AND company_handle = $4`,
        [title,salary,equity,companyHandle]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate job: ${title}`);

    const result = await db.query(
          `INSERT INTO jobs
           (title, salary, equity, company_handle)
           VALUES ($1, $2, $3, $4)
           RETURNING title, salary, equity, company_handle AS "companyHandle"`,
        [title, salary, equity, companyHandle]);
    const job = result.rows[0];

    return job;
  }

  /** Find all jobs.
   *
   * Returns [{ title, salary, equity, companyHandle }, ...]
   * */

  static async findAll() {
    const jobsRes = await db.query(
          `SELECT title, 
                salary, 
                equity, 
                company_handle AS "companyHandle"
           FROM jobs
           ORDER BY title`);
    return jobsRes.rows;
  }

  /** Find jobs based on an input filter.
   * Can filter by title, minSalary, or maxSalary, minEquity, maxEquity
   *
   * Returns [{ title, salary, equity, companyHandle }, ...]
   * */

  static async find({title,minSalary,maxSalary,minEquity,maxEquity,hasEquity}={}) {
    title = title || "";
    minSalary = minSalary || 0;
    maxSalary = maxSalary || 0;
    minEquity = minEquity || 0;
    maxEquity = maxEquity || 0;
    hasEquity = hasEquity || false;
    const {text,values} = filteringJobs({title,minSalary,maxSalary,minEquity,maxEquity,hasEquity});
    const jobsRes = await db.query(
          `SELECT title, 
                salary, 
                equity, 
                company_handle AS "companyHandle"
           FROM jobs
           ${text}
           ORDER BY title`,values);
    return jobsRes.rows;
  }

  /** Given a job handle, return data about job.
   *
   * Returns { title, salary, equity, company }
   *   where company is [{ name, description, numEmployees, logoUrl }]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(title) {
    const jobRes = await db.query(
          `SELECT title, 
                salary, 
                equity, 
                company_handle AS "companyHandle"
           FROM jobs
           WHERE title = $1`,
        [title]);

    const job = jobRes.rows[0];

    if (!job) throw new NotFoundError(`No job: ${title}`);

    return job;
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {title, salary, equity}
   *
   * Returns {title, salary, equity, companyHandle}
   *
   * Throws NotFoundError if not found.
   */

  static async update(title, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data, {});
    const titleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE title = ${titleVarIdx} 
                      RETURNING title, 
                            salary, 
                            equity, 
                            company_handle AS "companyHandle"`;
    const result = await db.query(querySql, [...values, title]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${title}`);

    return job;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if job not found.
   **/

  static async remove(title) {
    const result = await db.query(
          `DELETE
           FROM jobs
           WHERE title = $1
           RETURNING id, title, salary`,
        [title]);
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${title}`);
  }
}


module.exports = Job;
