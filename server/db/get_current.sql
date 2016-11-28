select * from dailyfocus
where postid in (select max(postid) from dailyfocus)
;
