set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.enable_rls_alembic_version()
 RETURNS void
 LANGUAGE plpgsql
AS $function$BEGIN


    -- Check if the table exists in the public schema
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'alembic_version' AND table_schema = 'public') THEN
        -- If the table exists, run the ALTER command
        ALTER TABLE public.alembic_version ENABLE ROW LEVEL SECURITY;
    END IF;

END;$function$
;

-- inserts a row into public.profiles
CREATE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY definer SET search_path = ''
AS $$
BEGIN
  insert into public.profiles (user_id, discord_handle, avatar_url)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'avatar_url');
  return new;
END;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- disable openapi-mode
grant ALL ON SCHEMA public TO "service_role";
grant ALL ON ALL ROUTINES IN SCHEMA storage TO "service_role";

ALTER ROLE anon SET pgrst.openapi_mode TO 'disabled';
ALTER ROLE authenticated SET pgrst.openapi_mode TO 'disabled';
NOTIFY pgrst, 'reload config'


