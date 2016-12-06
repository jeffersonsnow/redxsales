select * from dailyfocus
where user_id = $1 AND focus_date BETWEEN date_trunc('month', now()) AND now();
