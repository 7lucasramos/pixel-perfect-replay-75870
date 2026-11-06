CREATE TABLE public.contact_requests (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz NOT NULL DEFAULT now(),
 nome text NOT NULL CHECK (char_length(trim(nome)) BETWEEN 2 AND 120), empresa text NOT NULL DEFAULT '' CHECK (char_length(empresa) <= 160),
 email text NOT NULL CHECK (char_length(email) <= 254 AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'), telefone text NOT NULL DEFAULT '' CHECK (char_length(telefone) <= 40),
 perfil text NOT NULL DEFAULT '' CHECK (perfil IN ('','Empresa de locação de áudio','Integrador','Produtor de eventos','Responsável por projeto de sonorização','Profissional de áudio','Outro')),
 tipo_projeto text NOT NULL DEFAULT '' CHECK (tipo_projeto IN ('','Evento ou produção','Instalação permanente','Sistema de sonorização','Projeto personalizado','Outro')),
 mensagem text NOT NULL CHECK (char_length(trim(mensagem)) BETWEEN 1 AND 5000), consentimento boolean NOT NULL CHECK (consentimento = true)
);
GRANT INSERT ON public.contact_requests TO anon;
GRANT ALL ON public.contact_requests TO service_role;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anonymous contact submission only" ON public.contact_requests FOR INSERT TO anon WITH CHECK (consentimento = true);
COMMENT ON TABLE public.contact_requests IS 'Private contact requests; no public read, update or delete grants or policies.';