# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:yourpassword@localhost/databasename'
# You can run PSQL files through Git Bash WITHOUT opening a PSQL shell by typing:
#       psql -f filename.sql

# Or you can open a PSQL shell and run the following command from within it by entering the
# following commands:
#     psql
#     \c your-db-name
#     \i filename.sql



# I have set up credentials automatically
# start postgres with 
#   psql
# or 
#   psql db_name

# to create db
#   createdb db_name

# you can feed sql scripts into your db
#   psql < my_database.sql

# dropdb database_name

# to make a sql file that will "backup" or recreate your database:
#   pg_dump -C -c -O my_database_name > backup_name.sql

# to restore (same as feeding in script)
#   psql > backup_name.sql

