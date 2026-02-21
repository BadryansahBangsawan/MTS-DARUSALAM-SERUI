alter table if exists public.users
  add column if not exists is_active boolean not null default true;

create table if not exists public.audit_logs (
  id integer generated always as identity primary key,
  actor_user_id integer,
  action varchar(120) not null,
  module varchar(120) not null,
  target_type varchar(120),
  target_id varchar(120),
  details jsonb,
  ip_address varchar(100),
  user_agent varchar(500),
  created_at timestamp not null default now()
);

create index if not exists audit_logs_action_idx on public.audit_logs(action);
create index if not exists audit_logs_module_idx on public.audit_logs(module);
create index if not exists audit_logs_actor_user_id_idx on public.audit_logs(actor_user_id);
create index if not exists audit_logs_created_at_idx on public.audit_logs(created_at);
