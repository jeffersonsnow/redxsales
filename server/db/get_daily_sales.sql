SELECT * FROM sales
WHERE date_sold BETWEEN date_trunc('day', now()) AND now();
