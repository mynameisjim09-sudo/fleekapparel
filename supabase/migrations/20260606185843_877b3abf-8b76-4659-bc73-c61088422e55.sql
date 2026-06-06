CREATE TABLE public.registry_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX registry_signups_email_lower_idx ON public.registry_signups (lower(email));

GRANT SELECT, INSERT ON public.registry_signups TO anon;
GRANT SELECT, INSERT ON public.registry_signups TO authenticated;
GRANT ALL ON public.registry_signups TO service_role;

ALTER TABLE public.registry_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up to the registry"
  ON public.registry_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);