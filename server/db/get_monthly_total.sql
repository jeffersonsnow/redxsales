SELECT * FROM sales
WHERE user_id = $1 AND date_sold BETWEEN date_trunc('month', now()) AND now();
