select * from dailyfocus
where user_id = $1
AND focus_date = (select max(focus_date) from dailyfocus);
