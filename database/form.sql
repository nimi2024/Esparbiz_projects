   use march_7_job_application;

   create table registration_form(
   id integer auto_increment primary key,
   fname varchar(225),
   lname varchar(225),
   address varchar(225),
   gender varchar(225),
   password varchar(225),
   DOB varchar(225),
   pincode varchar(225),
   course varchar(225),
   email varchar(225),
   token varchar(225)
   );
   
-- user table
   USER TABLE
   create table users(
   id int auto_increment primary key,
   username varchar(225),
	address varchar(225),
	gender varchar(225),
   DOB varchar(225),
   pincode varchar(225),
   course varchar(225),
   email varchar(225),
   salt varchar(225),
   password varchar(225),
   created_at timestamp default current_timestamp,
   updated_at timestamp default current_timestamp on update  current_timestamp
   );
   
   -- password_reset_tokens
   
   create table password_reset_tokens(
   pid int auto_increment primary key,
   id integer,
   email varchar(225) not null,
   token varchar(225) not null,
   created_at timestamp default current_timestamp,
foreign key(pid) references users(id)
   
   );
   