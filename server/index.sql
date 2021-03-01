create table restaurants (
  id bigserial not null primary key,
  name varchar(50) not null,
  location varchar(50) not null,
  price_range int not null check(price_range >= 1 and price_range <= 5)
);

insert into restaurants ( name, location, price_range) 
values('Kazi', 'Torki', 3);

create table reviews (
  id bigserial not null primary key,
  restaurant_id  bigint not null references restaurants(id),
  name varchar(50) not null,
  review varchar(50) not null,
  rating int not null check(rating >= 1 and rating <= 5)
);

insert into reviews ( restaurant_id, name, review,rating) 
values(10,'Kazi', 'Not bad take a tour', 3);