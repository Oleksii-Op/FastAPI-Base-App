--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: main
--

CREATE TABLE public.users (
    username character varying NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    phone_number character varying NOT NULL,
    id integer NOT NULL,
    email character varying(320) NOT NULL,
    hashed_password character varying(1024) NOT NULL,
    is_active boolean NOT NULL,
    is_superuser boolean NOT NULL,
    is_verified boolean NOT NULL
);


ALTER TABLE public.users OWNER TO main;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: main
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO main;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: main
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: main
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: main
--

COPY public.users (username, first_name, last_name, created_at, updated_at, phone_number, id, email, hashed_password, is_active, is_superuser, is_verified) FROM stdin;
FastAPISuperuser	Fakename	Fakesurname	2025-01-03 15:21:26.948023	2025-01-05 17:40:58.573458	+380992921960	14	admin@admin.com	$argon2id$v=19$m=65536,t=3,p=4$7e6vzGw0B6PVCXtY0ZxAlA$wK6L/srxxhoman0YucxhZ7THqy7XYN8Ul3U87G+na6g	t	t	t
Alex1488	Alex1488	Alex1488	2025-01-03 17:21:51.296447	2025-01-03 17:22:50.737017	+3725467453	16	Alex1488@example.com	$argon2id$v=19$m=65536,t=3,p=4$+JtU+HhhimOTVh/Kt1Lz5w$NiaMCdmc5jqjG1OsGlAdlGdOvYWEOkeZdpbqcAlRI38	t	f	t
FastAdmin1	FastAdmin1	FastAdmin1	2025-01-02 06:02:24.520986	2025-01-05 02:23:33.553426	string	12	AlexAlex@example.com	$argon2id$v=19$m=65536,t=3,p=4$J9laymon0YP/fikL65QNLQ$oNLEBr9AMKU5RQrE9Zks1EQOA05SSW//BWSaZfpRXlA	t	f	t
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: main
--

SELECT pg_catalog.setval('public.users_id_seq', 22, true);


--
-- Name: users pk_users; Type: CONSTRAINT; Schema: public; Owner: main
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (id);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: main
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: ix_users_username; Type: INDEX; Schema: public; Owner: main
--

CREATE UNIQUE INDEX ix_users_username ON public.users USING btree (username);


--
-- PostgreSQL database dump complete
--

