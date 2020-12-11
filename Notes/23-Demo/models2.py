from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)


# MODELS

class Department(db.Model):
    "A department representation."

    __tablename__ = 'departments'

    dept_code = db.Column(db.Text, primary_key = True)
    dept_name = db.Column(
        db.Text,
        nullable=False,
        unique=True
        )
    phone = db.Column(db.Text)

    # employees = db.relationship('Employee')

    def __repr__(self):
        return f"<Department {self.dept_code} {self.dept_name} {self.dept_phone} >"

class Employee(db.Model):
    "An employee representation."

    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    name = db.Column(
        db.Text,
        nullable=False,
        unique=True
        )
    state = db.Column(db.Text, nullable=False, default='CA')
    dept_code = db.Column(db.Text, db.ForeignKey('departments.dept_code'))

    # dept = db.relationship('Department')
    dept = db.relationship('Department', backref='employees')
    assignments = db.relationship('EmployeeProject', backref='employee')
    projects = db.relationship('Project',secondary='employees_projects', backref='employees')

    
    def __repr__(self):
        return f"<Employee {self.name} {self.state} {self.dept_code} >"

class Project(db.Model):
    __tablename__ = 'projects'

    proj_code = db.Column(db.Text, primary_key=True)
    proj_name = db.Column(db.Text, nullable=False, unique=True)

    assignments = db.relationship('EmployeeProject', backref='project')

    def __repr__(self):
        return f"<Project {self.proj_code} {self.proj_name} >"

class EmployeeProject(db.Model):
    __tablename__ = "employees_projects"

    emp_id= db.Column(db.Integer, db.ForeignKey("employees.id"), primary_key=True)
    proj_code = db.Column(db.Text, db.ForeignKey("projects.proj_code"), primary_key=True)
    role = db.Column(db.Text)

def get_directory():
    all_emps = Employee.query.all()
    for emp in all_emps:
        if emp.dept is not None:
            print(emp.name, emp.dept.dept_name, emp.dept.phone)
        else:
            print(emp.name)
    
def phone_dir_join():
    emps = (db.session.query(
        Employee.name,
        Department.dept_name,
        Department.phone)
    .join(Department).all())
    for name, dept, phone in emps:
        print(name, dept, phone)
    
def phone_dir_join_better():
    emps = (db.session.query(Employee, Department).join(Department).all())

    for emp, dept in emps:
        print(emp.name, dept.dept_name, dept.phone)

def phone_dir_all_join():
    emps = (db.session.query(Employee, Department).innerjoin(Department).all())

    for emp, dept in emps:
        print(emp.name, dept.dept_name, dept.phone)
