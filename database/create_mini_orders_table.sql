drop table if exists mini_orders;
CREATE TABLE mini_orders
(
  Id              int(11) PRIMARY KEY                 NOT NULL AUTO_INCREMENT,
  PairFrom        varchar(10)                         NOT NULL,
  PairTo          varchar(10)                         NOT NULL,
  Type            varchar(10)                         NOT NULL,
  Rate            varchar(30)                         NOT NULL,
  Amount          varchar(30)                         NOT NULL,
  RateOpen        varchar(30)                         NOT NULL,
  AmountOpen      varchar(30)                         NOT NULL,
  Status          varchar(15)                         NOT NULL,
  Source          varchar(30)                         NOT NULL,
  Email           varchar(30)                         NOT NULL,
  OrderId         int(11)                             NOT NULL,
  OppositeOrderId int(11)                             NOT NULL,
  OrderType       varchar(10)                         NOT NULL,
  AmountChange    varchar(30)                         NOT NULL,
  Total           varchar(30)                         NOT NULL,
  Progress        varchar(10)                         NOT NULL,
  CreatedAt       timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
  BigOrderId      int(11)                                      DEFAULT NULL,
  CONSTRAINT mini_orders_orders_Id_fk FOREIGN KEY (BigOrderId) REFERENCES orders (Id)
);