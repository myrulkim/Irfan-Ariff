CREATE TABLE education (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    institution text NOT NULL,
    degree text NOT NULL,
    duration text NOT NULL,
    details text[] DEFAULT '{}'::text[],
    is_current boolean DEFAULT false,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE certificates (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    issuer text NOT NULL,
    issue_date text NOT NULL,
    credential_url text,
    icon_tag text DEFAULT 'award',
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to education" ON education FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to education" ON education FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to certificates" ON certificates FOR ALL USING (auth.role() = 'authenticated');
