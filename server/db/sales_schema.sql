create table sales (
  sales_id serial primary key not null,
  rep text,
  date_sold date,
  customer_name text,
  amount numeric,
  setup_fee numeric,
  expireds integer,
  fsbos integer,
  frbos integer,
  preforeclosures integer,
  onyx integer,
  storm integer,
  geoleads integer,
  multiline integer
);
