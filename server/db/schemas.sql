create table sales (
  sales_id serial primary key not null,
  rep text,
  date_sold timestamp with time zone,
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
  multiline integer,
  user_id integer references users(user_id)
);

create table dailyfocus (
  focus_id serial primary key not null,
  focus text,
  focus_date timestamp with time zone,
  user_id integer references users(user_id)
);
