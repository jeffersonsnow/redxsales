insert into sales (
  rep,
  date_sold,
  customer_name,
  amount,
  setup_fee,
  plan,
  expireds,
  fsbos,
  frbos,
  preforeclosures,
  onyx,
  storm,
  geoleads,
  multiline,
  user_id
)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);
-- changing time zone
-- insert into sales (
--   rep,
--   customer_name,
--   amount,
--   setup_fee,
--   plan,
--   expireds,
--   fsbos,
--   frbos,
--   preforeclosures,
--   onyx,
--   storm,
--   geoleads,
--   multiline,
--   user_id
-- )
-- values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
