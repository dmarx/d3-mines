
create table entries (
  id            integer primary key autoincrement,
  name          text not null,  
  company       text,
  email         text,
  elapsed       integer not null,
  difficulty    text not null, -- this code just be a code. Whatever.
  win           bool not null -- this gets coerced to text. Could also just be a code.
);