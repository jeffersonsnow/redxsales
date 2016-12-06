SELECT * from SALES
WHERE date_sold BETWEEN date_trunc('month', now()) AND now();
