
create table entries (
  id            integer primary key autoincrement,
  name          text not null,  
  company       text not null,
  email         text not null,
  elapsed       integer
);