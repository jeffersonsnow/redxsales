create table sales (
  sales_id serial primary key not null,
  rep text,
  date_sold timestamp with time zone,
  customer_name text,
  amount numeric,
  setup_fee numeric,
  plan text,
  expireds integer,
  fsbos integer,
  frbos integer,
  preforeclosures integer,
  onyx integer,
  storm integer,
  geoleads integer,
  multiline integer,
  user_id integer references users(user_id)
);

create table dailyfocus (
  focus_id serial primary key not null,
  focus text,
  focus_date timestamp with time zone,
  user_id integer references users(user_id)
);

create table monthlyquota (
  quota_id serial primary key not null,
  quota_amount numeric,
  quota_time timestamp with time zone
);



  insert into monthlyquota (quota_amount, quota_time)
  values (27352, current_timestamp)

  ;



SELECT * FROM sales
WHERE date_sold BETWEEN date_trunc('week', now()) AND now();


SELECT * FROM sales
WHERE user_id = 1 AND date_sold BETWEEN date_trunc('week', now()) AND now();

SELECT sum(amount) - sum(setup_fee) FROM sales
WHERE user_id = 1 AND date_sold BETWEEN date_trunc('week', now()) AND now();

SELECT sum(setup_fee) * .25 FROM sales
WHERE user_id = 1 AND date_sold BETWEEN date_trunc('week', now()) AND now();

SELECT sum(setup_fee) FROM sales
WHERE user_id = 1 AND date_sold BETWEEN date_trunc('week', now()) AND now();

SELECT setup_fee sum(setup_fee) FROM sales
WHERE user_id = 1 AND date_sold BETWEEN date_trunc('week', now()) AND now();

/*WITH sales AS (
    SELECT ( NOW() + (s::TEXT || ' day')::INTERVAL )::TIMESTAMP(0) AS created
    FROM generate_series(-20, 20, 1) AS s
)*/
/*SELECT *
FROM sales
WHERE DATE_sold BETWEEN
    NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7
    AND NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER
*/
-- helpful site:
-- https://blog.modeanalytics.com/date-trunc-sql-timestamp-function-count-on/
