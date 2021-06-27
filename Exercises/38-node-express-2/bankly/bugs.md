BUG 1:
    Seed command doesnt work. Moved into the data.sql, added 'if exist' check, changed seed command to just run data.sql.

BUG 2:
    Registering with a username that is already taken returns a 400, not a 401

BUG 3:
    Register does not check for missing data.

BUG 4: (kinda.. it will be caught, but much later and in a weird way)
    Login does not check for missing data.

BUG 5:
    No test for user not found when trying to get users/username

BUG 6:
    Patch does not currently allow current user to change their own data

BUG 7:
    User.delete needs to be awaited