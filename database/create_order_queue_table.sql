drop table if exists order_queue;
create table order_queue
(
  Id              int         auto_increment
    primary key,
  PairFrom        varchar(10)                          not null,
  PairTo          varchar(10)                          not null,
  Type            varchar(10)                          not null,
  Rate            varchar(30)                          not null,
  Amount          varchar(30)                          not null,
  RateOpen        varchar(30)                          not null,
  AmountOpen      varchar(30)                          not null,
  Status          varchar(15)                          not null,
  Source          varchar(30)                          not null,
  Email           varchar(30)                          not null,
  OrderId         int                                  not null,
  OppositeOrderId int                                  not null,
  OrderType       varchar(10)                          not null,
  AmountChange    varchar(30)                          not null,
  Total           varchar(30)                          not null,
  CreatedAt       timestamp default CURRENT_TIMESTAMP  not null,
  LockId          varchar(13) default null,
  Used            tinyint default 0                    not null,
  constraint orders_OrderId_uindex
  unique (OrderId, OppositeOrderId)
);


