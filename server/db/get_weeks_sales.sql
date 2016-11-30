SELECT * FROM sales
WHERE user_id = $1 AND date_sold BETWEEN date_trunc('week', now()) AND now();
