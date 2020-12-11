from flask import Flask, request, render_template, redirect, flash, session
from flask_sqlalchemy import SQLAlchemy
from models2 import db, connect_db, Department, Employee, Project, EmployeeProject

# simple version:
all_emps_1 = Employee.query.filter_by(name = 'River Bottom')
all_emps_2 = Employee.query.filter(Employee.name == 'River Bottom')
# another way to query:
all_emps = db.session.query(Employee.id, Employee.name).all()

# other operators
river = Employee.query.filter(Employee.name.like('%River%'))
last_phoenix = Employee.query.filter(Employee.name.like('% Phoenix')).all()
last_phoenix_2 = Employee.query.filter(Employee.name.ilike('% phoenix')).all() # ILIKE IS NOT CASE SENSITIVE
state_ins = Employee.query.filter(Employee.state.in_(['CA', 'WA', 'OR'])).all()
and_emp = Employee.query.filter(Employee.state == 'CA', Employee.dept_code == 'it').all()
and_emp2 = Employee.query.filter((Employee.state == 'CA') & (Employee.dept_code == 'it')).all()
or_emp = Employee.query.filter( db.or_(Employee.state == 'CA', Employee.dept_code == 'it')).all()
or_emp2 = Employee.query.filter((Employee.state == 'CA') | (Employee.dept_code == 'it')).all()

# further study
q = Employee.query
q.group_by('state')
q.group_by('state').having(db.func.count(Employee.id) > 2)
q.order_by('state')
q.offset(10)
q.limit(10)

# other
nadine = Employee.query.get(4)
proj = Project(proj_code="mktg_site", proj_name="Redo Marketing Site")
nadine.projects.append(proj)
db.session.add(nadine)