SELECT * FROM monthlyquota
Where quota_time = (select max(quota_time) from monthlyquota);
