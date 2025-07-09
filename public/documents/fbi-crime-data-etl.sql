-- Excel File Modifications
-- Deleted some empty space from the top, bottom, and sides to get rid of hidden values
-- Added an index
-- Deleted commas
-- Cleaned up the column headers
-- Saved as .csv for sql bulk insert 

--- RAW TABLE CREATES AND BULK INSERTS ---

-- Create table for insert

CREATE TABLE [2017raw] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    State VARCHAR(50),
    UniversityName VARCHAR(150),
    CampusName VARCHAR(150),
    Population VARCHAR(100),
    Violent VARCHAR(100),
    Murder VARCHAR(100),
    Rape VARCHAR(100),
    Robbery VARCHAR(100),
    Assault VARCHAR(100),
    Property VARCHAR(100),
    Burglary VARCHAR(100),
    Larceny VARCHAR(100),
    Motor VARCHAR(100),
    Arson VARCHAR(100)
);

-- Insert into raw table
BULK INSERT [2017raw]
FROM 'C:\Users\josia\OneDrive\Documents\School\CIS463\Projects\FBIDB\FBI2017.csv'
WITH (
    FIRSTROW = 2,
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    KEEPNULLS,
    TABLOCK
);

-- repeat process for 2018 and 2019
CREATE TABLE [2018raw] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    State VARCHAR(50),
    UniversityName VARCHAR(150),
    CampusName VARCHAR(150),
    Population VARCHAR(100),
    Violent VARCHAR(100),
    Murder VARCHAR(100),
    Rape VARCHAR(100),
    Robbery VARCHAR(100),
    Assault VARCHAR(100),
    Property VARCHAR(100),
    Burglary VARCHAR(100),
    Larceny VARCHAR(100),
    Motor VARCHAR(100),
    Arson VARCHAR(100)
);

BULK INSERT [2018raw]
FROM 'C:\Users\josia\OneDrive\Documents\School\CIS463\Projects\FBIDB\FBI2018.csv'
WITH (
    FIRSTROW = 2,
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    KEEPNULLS,
    TABLOCK
);

CREATE TABLE [2019raw] (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    State VARCHAR(50),
    UniversityName VARCHAR(150),
    CampusName VARCHAR(150),
    Population VARCHAR(100),
    Violent VARCHAR(100),
    Murder VARCHAR(100),
    Rape VARCHAR(100),
    Robbery VARCHAR(100),
    Assault VARCHAR(100),
    Property VARCHAR(100),
    Burglary VARCHAR(100),
    Larceny VARCHAR(100),
    Motor VARCHAR(100),
    Arson VARCHAR(100)
);

BULK INSERT [2019raw]
FROM 'C:\Users\josia\OneDrive\Documents\School\CIS463\Projects\FBIDB\FBI2019.csv'
WITH (
    FIRSTROW = 2,
    FIELDTERMINATOR = ',',
    ROWTERMINATOR = '\n',
    KEEPNULLS,
    TABLOCK
);

--- FINAL DB TABLES CREATES ---

-- Create Tables for final database
CREATE TABLE State (
    StateID INT IDENTITY(1,1) PRIMARY KEY,
    StateName VARCHAR(100)
);

CREATE TABLE University (
    UniversityID INT IDENTITY(1,1) PRIMARY KEY,
    UniversityName VARCHAR(100),
    CampusName VARCHAR(100),
    StateID INT,
    FOREIGN KEY (StateID) REFERENCES State(StateID)
);

CREATE TABLE CrimeStatistic (
    CrimeStatID INT IDENTITY(1,1) PRIMARY KEY,
    Year INT,
    Population INT,
    Violent INT,
    Murder INT,
    Rape INT,
    Robbery INT,
    Aggravate INT,
    Property INT,
    Burglary INT,
    Larceny INT,
    Motor INT,
    Arson INT,
    UniversityID INT,
    FOREIGN KEY (UniversityID) REFERENCES University(UniversityID)
);

--- CURSORED TABLE CREATES ---

-- Create tables to try cast the raw table variables as ints into, and run the cursor on

CREATE TABLE [2017](
    ID INT IDENTITY(1,1) PRIMARY KEY,
    State VARCHAR(50),
    UniversityName VARCHAR(150),
    CampusName VARCHAR(150),
    Population VARCHAR(150),
    Violent INT,
    Murder INT,
    Rape INT,
    Robbery INT,
    Assault INT,
    Property INT,
    Burglary INT,
    Larceny INT,
    Motor INT,
    Arson INT
);

CREATE TABLE [2018](
    ID INT IDENTITY(1,1) PRIMARY KEY,
    State VARCHAR(50),
    UniversityName VARCHAR(150),
    CampusName VARCHAR(150),
    Population VARCHAR(150),
    Violent INT,
    Murder INT,
    Rape INT,
    Robbery INT,
    Assault INT,
    Property INT,
    Burglary INT,
    Larceny INT,
    Motor INT,
    Arson INT
);

CREATE TABLE [2019](
    ID INT IDENTITY(1,1) PRIMARY KEY,
    State VARCHAR(50),
    UniversityName VARCHAR(150),
    CampusName VARCHAR(150),
    Population VARCHAR(150),
    Violent INT,
    Murder INT,
    Rape INT,
    Robbery INT,
    Assault INT,
    Property INT,
    Burglary INT,
    Larceny INT,
    Motor INT,
    Arson INT
);

--- 2017 CURSORED TABLE INSERT ---

-- insert the raw values into the cursor tables, try_cast numeric values as int

INSERT INTO [2017] (
    State, UniversityName, CampusName, Population, Violent, Murder,
    Rape, Robbery, Assault, Property, Burglary, Larceny, Motor, Arson
)
SELECT 
    State,
    UniversityName,
    CampusName,
    Population,  -- convert if needed
    TRY_CAST(Violent AS INT),
    TRY_CAST(Murder AS INT),
    TRY_CAST(Rape AS INT),
    TRY_CAST(Robbery AS INT),
    TRY_CAST(Assault AS INT),
    TRY_CAST(Property AS INT),
    TRY_CAST(Burglary AS INT),
    TRY_CAST(Larceny AS INT),
    TRY_CAST(Motor AS INT),
    TRY_CAST(Arson AS INT)
FROM [2017raw];

-- select * from [2017];

-- check data types of 2017
--SELECT 
--    COLUMN_NAME, 
--    DATA_TYPE, 
--    IS_NULLABLE
--FROM INFORMATION_SCHEMA.COLUMNS
--WHERE TABLE_NAME = '2017';

-- Cursor that populates UniversityName and State with the previous known value in order to fix null values caused by the excel formatting

DECLARE @UniversityCollegeState as NVARCHAR(256)
DECLARE @HoldUniversityCollegeState as NVARCHAR(256)
DECLARE @UniversityCollegeName as NVARCHAR(256)
DECLARE @HoldUniversityCollegeName as NVARCHAR(256)
DECLARE @Campus as NVARCHAR(256)
DECLARE @CrimeID as NVARCHAR(256)
DECLARE School_Cursor CURSOR FOR  
SELECT ID, State, UniversityName, CampusName
FROM [2017]
OPEN School_Cursor;  
FETCH NEXT FROM School_Cursor INTO @CrimeID, @UniversityCollegeState, @UniversityCollegeName, @Campus
WHILE @@FETCH_STATUS = 0  
  BEGIN  
      --
  IF @UniversityCollegeState is not null
  begin
Set @HoldUniversityCollegeState = @UniversityCollegeState 
  end
  ELSE
  begin
Set @UniversityCollegeState = @HoldUniversityCollegeState 
  end
  IF @UniversityCollegeName is not null
  begin
Set @HoldUniversityCollegeName = @UniversityCollegeName
  end
  ELSE
  begin
Set @UniversityCollegeName = @HoldUniversityCollegeName
  end
  --
  --Print '   ' + @UniversityCollegeState + ' ' + @HoldUniversityCollegeState + ' ' + @UniversityCollegeName + ' ' + @Campus + ' ' 
  Print '   ' + @UniversityCollegeState + ' ' + @UniversityCollegeName + ' ' + @Campus + ' ' + @CrimeID
UPDATE [dbo].[2017]
SET [State] = @UniversityCollegeState,
    [UniversityName] = @UniversityCollegeName,
    [CampusName] = @Campus
WHERE [ID] = @CrimeID;
      FETCH NEXT FROM School_Cursor INTO @CrimeID, @UniversityCollegeState, @UniversityCollegeName, @Campus
  END;  
CLOSE School_Cursor;  
DEALLOCATE School_Cursor

-- select * from [2017];

--- 2018 CURSORED TABLE INSERT ---


-- now we repeat the process we just did for the 2018 and 2019 tables

INSERT INTO [2018] (
    State, UniversityName, CampusName, Population, Violent, Murder,
    Rape, Robbery, Assault, Property, Burglary, Larceny, Motor, Arson
)
SELECT 
    State,
    UniversityName,
    CampusName,
    Population,  -- convert if needed
    TRY_CAST(Violent AS INT),
    TRY_CAST(Murder AS INT),
    TRY_CAST(Rape AS INT),
    TRY_CAST(Robbery AS INT),
    TRY_CAST(Assault AS INT),
    TRY_CAST(Property AS INT),
    TRY_CAST(Burglary AS INT),
    TRY_CAST(Larceny AS INT),
    TRY_CAST(Motor AS INT),
    TRY_CAST(Arson AS INT)
FROM [2018raw];

-- select * from [2018];

-- check data types of 2018
--SELECT 
--    COLUMN_NAME, 
--    DATA_TYPE, 
--    IS_NULLABLE
--FROM INFORMATION_SCHEMA.COLUMNS
--WHERE TABLE_NAME = '2018';

DECLARE @UniversityCollegeState as NVARCHAR(256)
DECLARE @HoldUniversityCollegeState as NVARCHAR(256)
DECLARE @UniversityCollegeName as NVARCHAR(256)
DECLARE @HoldUniversityCollegeName as NVARCHAR(256)
DECLARE @Campus as NVARCHAR(256)
DECLARE @CrimeID as NVARCHAR(256)
DECLARE School_Cursor CURSOR FOR  
SELECT ID, State, UniversityName, CampusName
FROM [2018]
OPEN School_Cursor;  
FETCH NEXT FROM School_Cursor INTO @CrimeID, @UniversityCollegeState, @UniversityCollegeName, @Campus
WHILE @@FETCH_STATUS = 0  
  BEGIN  
      --
  IF @UniversityCollegeState is not null
  begin
Set @HoldUniversityCollegeState = @UniversityCollegeState 
  end
  ELSE
  begin
Set @UniversityCollegeState = @HoldUniversityCollegeState 
  end
  IF @UniversityCollegeName is not null
  begin
Set @HoldUniversityCollegeName = @UniversityCollegeName
  end
  ELSE
  begin
Set @UniversityCollegeName = @HoldUniversityCollegeName
  end
  --
  --Print '   ' + @UniversityCollegeState + ' ' + @HoldUniversityCollegeState + ' ' + @UniversityCollegeName + ' ' + @Campus + ' ' 
  Print '   ' + @UniversityCollegeState + ' ' + @UniversityCollegeName + ' ' + @Campus + ' ' + @CrimeID
UPDATE [dbo].[2018]
SET [State] = @UniversityCollegeState,
    [UniversityName] = @UniversityCollegeName,
    [CampusName] = @Campus
WHERE [ID] = @CrimeID;
      FETCH NEXT FROM School_Cursor INTO @CrimeID, @UniversityCollegeState, @UniversityCollegeName, @Campus
  END;  
CLOSE School_Cursor;  
DEALLOCATE School_Cursor

-- select * from [2018];

--- 2019 CURSORED TABLE INSERT ---

INSERT INTO [2019] (
    State, UniversityName, CampusName, Population, Violent, Murder,
    Rape, Robbery, Assault, Property, Burglary, Larceny, Motor, Arson
)
SELECT 
    State,
    UniversityName,
    CampusName,
    Population,  -- convert if needed
    TRY_CAST(Violent AS INT),
    TRY_CAST(Murder AS INT),
    TRY_CAST(Rape AS INT),
    TRY_CAST(Robbery AS INT),
    TRY_CAST(Assault AS INT),
    TRY_CAST(Property AS INT),
    TRY_CAST(Burglary AS INT),
    TRY_CAST(Larceny AS INT),
    TRY_CAST(Motor AS INT),
    TRY_CAST(Arson AS INT)
FROM [2019raw];

-- select * from [2019];

-- check data types of 2019
--SELECT 
--    COLUMN_NAME, 
--    DATA_TYPE, 
--    IS_NULLABLE
--FROM INFORMATION_SCHEMA.COLUMNS
--WHERE TABLE_NAME = '2019';

DECLARE @UniversityCollegeState as NVARCHAR(256)
DECLARE @HoldUniversityCollegeState as NVARCHAR(256)
DECLARE @UniversityCollegeName as NVARCHAR(256)
DECLARE @HoldUniversityCollegeName as NVARCHAR(256)
DECLARE @Campus as NVARCHAR(256)
DECLARE @CrimeID as NVARCHAR(256)
DECLARE School_Cursor CURSOR FOR  
SELECT ID, State, UniversityName, CampusName
FROM [2019]
OPEN School_Cursor;  
FETCH NEXT FROM School_Cursor INTO @CrimeID, @UniversityCollegeState, @UniversityCollegeName, @Campus
WHILE @@FETCH_STATUS = 0  
  BEGIN  
      --
  IF @UniversityCollegeState is not null
  begin
Set @HoldUniversityCollegeState = @UniversityCollegeState 
  end
  ELSE
  begin
Set @UniversityCollegeState = @HoldUniversityCollegeState 
  end
  IF @UniversityCollegeName is not null
  begin
Set @HoldUniversityCollegeName = @UniversityCollegeName
  end
  ELSE
  begin
Set @UniversityCollegeName = @HoldUniversityCollegeName
  end
  --
  --Print '   ' + @UniversityCollegeState + ' ' + @HoldUniversityCollegeState + ' ' + @UniversityCollegeName + ' ' + @Campus + ' ' 
  Print '   ' + @UniversityCollegeState + ' ' + @UniversityCollegeName + ' ' + @Campus + ' ' + @CrimeID
UPDATE [dbo].[2019]
SET [State] = @UniversityCollegeState,
    [UniversityName] = @UniversityCollegeName,
    [CampusName] = @Campus
WHERE [ID] = @CrimeID;
      FETCH NEXT FROM School_Cursor INTO @CrimeID, @UniversityCollegeState, @UniversityCollegeName, @Campus
  END;  
CLOSE School_Cursor;  
DEALLOCATE School_Cursor

-- select * from [2019];

--- POPULATING MAIN DATABASE ---

--- POPULATING STATE TABLE ---

-- 2017
INSERT INTO State (StateName)
SELECT DISTINCT State
FROM [2017]
WHERE NOT EXISTS (
    SELECT 1
    FROM State
    WHERE StateName = [2017].State
);

-- 2018
INSERT INTO State (StateName)
SELECT DISTINCT State
FROM [2018]
WHERE NOT EXISTS (
    SELECT 1
    FROM State
    WHERE StateName = [2018].State
);

-- 2019
INSERT INTO State (StateName)
SELECT DISTINCT State
FROM [2019]
WHERE NOT EXISTS (
    SELECT 1
    FROM State
    WHERE StateName = [2019].State
);

-- SELECT * FROM State;

--- POPULATE UNIVERSITY TABLE ---

-- Insert universities from all years if they exist

INSERT INTO University (UniversityName, CampusName, StateID)
SELECT DISTINCT t.UniversityName, t.CampusName, s.StateID
FROM (
    SELECT UniversityName, CampusName, State FROM [2017]
    UNION
    SELECT UniversityName, CampusName, State FROM [2018]
    UNION
    SELECT UniversityName, CampusName, State FROM [2019]
) AS t
JOIN State s ON s.StateName = t.State
WHERE NOT EXISTS (
    SELECT 1
    FROM University u
    WHERE u.UniversityName = t.UniversityName
    AND (
        u.CampusName = t.CampusName
        OR (u.CampusName IS NULL AND t.CampusName IS NULL)
    )
);

--- POPULATE CRIMESTATISTIC TABLE ---

-- check for null values in campusname within the join logic

--- 2017
INSERT INTO CrimeStatistic (
    Year, Population, Violent, Murder, Rape, Robbery, Aggravate,
    Property, Burglary, Larceny, Motor, Arson, UniversityID
)
SELECT 
    2017,
    TRY_CAST(Population AS INT), Violent, Murder, Rape, Robbery, Assault,
    Property, Burglary, Larceny, Motor, Arson,
    u.UniversityID
FROM [2017] t
JOIN University u 
    ON t.UniversityName = u.UniversityName
    AND (
        (t.CampusName IS NULL AND u.CampusName IS NULL)
        OR LTRIM(RTRIM(ISNULL(t.CampusName, ''))) = LTRIM(RTRIM(ISNULL(u.CampusName, '')))
    );

--- 2018
INSERT INTO CrimeStatistic (
    Year, Population, Violent, Murder, Rape, Robbery, Aggravate,
    Property, Burglary, Larceny, Motor, Arson, UniversityID
)
SELECT 
    2018,
    TRY_CAST(Population AS INT), Violent, Murder, Rape, Robbery, Assault,
    Property, Burglary, Larceny, Motor, Arson,
    u.UniversityID
FROM [2018] t
JOIN University u 
    ON t.UniversityName = u.UniversityName
    AND (
        (t.CampusName IS NULL AND u.CampusName IS NULL)
        OR LTRIM(RTRIM(ISNULL(t.CampusName, ''))) = LTRIM(RTRIM(ISNULL(u.CampusName, '')))
    );

--- 2019
INSERT INTO CrimeStatistic (
    Year, Population, Violent, Murder, Rape, Robbery, Aggravate,
    Property, Burglary, Larceny, Motor, Arson, UniversityID
)
SELECT 
    2019,
    TRY_CAST(Population AS INT), Violent, Murder, Rape, Robbery, Assault,
    Property, Burglary, Larceny, Motor, Arson,
    u.UniversityID
FROM [2019] t
JOIN University u 
    ON t.UniversityName = u.UniversityName
    AND (
        (t.CampusName IS NULL AND u.CampusName IS NULL)
        OR LTRIM(RTRIM(ISNULL(t.CampusName, ''))) = LTRIM(RTRIM(ISNULL(u.CampusName, '')))
    );
