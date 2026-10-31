-- The daily job records the day it is reading so a second run can see it
-- and leave that day alone. NULL means no day is being read.
ALTER TABLE rollup_state ADD COLUMN reading_date TEXT;
