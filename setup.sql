create table public.responses (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text,
  email text,
  score int,
  total int,
  answers jsonb
);
alter table public.responses enable row level security;
create policy "anyone can submit" on public.responses for insert to anon with check (true);
create policy "signed-in owner can read" on public.responses for select to authenticated using (true);
