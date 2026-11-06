ALTER TABLE public.contact_requests ADD COLUMN IF NOT EXISTS ip_hash text;
CREATE INDEX IF NOT EXISTS contact_requests_ip_hash_created_idx ON public.contact_requests (ip_hash, created_at DESC);
CREATE INDEX IF NOT EXISTS contact_requests_created_idx ON public.contact_requests (created_at DESC);

-- Rate-limit check: returns 'ok', 'ip' (per-IP limit hit) or 'global' (circuit breaker). Exposes no row data.
CREATE OR REPLACE FUNCTION public.contact_rate_status(_ip_hash text)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT CASE
    WHEN (SELECT count(*) FROM public.contact_requests WHERE created_at > now() - interval '1 hour') >= 200 THEN 'global'
    WHEN _ip_hash IS NOT NULL AND (SELECT count(*) FROM public.contact_requests WHERE ip_hash = _ip_hash AND created_at > now() - interval '10 minutes') >= 3 THEN 'ip'
    WHEN _ip_hash IS NOT NULL AND (SELECT count(*) FROM public.contact_requests WHERE ip_hash = _ip_hash AND created_at > now() - interval '24 hours') >= 10 THEN 'ip'
    ELSE 'ok'
  END
$$;
REVOKE ALL ON FUNCTION public.contact_rate_status(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.contact_rate_status(text) TO anon, authenticated, service_role;