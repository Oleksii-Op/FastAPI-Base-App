--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

-- Started on 2025-01-24 12:00:22 UTC

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

--
-- TOC entry 857 (class 1247 OID 16763)
-- Name: energy_class_enum; Type: TYPE; Schema: public; Owner: main
--

CREATE TYPE public.energy_class_enum AS ENUM (
    'Triple_A',
    'Double_A',
    'Single_A',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G'
);


ALTER TYPE public.energy_class_enum OWNER TO main;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16716)
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: main
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO main;

--
-- TOC entry 221 (class 1259 OID 16796)
-- Name: desktop_pcs; Type: TABLE; Schema: public; Owner: main
--

CREATE TABLE public.desktop_pcs (
    id uuid NOT NULL,
    name character varying NOT NULL,
    price double precision NOT NULL,
    diagonal double precision,
    cpu_model character varying,
    ram_size integer,
    storage_size integer,
    gpu_maker character varying,
    gpu_model character varying,
    image character varying NOT NULL,
    is_available boolean NOT NULL,
    description text NOT NULL,
    maker character varying NOT NULL,
    is_for_gaming boolean NOT NULL,
    is_for_home_studying boolean NOT NULL,
    is_for_office boolean NOT NULL,
    has_screen boolean NOT NULL,
    is_mini boolean NOT NULL,
    ram_type character varying,
    ram_frequency integer,
    cpu_maker character varying NOT NULL,
    cpu_class character varying,
    cpu_frequency double precision,
    cpu_max_frequency double precision,
    cpu_cores integer,
    cpu_threads integer,
    resolution character varying,
    gpu_memory integer,
    gpu_memory_type character varying,
    power_supply_name character varying,
    power_supply integer,
    storage_type character varying,
    storage_connection character varying,
    extra_hardware character varying,
    usb_a_2_0 integer,
    usb_a_3_1 integer,
    usb_type_c integer,
    vga_connection integer,
    hdmi_connection integer,
    dp_connection integer,
    case_name character varying,
    case_type character varying,
    motherboard character varying,
    ethernet integer,
    bluetooth character varying,
    wireless character varying,
    warranty integer,
    installed_os character varying,
    weight double precision,
    width double precision,
    height double precision,
    depth double precision,
    color character varying,
    images_url json,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.desktop_pcs OWNER TO main;

--
-- TOC entry 222 (class 1259 OID 16810)
-- Name: laptops; Type: TABLE; Schema: public; Owner: main
--

CREATE TABLE public.laptops (
    id uuid NOT NULL,
    name character varying NOT NULL,
    price double precision NOT NULL,
    maker character varying NOT NULL,
    screen_frequency integer,
    diagonal double precision,
    resolution character varying,
    screen_type character varying,
    cpu_maker character varying NOT NULL,
    cpu_model character varying,
    cpu_class character varying,
    cpu_frequency double precision,
    cpu_max_frequency double precision,
    cpu_cores integer,
    cpu_threads integer,
    gpu_maker character varying,
    gpu_model character varying,
    gpu_memory integer,
    gpu_memory_type character varying,
    ram_size integer,
    ram_type character varying,
    ram_frequency integer,
    storage_size integer,
    storage_type character varying,
    extra_hardware character varying,
    usb_a_2_0 integer,
    usb_a_3_1 integer,
    usb_type_c integer,
    vga_connection integer,
    hdmi_connection integer,
    dp_connection integer,
    ethernet integer,
    bluetooth character varying,
    wireless character varying,
    is_available boolean NOT NULL,
    is_for_gaming boolean NOT NULL,
    is_for_home_studying boolean NOT NULL,
    is_for_office boolean NOT NULL,
    warranty integer,
    installed_os character varying,
    weight double precision,
    width double precision,
    height double precision,
    depth double precision,
    color character varying,
    description character varying,
    image character varying NOT NULL,
    images_url json,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.laptops OWNER TO main;

--
-- TOC entry 220 (class 1259 OID 16783)
-- Name: monitors; Type: TABLE; Schema: public; Owner: main
--

CREATE TABLE public.monitors (
    id uuid NOT NULL,
    name character varying NOT NULL,
    maker character varying NOT NULL,
    price double precision NOT NULL,
    diagonal double precision NOT NULL,
    resolution character varying NOT NULL,
    panel_type character varying NOT NULL,
    refresh_rate integer NOT NULL,
    image character varying NOT NULL,
    is_available boolean NOT NULL,
    images_url json,
    description text NOT NULL,
    brightness integer NOT NULL,
    response_time integer NOT NULL,
    contrast_ratio character varying NOT NULL,
    aspect_ratio character varying NOT NULL,
    color_gamut integer,
    hdmi_connection integer,
    dp_connection integer,
    jack_connection integer,
    vga_connection integer,
    usb_2 integer,
    usb_type_c integer,
    usb_type_c_thunderbolt integer,
    is_curved boolean NOT NULL,
    vesa_mounting character varying NOT NULL,
    has_speaker boolean,
    pivot boolean,
    is_adjustable_height boolean,
    has_touchscreen boolean,
    accessories character varying,
    energy_class public.energy_class_enum,
    width double precision,
    height double precision,
    depth double precision,
    weight double precision,
    warranty integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.monitors OWNER TO main;

--
-- TOC entry 219 (class 1259 OID 16734)
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
-- TOC entry 218 (class 1259 OID 16733)
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
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: main
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3229 (class 2604 OID 16737)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: main
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3393 (class 0 OID 16716)
-- Dependencies: 217
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: main
--

COPY public.alembic_version (version_num) FROM stdin;
6a748e229a69
\.


--
-- TOC entry 3397 (class 0 OID 16796)
-- Dependencies: 221
-- Data for Name: desktop_pcs; Type: TABLE DATA; Schema: public; Owner: main
--

COPY public.desktop_pcs (id, name, price, diagonal, cpu_model, ram_size, storage_size, gpu_maker, gpu_model, image, is_available, description, maker, is_for_gaming, is_for_home_studying, is_for_office, has_screen, is_mini, ram_type, ram_frequency, cpu_maker, cpu_class, cpu_frequency, cpu_max_frequency, cpu_cores, cpu_threads, resolution, gpu_memory, gpu_memory_type, power_supply_name, power_supply, storage_type, storage_connection, extra_hardware, usb_a_2_0, usb_a_3_1, usb_type_c, vga_connection, hdmi_connection, dp_connection, case_name, case_type, motherboard, ethernet, bluetooth, wireless, warranty, installed_os, weight, width, height, depth, color, images_url, created_at, updated_at, user_id) FROM stdin;
3a8d7472-c7cd-4596-9fbe-90e5d9b47ac1	Gaming Beast X900	1499.99	27	Intel Core i7-13700KF	32	2000	NVIDIA	RTX 4080	https://example.com/images/gaming-beast-x900.jpg	t	A powerful gaming PC designed for modern games at ultra settings.	CyberTech	t	f	f	t	f	DDR5	5600	Intel	High Performance	3.5	5.4	16	24	2560x1440	16	GDDR6X	Corsair RM850x	850	SSD	NVMe	RGB lighting, water cooling	2	4	2	0	2	3	Cooler Master H500	ATX Mid Tower	MSI Z790 Gaming Plus	1000	5.2	Wi-Fi 6	36	Windows 11 Pro	12.5	21.5	48.5	45	Black	[{"url": "https://example.com/images/gaming-beast-x900-side.jpg"}, {"url": "https://example.com/images/gaming-beast-x900-front.jpg"}]	2025-01-21 15:17:11.657989	2025-01-21 15:17:11.657994	1
1a6f0c8a-9845-4c64-904d-46ee7fab1254	Office Pro 3000	599.99	24	Intel Core i5-12400	16	512	Intel	Integrated UHD Graphics 730	https://example.com/images/office-pro-3000.jpg	t	An efficient and reliable PC for office tasks and productivity.	BizTech	f	t	t	t	t	DDR4	3200	Intel	Mid Range	2.5	4.4	6	12	1920x1080	\N	\N	Cooler Master V550	550	SSD	SATA	Built-in webcam, card reader	4	2	1	1	1	0	Compact BizBox	Mini Tower	Gigabyte B660M DS3H	1000	5.1	Wi-Fi 5	24	Windows 11 Home	6.8	18	38	30	Silver	[{"url": "https://example.com/images/office-pro-3000-side.jpg"}, {"url": "https://example.com/images/office-pro-3000-front.jpg"}]	2025-01-21 15:17:31.035647	2025-01-21 15:17:31.035653	1
068a5627-037e-4fc7-98fb-4931fc88990f	Home Compact 500	499.99	21.5	AMD Ryzen 3 4300G	8	256	AMD	Integrated Radeon Graphics	https://www.omen.com/content/dam/sites/omen/worldwide/desktops/omen-45l-atx-pc-case/group-16-copy-3.png	t	Compact and affordable PC for everyday home use, web browsing, and streaming.	HomeTech	f	t	t	t	t	DDR4	3000	AMD	Entry Level	3.8	4	4	8	1920x1080	\N	\N	Silent Power 300W	300	SSD	SATA	Card reader	4	2	0	1	1	0	Mini Box 300	Mini Tower	ASRock A520M-HDV	1000	4.2	Wi-Fi 4	12	Windows 10 Home	5.5	17.5	34	28.5	Black	[]	2025-01-21 16:57:21.987872	2025-01-21 16:57:21.987881	1
9476dc16-18e4-465a-8705-14c1467c5bd5	Workstation Pro 8000	2999.99	32	AMD Ryzen Threadripper 3960X	128	4000	NVIDIA	RTX A6000	https://redtech.lk/wp-content/uploads/2021/05/SAMA-DX33306-Acrylic-Transparent-Panel-ATX-Gaming-PC-Case.png	t	High-performance workstation designed for 3D rendering, video editing, and professional workflows.	ProBuilds	f	f	t	f	f	DDR4 ECC	3200	AMD	High Performance	3.8	4.5	24	48	\N	48	GDDR6	Platinum 1000W	1000	SSD	NVMe	Dual Ethernet, advanced cooling	4	6	2	0	2	4	Workstation Case Pro	Full Tower	ASUS ROG Zenith II Extreme	2500	5.2	Wi-Fi 6E	48	Windows 11 Pro	20	24	60	55	Gray	[]	2025-01-21 16:58:11.427743	2025-01-21 16:58:11.427751	1
015b301b-c3c4-4ec7-b2f7-5a24e6a79af2	Office Starter 100	399.99	19.5	Intel Celeron G5905	4	128	Intel	Integrated UHD Graphics 610	https://www.yycase.com/proimages/cs/pro/pc/04/39.png	t	A cost-effective solution for light office work and basic applications.	SimpleTech	f	t	t	t	t	DDR4	2400	Intel	Entry Level	3.5	\N	2	2	1366x768	\N	\N	Standard 250W	250	SSD	SATA	None	4	1	0	1	1	0	Starter Mini Case	Mini Tower	Gigabyte H410M S2H	100	4.0	Wi-Fi 4	12	Windows 10 Home	4.2	16	32	28	Black	[]	2025-01-21 16:58:57.717231	2025-01-21 16:58:57.717238	1
5fac4e3a-7c53-4371-b805-009fbc705468	Gaming Extreme 5000	2499.99	32	AMD Ryzen 9 7900X	64	2000	AMD	Radeon RX 7900 XTX	https://cougargaming.com/_cgrwdr_/wwdpp/wp-content/uploads/2019/11/products_conquer-2-1.png	t	An ultimate gaming machine for 4K gaming and competitive esports.	XtremePC	t	f	f	f	f	DDR5	6000	AMD	High Performance	4.7	5.6	12	24	\N	24	GDDR6	Gold 850W	850	SSD	NVMe	RGB lighting, liquid cooling, PCIe 5.0	2	4	2	0	2	3	Xtreme Tower	Mid Tower	MSI B650 Tomahawk	2500	5.2	Wi-Fi 6	36	Windows 11 Pro	15	22	50	48	Black	[]	2025-01-21 16:59:43.602007	2025-01-21 16:59:43.602013	1
59c2aebb-b418-405b-a8f8-7e4b72eaea7b	All-in-One Flex 24	899.99	24	Intel Core i5-1135G7	16	1024	Intel	Integrated Iris Xe Graphics	https://tolvutek.is/images/prod/D/D/8/C/DD8C99A4-E8D4-42A0-8D6E-7166CA91EEAB_1_big.png	t	A sleek all-in-one PC ideal for home and office use.	TechFlex	f	t	t	t	f	DDR4	3200	Intel	Mid Range	2.4	4.2	4	8	1920x1080	\N	\N	Integrated 90W	90	SSD	NVMe	Webcam, microphone, speakers	2	3	1	0	1	0	All-in-One Enclosure	All-in-One	Custom	1000	5.0	Wi-Fi 5	24	Windows 11 Home	7.2	54	43	20	White	[]	2025-01-21 17:00:25.691534	2025-01-21 17:00:25.69154	1
61a4c621-1a76-48e3-9524-5b7f442b5995	Gaming Starter 2500	799.99	\N	Intel Core i3-12100F	16	512	NVIDIA	GeForce GTX 1660 Super	https://www.fingers.co.in/secure/api/image-tool/index.php?src=https://www.fingers.co.in/secure/api/uploads/products/1726895257_Website-images1.png&w=500&h=500&zc=2	t	Affordable gaming PC designed for entry-level 1080p gaming.	BudgetGaming	t	f	f	f	f	DDR4	3200	Intel	Entry Level	3.3	4.3	4	8	\N	6	GDDR6	Bronze 450W	450	SSD	NVMe	RGB fans	4	2	0	0	1	2	Starter Gaming Case	Mid Tower	ASUS Prime B660M	1000	4.2	Wi-Fi 5	12	Windows 11 Home	8	22	46	43	Black	[{"url": "https://example.com/images/gaming-starter-2500-side.jpg"}, {"url": "https://example.com/images/gaming-starter-2500-front.jpg"}]	2025-01-24 11:01:42.059191	2025-01-24 11:01:42.059197	1
763961f4-35bb-4e67-a621-22f177fcdddf	OfficePro 9000	1399.99	\N	Intel Core i7-13700	32	1000	Intel	Integrated UHD Graphics 770	https://static.wixstatic.com/media/db5cbe_640257b0d20947cdb7e90a28bedc3f5e.png/v1/fill/w_736,h_930,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/db5cbe_640257b0d20947cdb7e90a28bedc3f5e.png	t	A high-end office PC designed for multitasking and productivity-focused workflows.	OfficeTech	f	t	t	f	f	DDR5	4800	Intel	Mid Range	2.1	5.2	16	24	\N	\N	\N	Gold 550W	550	SSD	NVMe	SD card reader	4	3	1	0	1	1	Pro Office Case	Mid Tower	Gigabyte Z790 AORUS	2500	5.0	Wi-Fi 6	24	Windows 11 Pro	10	22.5	48	44	Silver	[]	2025-01-24 11:03:08.097093	2025-01-24 11:03:08.097097	1
58005934-32b8-4746-a583-690f81765a7c	OfficePro 9000	1399.99	\N	Intel Core i7-13700	32	1000	Intel	Integrated UHD Graphics 770	https://static.wixstatic.com/media/db5cbe_640257b0d20947cdb7e90a28bedc3f5e.png/v1/fill/w_736,h_930,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/db5cbe_640257b0d20947cdb7e90a28bedc3f5e.png	t	A high-end office PC designed for multitasking and productivity-focused workflows.	OfficeTech	f	t	t	f	f	DDR5	4800	Intel	Mid Range	2.1	5.2	16	24	\N	\N	\N	Gold 550W	550	SSD	NVMe	SD card reader	4	3	1	0	1	1	Pro Office Case	Mid Tower	Gigabyte Z790 AORUS	2500	5.0	Wi-Fi 6	24	Windows 11 Pro	10	22.5	48	44	Silver	[]	2025-01-24 11:04:22.629523	2025-01-24 11:04:22.629528	1
71cf122b-10fd-469a-a85c-6f8ca08b1d14	HomeMaster 300	649.99	\N	AMD Ryzen 5 5600G	16	512	AMD	Integrated Radeon Vega Graphics	https://images.shopcdn.co.uk/50/93/5093ef73cabf40dbd8ea152ad2d49127/512x512/webp/fit?quality=80&compression=80	t	A versatile PC suitable for home tasks, studying, and casual gaming.	HomeTech	t	t	t	f	f	DDR4	3200	AMD	Mid Range	3.9	4.4	6	12	\N	\N	\N	Standard 400W	400	SSD	SATA	None	4	2	0	1	1	0	HomeMaster Mini	Mini Tower	ASRock B550M	1000	4.2	Wi-Fi 5	24	Windows 11 Home	6.5	19	40	35	Black	[]	2025-01-24 11:05:24.203338	2025-01-24 11:05:24.203344	1
80f4e7c6-39c7-469f-9c27-b0fcf08aca1c	OfficeMini Silent	549.99	\N	Intel Core i5-10210U	8	256	Intel	Integrated UHD Graphics 620	https://m.media-amazon.com/images/I/41CVT9W9EeL._AC_UF894,1000_QL80_.jpg	t	A compact, silent mini PC ideal for quiet office environments.	QuietTech	f	t	t	f	t	DDR4	2666	Intel	Entry Level	1.6	4.2	4	8	\N	\N	\N	Integrated 65W	65	SSD	M.2 SATA	None	2	2	1	0	1	1	Silent Mini Case	Mini PC	Custom	1000	5.0	Wi-Fi 5	12	Windows 10 Pro	1.8	15	4.5	14	Gray	[]	2025-01-24 11:06:25.750324	2025-01-24 11:06:25.75033	1
\.


--
-- TOC entry 3398 (class 0 OID 16810)
-- Dependencies: 222
-- Data for Name: laptops; Type: TABLE DATA; Schema: public; Owner: main
--

COPY public.laptops (id, name, price, maker, screen_frequency, diagonal, resolution, screen_type, cpu_maker, cpu_model, cpu_class, cpu_frequency, cpu_max_frequency, cpu_cores, cpu_threads, gpu_maker, gpu_model, gpu_memory, gpu_memory_type, ram_size, ram_type, ram_frequency, storage_size, storage_type, extra_hardware, usb_a_2_0, usb_a_3_1, usb_type_c, vga_connection, hdmi_connection, dp_connection, ethernet, bluetooth, wireless, is_available, is_for_gaming, is_for_home_studying, is_for_office, warranty, installed_os, weight, width, height, depth, color, description, image, images_url, created_at, updated_at, user_id) FROM stdin;
b98d98c0-3c26-421b-b9b0-8cddbe49d4ef	HP Omen Max 16	2499.99	HP	165	16	2560x1600	IPS	Intel	Intel Core Ultra 9	High Performance	3.6	5	8	16	NVIDIA	GeForce RTX 5080	16	GDDR6	32	DDR5	4800	1000	SSD	Advanced Cooling System	0	3	2	0	1	1	1	5.3	Wi-Fi 6E	t	t	f	f	24	Windows 11 Pro	2.5	357.9	23.5	245.1	Shadow Black	HP's most powerful gaming laptop yet, featuring next-gen NVIDIA GeForce RTX 5080 graphics and advanced cooling technology.	https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/HP-Omen-Max-16-1.png	[{"url": "https://www.hp.com/wcsstore/hpusstore/Treatment/rc/FY25Q1-B64BNUA/OMEN-Max-16-Gaming-Laptop-with-NVIDIA-graphics.png"}, {"url": "https://www.hp.com/wcsstore/hpusstore/Treatment/images/b64bnua_c09093977_center_facing_573x430.png?impolicy=Png_Res"}]	2025-01-24 11:11:11.695192	2025-01-24 11:11:11.695197	1
6bfbc7f0-be5d-4ea0-a3fa-29857d278c19	Lenovo Legion 5 Pro	1699	Lenovo	165	16	2560x1600	IPS	AMD	AMD Ryzen 7 5800H	Zen 3	3.2	4.4	8	16	NVIDIA	GeForce RTX 3070	8	GDDR6	16	DDR4	3200	1024	SSD	RGB Keyboard	2	3	2	0	1	1	1	5.2	Wi-Fi 6	t	t	f	t	2	Windows 11	2.45	35.6	2.5	25.2	Storm Grey	A high-performance gaming laptop with an immersive display.	https://techbuyz.co.ke/wp-content/uploads/2023/06/lenovo-legion-5pro.jpg	[{"url": "https://techbuyz.co.ke/wp-content/uploads/2023/06/lenovo-legion-5pro.jpg"}, {"url": "https://assets.mspimages.in/gear/wp-content/uploads/2021/11/Lenovo-Legion-5-Pro-Review.jpg"}]	2025-01-17 22:20:29.686443	2025-01-17 22:20:29.686449	1
04222260-55e2-42fb-b6b9-6d74545cadff	HP Spectre x360	1499	HP	60	13.5	1920x1280	OLED	Intel	Intel Core i7-1255U	Alder Lake	1.7	4.7	10	12	Intel	Iris Xe	0	Shared	16	LPDDR4x	4266	1024	SSD	Convertible Display	0	2	2	0	1	0	0	5.2	Wi-Fi 6	t	f	t	t	1	Windows 11	1.3	30.5	1.7	21.5	Nightfall Black	A premium convertible laptop with stunning visuals and portability.	https://cdn.mos.cms.futurecdn.net/CsxfQ3MaDZ8A9AfqSiLf4.jpg	[{"url": "https://cdn.mos.cms.futurecdn.net/CsxfQ3MaDZ8A9AfqSiLf4.jpg"}, {"url": "https://i.pcmag.com/imagery/reviews/03jMpJIZFLZ0KJpnE2bBfjY-1.fit_scale.size_760x427.v1704305096.jpg"}]	2025-01-17 22:20:57.459123	2025-01-17 22:20:57.459129	1
3ea9f06b-98f9-4c91-a7cb-444409a7b8f6	Lenovo ThinkBook Plus Gen 6	1999.99	Lenovo	60	13.3	2560x1600	OLED	Intel	Intel Core i7-13700H	High Performance	3.7	5	14	20	Intel	Integrated Iris Xe Graphics	0	\N	16	LPDDR5	5200	512	SSD	Rollable Display	0	2	2	0	1	0	0	5.2	Wi-Fi 6E	t	f	t	t	12	Windows 11 Home	1.2	298.4	15.9	209	Storm Grey	Innovative laptop featuring a rollable display for enhanced productivity and portability.	https://news.lenovo.com/wp-content/uploads/2025/01/01_ThinkBook_Plus_6_Display_Rolled_Up_vs_Rolled_Down-e1736184420427-1024x562.png	[{"url": "https://www.notebookcheck.net/fileadmin/_processed_/8/5/csm_07_ThinkBook_Plus_6_Birdseye_Keyboard_9d10434d3a.png"}]	2025-01-24 11:13:19.157966	2025-01-24 11:13:19.157974	1
c97c03cc-8ead-438e-a62c-b5a6aa1fb496	MSI Titan 18 HX Dragon Edition Norse Myth	4999.99	MSI	120	18	3840x2160	Mini LED	Intel	Intel Core Ultra 9 285HX	High Performance	3.6	5	8	16	NVIDIA	GeForce RTX 5090	24	GDDR7	96	DDR5	5600	2000	SSD	Cherry Mechanical Keyboard, Six-Speaker Audio System	0	3	2	0	1	1	1	5.3	Wi-Fi 6E	t	t	f	f	24	Windows 11 Pro	3.6	400	25	300	Black with Norse Mythology Design	MSI's latest high-end gaming laptop featuring top-tier components and a unique Norse mythology-inspired design.	https://asset.msi.com/resize/image/global/product/product_17369342171d2037fd7ce4b551d5b3ce13e66dea4b.png62405b38c58fe0f07fcef2367d8a9ba1/600.png	[{"url": "https://storage-asset.msi.com/global/picture/image/feature/nb/2025_ARL/Titan-18-HX-Dargon-Edition-Norse-Myth/io-right-pd-v1.png"}, {"url": "https://asset.msi.com/resize/image/global/product/product_17369342152bae1ed947916e5ba8d6a36505251a93.png62405b38c58fe0f07fcef2367d8a9ba1/600.png"}]	2025-01-24 11:14:40.650285	2025-01-24 11:14:40.65029	1
7c09ba09-565c-4928-b060-88864ec56886	UltraBook X15 INTEL	1200	Acer	120	15.6	1920x1080	IPS	Intel	Intel Core i7-1260P	Mobile	2.5	4.5	12	16	NVIDIA	RTX 3050 Ti	4	GDDR6	16	DDR4	3200	512	SSD	Fingerprint reader	1	2	2	0	1	1	1	5.1	Wi-Fi 6	f	t	t	t	24	Windows 11 Home	1.8	357.6	17.9	240.5	Silver	The UltraBook X15 is a lightweight and powerful laptop designed for gaming, studying, and office work. Featuring a high-refresh-rate display and cutting-edge hardware, it's perfect for all-around performance.	https://cdn.mos.cms.futurecdn.net/SZgb2RdRBoJp7eN6A6CEM.png	[{"url": "https://dlcdnwebimgs.asus.com/gain/2822d7cb-0e0b-4ce3-9836-cb363ad45908/"}]	2025-01-17 20:15:29.611634	2025-01-19 20:18:29.516314	1
887cb678-cda9-4e8b-b1a3-94a634359e33	Dell Inspiron 14 Plus	999.99	Dell	60	14	1920x1200	IPS	Intel	Intel Core i7-12700H	High Performance	3.5	4.7	14	20	NVIDIA	GeForce RTX 3050	4	GDDR6	16	DDR4	3200	512	SSD	Fingerprint Reader	0	2	1	0	1	0	1	5.2	Wi-Fi 6	t	t	t	t	12	Windows 11 Home	1.5	321.3	18.9	212.8	Platinum Silver	The Dell Inspiron 14 Plus offers strong performance, exceptional battery life, and a vibrant display.	https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/7441/media-gallery/touch/notebook-inspiron-7441-t-ice-blue-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=586&qlt=100,1&resMode=sharp2&size=586,402&chrss=full	[{"url": "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/14-7440/pdp/laptop-inspiron-14-7440-plus-intel-pdp-hero.psd?qlt=95&fit=constrain,1&hei=400&wid=570&fmt=png-alpha"}]	2025-01-24 11:08:52.859682	2025-01-24 11:08:52.859687	1
12225de4-b23f-4633-b725-cab540127e95	MacBook Air M3	1199.99	Apple	60	13.6	2560x1664	Retina	Apple	Apple M3	High Performance	3.2	3.8	8	8	Apple	Integrated 8-core GPU	0	\N	8	Unified Memory	0	256	SSD	None	0	0	2	0	0	0	0	5.0	Wi-Fi 6	t	f	t	t	12	macOS	1.24	304.1	11.3	212.4	Space Gray	The MacBook Air M3 offers a mix of power, portability, a bright display, and over 15 hours of battery life.	https://www.en.ideal.ee/media/wysiwyg/ideal_m2/product_pages/macbook_air_m3/hero_small_2x.png?1708555710106	[{"url": "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/mba_13_m3_2024_hero.png"}, {"url": "https://www.en.ideal.ee/media/wysiwyg/ideal_m2/product_pages/macbook_air_m3/size_small_2x.png?1708555710109"}]	2025-01-24 11:09:53.750548	2025-01-24 11:09:53.750553	1
4c03676f-bd78-4bb1-835e-649ec75d71b6	HP Omen Max 16	2499.99	HP	165	16	2560x1600	IPS	Intel	Intel Core Ultra 9	High Performance	3.6	5	8	16	NVIDIA	GeForce RTX 5080	16	GDDR6	32	DDR5	4800	1000	SSD	Advanced Cooling System	0	3	2	0	1	1	1	5.3	Wi-Fi 6E	t	t	f	f	24	Windows 11 Pro	2.5	357.9	23.5	245.1	Shadow Black	HP's most powerful gaming laptop yet, featuring next-gen NVIDIA GeForce RTX 5080 graphics and advanced cooling technology.	https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/HP-Omen-Max-16-1.png	[{"url": "https://www.hp.com/wcsstore/hpusstore/Treatment/rc/FY25Q1-B64BNUA/OMEN-Max-16-Gaming-Laptop-with-NVIDIA-graphics.png"}, {"url": "https://www.hp.com/wcsstore/hpusstore/Treatment/images/b64bnua_c09093977_center_facing_573x430.png?impolicy=Png_Res"}]	2025-01-24 11:11:10.196545	2025-01-24 11:11:10.19655	1
dc1df51b-d606-4fc3-b781-a8383c80b714	ASUS ROG Strix Scar 18	2599.99	ASUS	240	18	2560x1600	Mini LED	Intel	Intel Core Ultra 9 275HX	High Performance	3.5	5	8	16	NVIDIA	GeForce RTX 5090	16	GDDR6	64	DDR5	5600	2000	SSD	AniMe Matrix LED Display on Lid	0	2	2	0	1	1	1	5.3	Wi-Fi 6E	t	t	f	f	24	Windows 11 Pro	3.1	399	23	294	Eclipse Gray	ASUS's latest ROG Strix Scar series gaming laptop with high-end specs and customizable RGB lighting.	https://dlcdnwebimgs.asus.com/gain/2BF5F03B-E120-4523-BBFF-AA8939E19B64	[{"url": "https://dlcdnwebimgs.asus.com/files/media/621ECFA4-AFC8-4B9C-AC50-C7D8A292D62D/v1/img/gaming/gaming-pd.png"}]	2025-01-24 11:15:28.969329	2025-01-24 11:15:28.969335	1
\.


--
-- TOC entry 3396 (class 0 OID 16783)
-- Dependencies: 220
-- Data for Name: monitors; Type: TABLE DATA; Schema: public; Owner: main
--

COPY public.monitors (id, name, maker, price, diagonal, resolution, panel_type, refresh_rate, image, is_available, images_url, description, brightness, response_time, contrast_ratio, aspect_ratio, color_gamut, hdmi_connection, dp_connection, jack_connection, vga_connection, usb_2, usb_type_c, usb_type_c_thunderbolt, is_curved, vesa_mounting, has_speaker, pivot, is_adjustable_height, has_touchscreen, accessories, energy_class, width, height, depth, weight, warranty, created_at, updated_at, user_id) FROM stdin;
bd2e31e5-6417-4959-8faf-196ae0ff76b8	Dell UltraSharp U2723QE	Dell	649.99	27	3840x2160	IPS	60	https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/e6b58295605132c59c6286cc529a3144/original.png	t	[{"url": "https://cdn.cs.1worldsync.com/syndication/mediaserverredirect/aa8fde5cf790c13dbd3e4d6cbb05ea86/original.png"}, {"url": "https://www.atreid.com/miniatures/im/o/d/dell-u273qe-main-650-400.png"}]	27-inch 4K UHD monitor with outstanding color accuracy and a wide color gamut, suitable for professionals.	400	5	1000:1	16:9	99	1	1	1	0	0	1	0	f	100x100	f	t	t	f	Power cable, DisplayPort cable, USB-C cable	Double_A	611.3	535.7	185	8.2	36	2025-01-19 18:42:12.517642	2025-01-19 18:42:12.517646	1
e6ec7676-aba6-4536-b0b6-d42482a19869	Samsung Odyssey Neo G8	Samsung	1499.99	32	3840x2160	VA	240	https://images.samsung.com/is/image/samsung/p6pim/in/ls32bg850nwxxl/gallery/in-odyssey-neo-g8-g85nb-ls32bg850nwxxl-533187982?$684_547_PNG$	t	[{"url": "https://www.heathcotes.co.nz/spree/products/56459/large/LS32BG852NEXXY_-_Samsung_32_Odyssey_Neo_G8_UHD_Gaming_Quantum_Mini-LED_Monitor_%283%29.png?1666837507"}]	World’s first 4K 240Hz gaming monitor with Quantum HDR2000 and a 1000R curvature for an immersive experience.	2000	1	1000000:1	16:9	95	2	1	0	0	2	0	0	t	100x100	t	f	t	f	HDMI cable, DP cable, Power adapter	Single_A	710.1	605.9	311.1	9.5	24	2025-01-19 18:43:18.988306	2025-01-19 18:43:18.988312	1
2692a6e6-2020-4111-b571-f68e4589b7b9	LG UltraFine Ergo 32UN880-B	LG	699.99	32	3840x2160	IPS	60	https://res-2.cloudinary.com/grover/image/upload/v1682338325/xjcbjxjmmhuhtqqji3yz.png	t	[{"url": "https://res-1.cloudinary.com/grover/image/upload/v1682338340/znafy13tg9x2ivlykisc.png"}, {"url": "https://vividgold.co.ke/cdn/shop/files/LGUN880_600x600.png?v=1723817174"}]	4K UHD monitor with ergonomic arm stand and HDR10 support, ideal for creative professionals.	350	5	1000:1	16:9	98	2	1	1	0	0	1	0	f	100x100	t	t	t	f	Ergonomic arm, Power cable, HDMI cable, USB-C cable	Single_A	714.3	605.7	231	10	36	2025-01-19 18:44:19.708529	2025-01-19 18:44:19.708536	1
8b2ca69c-8797-4f7f-a28a-05f39c966f7a	ASUS ProArt Display PA32UCX	ASUS	2999.99	32	3840x2160	IPS	60	https://dlcdnimgs.asus.com/websites/global/products/5njbd2tzgb0fr23e/img/smarthdr-4.png	t	[{"url": "https://www.asus.com/media/global/products/OJHWeNhkQf014c7X/P_setting_xxx_0_90_end_692.png"}, {"url": "https://img.myshopline.com/image/store/1699507075863/fwebp-24.png?w=800&h=800"}]	Professional 4K HDR monitor with 97% DCI-P3 coverage and Dolby Vision for content creators.	1000	5	1000:1	16:9	97	2	1	1	0	2	1	1	f	100x100	f	t	t	f	Power cable, HDMI cable, Thunderbolt cable	A	728	630	245	13	36	2025-01-19 19:01:55.75332	2025-01-19 19:01:55.753325	1
2579c25d-e295-4bf7-a34c-d2b88ce76ec3	BenQ EX3501R	BenQ	899.99	35	3440x1440	VA	100	https://media2.bizserver.eu/6124/monitor-benq-led-ex3501r-35-cali.jpg	t	[{"url": "https://www.techspot.com/images/products/2017/monitors/org/2018-02-09-product.png"}, {"url": "https://101-multimedia.com/4908-home_default/benq-35-ex3501r-1800r-curvature-100hz.jpg"}]	Ultra-wide curved monitor with HDR support and USB-C connectivity, perfect for productivity and entertainment.	300	4	2500:1	21:9	95	2	1	1	0	2	1	0	t	100x100	f	f	t	f	HDMI cable, DP cable, USB-C cable	Single_A	833	574	223	11.2	24	2025-01-19 19:03:37.988294	2025-01-19 19:03:37.988298	1
86730958-3d52-4560-be5c-ac4df4695e55	Acer Predator X34 GS	Acer	1399.99	34	3440x1440	IPS	180	https://www.acervietnam.com.vn/wp-content/uploads/2022/02/Predator-X34-GS_3-2.png	t	[{"url": "https://techent.tv/wp-content/uploads/2024/06/PREDATOR-X34-X5-01.png"}, {"url": "https://www.tech-critter.com/wp-content/uploads/2020/10/PREDATOR-X34-GS-Standard_01.png"}, {"url": "https://i0.wp.com/www.c2ocorp.com/wp-content/uploads/2021/10/Predator_Monitor_X-series_X34_GS_gallery_07.png?fit=480%2C380&ssl=1"}]	High-performance curved gaming monitor with NVIDIA G-Sync and wide color gamut.	400	1	1000:1	21:9	98	2	1	1	0	4	0	0	t	100x100	t	f	t	f	Power cable, DP cable, HDMI cable	Single_A	817	601	309	9.9	24	2025-01-19 19:05:59.560436	2025-01-19 19:05:59.560443	1
e3677274-7197-42ce-bd07-64866e4e8e14	ViewSonic Elite XG270QG	ViewSonic	749.99	27	2560x1440	IPS	165	https://www.viewsonic.com/vsAssetFile/ph/img/resize/product-rc/_lcd_display_%28new%29/XG270QG/kv.webp	t	[{"url": "https://www.viewsonic.com/vsAssetFile/ph/img/resize/product-rc/_lcd_display_%28new%29/XG270QG/connector.webp"}, {"url": "https://cdn.shopify.com/s/files/1/0513/8205/9159/files/monitor3_png_480x480.webp?v=1671516958"}]	Gaming monitor with NVIDIA G-Sync, 98% DCI-P3, and vibrant visuals for smooth gameplay.	350	1	1000:1	16:9	98	1	1	1	0	3	0	0	f	100x100	t	t	t	f	HDMI cable, DP cable, Power cable	A	612	540	265	7	36	2025-01-19 19:07:17.225355	2025-01-19 19:07:17.225361	1
2ac276a2-7c24-48e1-8c51-2e1dd2bda6d2	LG 49WL95C-W	LG	1499.99	49	5120x1440	IPS	60	https://avatars.mds.yandex.net/get-mpic/6583032/img_id7754121235622529923.png/orig	t	[{"url": "https://avatars.mds.yandex.net/get-mpic/6321906/img_id5963107112556988925.png/orig"}]	Ultra-wide dual QHD monitor for multitasking and professional workflows, with HDR10 and USB-C.	350	5	1000:1	32:9	99	2	1	1	0	2	1	0	f	100x100	t	f	t	f	Power cable, HDMI cable, USB-C cable	Double_A	1215	365	230	14.9	24	2025-01-19 19:08:32.636769	2025-01-19 19:08:32.636776	1
\.


--
-- TOC entry 3395 (class 0 OID 16734)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: main
--

COPY public.users (username, first_name, last_name, created_at, updated_at, phone_number, id, email, hashed_password, is_active, is_superuser, is_verified) FROM stdin;
FastAPIAdmin	Admin	Admin	2025-01-17 22:12:58.209826	2025-01-17 22:12:58.209832	+380992921960	1	admin@admin.com	$argon2id$v=19$m=65536,t=3,p=4$YC6C+BpK9R/PKyIBS0NmgQ$W9lsolcv4N4tTk5HDnQ5qkRzMpFW/6puvCL1OtAqQyY	t	t	t
\.


--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: main
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- TOC entry 3231 (class 2606 OID 16720)
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: main
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- TOC entry 3241 (class 2606 OID 16802)
-- Name: desktop_pcs pk_desktop_pcs; Type: CONSTRAINT; Schema: public; Owner: main
--

ALTER TABLE ONLY public.desktop_pcs
    ADD CONSTRAINT pk_desktop_pcs PRIMARY KEY (id);


--
-- TOC entry 3244 (class 2606 OID 16816)
-- Name: laptops pk_laptops; Type: CONSTRAINT; Schema: public; Owner: main
--

ALTER TABLE ONLY public.laptops
    ADD CONSTRAINT pk_laptops PRIMARY KEY (id);


--
-- TOC entry 3238 (class 2606 OID 16789)
-- Name: monitors pk_monitors; Type: CONSTRAINT; Schema: public; Owner: main
--

ALTER TABLE ONLY public.monitors
    ADD CONSTRAINT pk_monitors PRIMARY KEY (id);


--
-- TOC entry 3235 (class 2606 OID 16741)
-- Name: users pk_users; Type: CONSTRAINT; Schema: public; Owner: main
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (id);


--
-- TOC entry 3239 (class 1259 OID 16808)
-- Name: ix_desktop_pcs_created_at; Type: INDEX; Schema: public; Owner: main
--

CREATE INDEX ix_desktop_pcs_created_at ON public.desktop_pcs USING btree (created_at);


--
-- TOC entry 3242 (class 1259 OID 16822)
-- Name: ix_laptops_created_at; Type: INDEX; Schema: public; Owner: main
--

CREATE INDEX ix_laptops_created_at ON public.laptops USING btree (created_at);


--
-- TOC entry 3236 (class 1259 OID 16795)
-- Name: ix_monitors_created_at; Type: INDEX; Schema: public; Owner: main
--

CREATE INDEX ix_monitors_created_at ON public.monitors USING btree (created_at);


--
-- TOC entry 3232 (class 1259 OID 16742)
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: main
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- TOC entry 3233 (class 1259 OID 16743)
-- Name: ix_users_username; Type: INDEX; Schema: public; Owner: main
--

CREATE UNIQUE INDEX ix_users_username ON public.users USING btree (username);


--
-- TOC entry 3246 (class 2606 OID 16803)
-- Name: desktop_pcs fk_desktop_pcs_user_id_users; Type: FK CONSTRAINT; Schema: public; Owner: main
--

ALTER TABLE ONLY public.desktop_pcs
    ADD CONSTRAINT fk_desktop_pcs_user_id_users FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3247 (class 2606 OID 16817)
-- Name: laptops fk_laptops_user_id_users; Type: FK CONSTRAINT; Schema: public; Owner: main
--

ALTER TABLE ONLY public.laptops
    ADD CONSTRAINT fk_laptops_user_id_users FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3245 (class 2606 OID 16790)
-- Name: monitors fk_monitors_user_id_users; Type: FK CONSTRAINT; Schema: public; Owner: main
--

ALTER TABLE ONLY public.monitors
    ADD CONSTRAINT fk_monitors_user_id_users FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2025-01-24 12:00:22 UTC

--
-- PostgreSQL database dump complete
--

