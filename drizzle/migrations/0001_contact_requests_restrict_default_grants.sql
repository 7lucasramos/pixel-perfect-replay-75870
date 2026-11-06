REVOKE ALL ON public.contact_requests FROM anon, authenticated;
GRANT INSERT ON public.contact_requests TO anon;
GRANT ALL ON public.contact_requests TO service_role;