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
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: main
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO main;

--
-- Name: laptops; Type: TABLE; Schema: public; Owner: main
--

CREATE TABLE public.laptops (
    id uuid NOT NULL,
    name character varying NOT NULL,
    price double precision NOT NULL,
    screen_frequency character varying,
    diagonal character varying NOT NULL,
    resolution character varying NOT NULL,
    screen_type character varying,
    cpu_model character varying NOT NULL,
    cpu_class character varying NOT NULL,
    cpu_frequency character varying,
    gpu_model character varying,
    gpu_memory character varying,
    ram_size character varying,
    ram_type character varying,
    ram_frequency character varying,
    is_available boolean NOT NULL,
    maker character varying NOT NULL,
    storage_size character varying,
    installed_os character varying,
    weight double precision NOT NULL,
    color character varying,
    description character varying,
    image character varying NOT NULL,
    extra_image character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    user_id integer NOT NULL,
    cpu_cores integer,
    cpu_threads integer,
    gpu_memory_type character varying,
    storage_type character varying,
    hardware_type character varying,
    warranty character varying
);


ALTER TABLE public.laptops OWNER TO main;

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
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: main
--

COPY public.alembic_version (version_num) FROM stdin;
f13662033279
\.


--
-- Data for Name: laptops; Type: TABLE DATA; Schema: public; Owner: main
--

COPY public.laptops (id, name, price, screen_frequency, diagonal, resolution, screen_type, cpu_model, cpu_class, cpu_frequency, gpu_model, gpu_memory, ram_size, ram_type, ram_frequency, is_available, maker, storage_size, installed_os, weight, color, description, image, extra_image, created_at, updated_at, user_id, cpu_cores, cpu_threads, gpu_memory_type, storage_type, hardware_type, warranty) FROM stdin;
a22aefbe-23a8-4cb9-97cd-54e94d239213	Lenovo Legion 5 Pro	1699	165Hz	16 inches	2560x1600	IPS	AMD Ryzen 7 5800H	Zen 3	3.2 GHz	NVIDIA GeForce RTX 3070	8GB	16GB	DDR4	3200 MHz	t	Lenovo	1TB	Windows 11	2.45	Storm Grey	A high-performance gaming laptop with an immersive display.	https://techbuyz.co.ke/wp-content/uploads/2023/06/lenovo-legion-5pro.jpg	https://assets.mspimages.in/gear/wp-content/uploads/2021/11/Lenovo-Legion-5-Pro-Review.jpg	2025-01-02 23:19:37.092598	2025-01-02 23:19:37.092602	12	8	16	GDDR6	SSD	Gaming Laptop	2 years
1c38996b-0776-4b45-9190-2d6be6acedd4	HP Spectre x360	1499	60Hz	13.5 inches	1920x1280	OLED	Intel Core i7-1255U	Alder Lake	1.7 GHz	Intel Iris Xe Graphics	Integrated	16GB	LPDDR4x	4266 MHz	t	HP	1TB	Windows 11	1.3	Nightfall Black	A premium convertible laptop with stunning visuals and portability.	https://cdn.mos.cms.futurecdn.net/CsxfQ3MaDZ8A9AfqSiLf4.jpg	https://i.pcmag.com/imagery/reviews/03jMpJIZFLZ0KJpnE2bBfjY-1.fit_scale.size_760x427.v1704305096.jpg	2025-01-02 23:20:55.512546	2025-01-02 23:20:55.51255	12	10	12	N/A	SSD	Convertible	1 year
09d2cb3b-d3b2-45bc-962f-89e837bdf7ef	ASUS ROG Zephyrus G14	1599	120Hz	14 inches	2560x1440	IPS	AMD Ryzen 9 6900HS	Zen 3+	3.3 GHz	AMD Radeon RX 6800S	8GB	32GB	DDR5	4800 MHz	t	ASUS	1TB	Windows 11	1.7	Moonlight White	A powerful and compact gaming laptop with advanced cooling.	https://rog.asus.com/media/170728681833.jpg	https://i.pcmag.com/imagery/reviews/06n6ndAJmuUvKYLGv1njcn0-1.fit_scale.size_760x427.v1710540681.jpg	2025-01-02 23:21:36.679546	2025-01-02 23:21:36.67955	12	8	16	GDDR6	SSD	Gaming Laptop	1 year
6f33a19f-42e5-44c5-913d-89f8b152209f	Dell XPS 13	1550	60Hz	13.4 inches	1920x1200	IPS	Intel Core i7-1165G7	Tiger Lake	2.8 GHz	Intel Iris Xe Graphics	Integrated	16GB	LPDDR4x	4267 MHz	t	Dell	512GB	Windows 11	1.2	Silver	A compact and powerful ultrabook ideal for professionals.	https://i.pcmag.com/imagery/reviews/07dUbrqwNq4AWkV4IIOH7HZ-1..v1658955111.jpg	https://www.delltechnologies.com/uploads/2022/01/xpsblog2.png	2025-01-02 23:17:13.443448	2025-01-03 18:22:30.970969	12	4	8	N/A	SSD	Ultrabook	1 year
49cf7763-ff93-4dd0-a4f8-c72a51bfdfe5	HP Spectre x360 14	1349.99	60Hz	13.5"	1920x1280	OLED Touch	Intel Core i7-1165G7	Tiger Lake	2.8 GHz	Intel Iris Xe	Shared	16GB	LPDDR4x	4266MHz	t	HP	512GB	Windows 11 Home	1.3	Nightfall Black	Premium 2-in-1 laptop with stunning OLED display and excellent performance.	https://dv9dhd03d71d4.cloudfront.net/eyJidWNrZXQiOiJwcm9kLXd3dy1hc3NldHMtcGVyZmVjdHJlYyIsImtleSI6ImltYWdlcy9wcm9kdWN0cy9sYXB0b3BzL1BlcmZlY3RSZWNfTGFwdG9wX0hQX1NwZWN0cmV4MzYwMTQucG5nIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo2MDAsImZpdCI6ImNvdmVyIn19fQ==	https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06910620.png?impolicy=Png_Res	2025-01-05 12:26:36.655064	2025-01-05 12:36:05.619344	14	4	8	Integrated	SSD	2-in-1 Convertible	1 year
a2901d18-b97a-48f9-9185-7a2fa8aafa80	MacBook Air M2	1400	60Hz	13.6 inches	2560x1664	Retina	Apple M2	ARM	3.5 GHz	Integrated Apple GPU	Shared	8GB	Unified	N/A	t	Apple	256GB	macOS Ventura	1.24	Space Gray	A lightweight and efficient laptop with cutting-edge Apple Silicon.	https://www.cnet.com/a/img/resize/aba646bbfefdaae2a6aed6d516512f33e3b3a0c9/hub/2022/07/12/995173ef-de01-45be-a714-c5d581f4bd5c/macbook-air-m2-2022-2.jpg?auto=webp&width=1200	https://images.expertreviews.co.uk/wp-content/uploads/2022/08/m2_macbook_air_2022_review_0.jpg	2025-01-02 23:18:16.447402	2025-01-03 18:38:11.392737	12	8	8	N/A	SSD	Ultrabook	1 year
736d6898-8217-449a-a654-82feed1d168b	Dell Inspiron 15	749.99	60Hz	15.6"	1920x1080	IPS	Intel Core i5-1135G7	Tiger Lake	2.4 GHz	Intel Iris Xe	Shared	8GB	DDR4	3200MHz	t	Dell	512GB	Windows 10 Home	1.8	Silver	A versatile laptop with great performance for everyday use.	https://www.bhphotovideo.com/images/images2500x2500/dell_i15rmt_5100slv_inspr_5521_i5_4200u_6gb_500gb_windows_8_15_6_1004779.jpg	https://www.dell.com/sites/csimages/Merchandizing_Imagery/all/inspiron-15-7000-2-in-1-black-edition-laptop.jpg	2025-01-04 22:49:35.104677	2025-01-04 22:49:35.104684	14	4	8	Integrated	SSD	Ultrabook	1 year
7a5755d0-49d0-4143-83bc-dc3d945e3bcb	ASUS ROG Zephyrus G14	1599.99	120Hz	14"	2560x1440	IPS	AMD Ryzen 9 5900HS	HS-Series	3.3 GHz	NVIDIA GeForce RTX 3060	6GB	16GB	DDR4	3200MHz	t	ASUS	1TB	Windows 10 Home	1.7	White	A powerful gaming laptop with exceptional performance.	https://d2ki7eiqd260sq.cloudfront.net/h732-10-74af30d6-e1af-4d0a-a851-eb8b5ba872a2.png	https://m.media-amazon.com/images/I/61sXQQpkMPL.jpg	2025-01-04 22:50:08.890056	2025-01-05 11:14:40.042063	14	8	16	GDDR6	SSD	Gaming Laptop	2 years
b6740305-4254-4411-af91-4ca6a7bf6a8a	Lenovo ThinkPad X1 Carbon Gen 10	1699.99	60Hz	14"	1920x1200	IPS	Intel Core i7-1260P	Alder Lake	2.1 GHz	Intel Iris Xe	Shared	16GB	LPDDR5	5200MHz	t	Lenovo	1TB	Windows 11 Pro	1.1	Black	Lightweight, durable, and powerful business laptop with enterprise-grade security.	https://p1-ofp.static.pub//fes/cms/2024/08/27/yd5dqi756ec0vr9a09fhc5s90tx4l6387783.png	https://www.lenovoarvutid.ee/wp-content/uploads/2022/05/ThinkPad_X1_Carbon_Gen_10_CT1_01-800x800.png	2025-01-05 12:26:51.814234	2025-01-05 12:36:58.447114	14	12	16	Integrated	SSD	Business Laptop	3 years
8da15280-18e1-4d52-83bd-6e0e08dbb366	Acer Swift 3	849.99	60Hz	14"	1920x1080	IPS	AMD Ryzen 7 5700U	Zen 3	1.8 GHz	AMD Radeon Graphics	Shared	8GB	DDR4	3200MHz	t	Acer	512GB	Windows 10 Home	1.2	Silver	Affordable and portable laptop with excellent battery life and performance.	https://m.media-amazon.com/images/I/71c5W9NxN5L._AC_SL1500_.jpg	https://m.media-amazon.com/images/I/71LtJ8i17mL._AC_SL1500_.jpg	2025-01-05 12:27:21.651854	2025-01-05 12:27:21.65186	14	8	16	Integrated	SSD	Ultrabook	1 year
fc50ed9d-0678-4ae1-837f-287925497e60	Apple MacBook Pro 16	2499.99	120Hz	16"	3456x2234	Liquid Retina XDR	Apple M2 Pro	ARM	3.2GHz	Integrated 16-core GPU	Shared	16GB	Unified Memory	NA	t	Apple	512GB	macOS Ventura	2.1	Space Gray	Professional-grade laptop with exceptional display and performance.	https://pilt.elisa.ee/325b1cad-b7b7-4274-915e-0e0267c8be6b.png	https://crdms.images.consumerreports.org/prod/products/cr/models/408691-15-to-16-inch-laptops-apple-macbook-pro-16-12-core-m2-pro-512gb-32gb-10034458.png	2025-01-05 12:48:54.509774	2025-01-05 12:57:16.224813	14	10	10	Unified	SSD	Laptop	1 year
16712ea1-9eb3-46dc-aa6b-3d1a76f72069	Asus ROG Zephyrus G14	1599.99	120Hz	14"	2560x1600	IPS	AMD Ryzen 9 6900HS	Gaming	3.3GHz	NVIDIA GeForce RTX 3060	6GB	16GB	DDR5	4800MHz	t	Asus	1TB	Windows 11 Home	1.6	Eclipse Gray	Portable gaming powerhouse with excellent performance.	https://dlcdnwebimgs.asus.com/files/media/F78BEA60-7937-4C78-A45A-F1AE66AADC68/v1/images/large/1x/audio_laptop_solid.png	https://dlcdnwebimgs.asus.com/files/media/59679AA3-66F7-4DBB-BA4C-1A13376F5B4C/v1/images/large/1x/carousel_4_1.png	2025-01-05 12:49:09.739613	2025-01-05 12:57:53.900873	14	8	16	GDDR6	SSD	Gaming Laptop	1 year
73d6e786-85bc-4e24-847d-617bee103ffd	Gigabyte Aero 16 OLED	2099.99	60Hz	16"	3840x2400	OLED	Intel Core i7-12700H	Alder Lake	2.3 GHz	NVIDIA GeForce RTX 3070 Ti	8GB	16GB	DDR5	4800MHz	t	Gigabyte	1TB	Windows 11 Home	2.3	Silver	High-performance laptop for creators with stunning 4K OLED display.	https://www.scan.co.uk/images/infopages/laptops/gigabyte/aero_16/2023/bsf/topimg.png	https://www.gigabyte.com/FileUpload/Global/KeyFeature/2309/innergigabyteimages/color.png	2025-01-05 12:27:32.892925	2025-01-05 12:34:39.624417	14	14	20	GDDR6	SSD	Creator Laptop	2 years
807fb5a5-0aad-406a-941c-91beccd0aa5d	MSI GE76 Raider	2499.99	144Hz	17.3"	1920x1080	IPS	Intel Core i9-12900HK	Alder Lake	3.8 GHz	NVIDIA GeForce RTX 3080 Ti	16GB	32GB	DDR5	4800MHz	t	MSI	2TB	Windows 11 Home	2.9	Titanium Blue	Ultimate gaming laptop with high refresh rate and cutting-edge performance.	https://asset.msi.com/resize/image/global/product/product_1639040638b7515d6bb3107aa4916d9302bac76680.png62405b38c58fe0f07fcef2367d8a9ba1/600.png	https://i5.walmartimages.com/seo/MSI-GE-Series-17-3-360-Hz-IPS-Intel-Core-i7-12th-Gen-12700H-2-30GHz-NVIDIA-GeForce-RTX-3070-Ti-Laptop-GPU-32-GB-DDR5-1-TB-PCIe-SSD-Windows-11-Home-64_e0ee598a-4340-461b-b2e3-e6fc289f18f6.c08f0e26cf4705c6e84452c422b379ac.png?odnHeight=768&odnWidth=768&odnBg=FFFFFF	2025-01-05 12:27:07.307903	2025-01-05 12:38:03.249437	14	14	20	GDDR6	SSD	Gaming Laptop	2 years
7609e78a-00ae-49f1-8677-3db83555df80	Huawei MateBook X Pro 2023	1999.99	90Hz	14.2"	3120x2080	LTPS	Intel Core i7-1360P	Ultrabook	3.6GHz	Intel Iris Xe	Integrated	16GB	LPDDR5	5200MHz	t	Huawei	1TB	Windows 11 Pro	1.26	Space Grey	A lightweight and elegant ultrabook with a 3:2 display and long battery life.	https://consumer.huawei.com/content/dam/huawei-cbg-site/cee-nordics/common/mkt/pdp/laptops/matebook-x-pro-2023-13th-gen-core/img/huawei-matebook-x-pro-display.png	https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/pc/matebook-x-pro-ultra-premium-edition/images/design/huawei-matebook-x-pro-colour-01-02.png	2025-01-05 12:52:58.47575	2025-01-05 13:01:32.952703	14	12	16	Shared	SSD	Ultrabook	2 years
631f5908-93f9-421e-8567-dcae034ebfbd	HP Omen 16	1699.99	144Hz	16.1"	1920x1080	IPS	AMD Ryzen 7 6800H	Gaming	3.2GHz	NVIDIA GeForce RTX 3060	6GB	16GB	DDR4	3200MHz	t	HP	1TB	Windows 11 Home	2.4	Shadow Black	A sleek and stylish gaming laptop with impressive power and performance.	https://www.omen.com/content/dam/sites/omen/worldwide/laptops/2023-omen-16-intel/hero-1-v2-2x.png	https://www.omen.com/content/dam/sites/omen/worldwide/laptops/2022-omen-16-intel/22C1_Omen_Hendricks_16_60w_NonNumpad_1_Zone_ShadowBlack_NT_nonODD_nonFPR_CoreSet_RearLeft.png	2025-01-05 12:52:39.438373	2025-01-05 13:02:21.339758	14	8	16	GDDR6	SSD	Gaming Laptop	1 year
1b1f7c72-9f45-41ed-8277-33af8d045cd3	Gigabyte AERO 16 OLED	2399.99	60Hz	16"	3840x2400	OLED	Intel Core i9-12900HK	High-End	2.5GHz	NVIDIA GeForce RTX 3080 Ti	16GB	32GB	DDR5	4800MHz	t	Gigabyte	2TB	Windows 11 Pro	2.1	Silver	A premium laptop designed for content creators with stunning visuals and top-tier performance.	https://www.aorus.com/event/laptops/creator/assets/images/AERO-16-OLED.png	https://www.gigabyte.com/FileUpload/Global/KeyFeature/2309/innergigabyteimages/mux3.png	2025-01-05 12:52:18.671625	2025-01-05 13:03:02.813742	14	14	20	GDDR6	SSD	Creative Workstation	2 years
486d9665-84ab-4923-8cee-19be1e9d4561	Alienware x17 R2	2999.99	360Hz	17.3"	1920x1080	IPS	Intel Core i7-12800HX	Gaming	2.4GHz	NVIDIA GeForce RTX 3070 Ti	8GB	32GB	DDR5	4800MHz	t	Alienware	2TB	Windows 11 Home	3.2	Lunar Light	Cutting-edge gaming laptop with a blazing-fast 360Hz display.	https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1715939127/Croma%20Assets/Computers%20Peripherals/Laptop/Images/250603_0_t7jbb3.png	https://tech.co.za/wp-content/uploads/2022/07/laptop-alienware-x17-r2-nonlit-touchpad-gallery-7.png	2025-01-05 12:50:48.642775	2025-01-05 13:04:19.031323	14	16	24	GDDR6	SSD	Gaming Laptop	1 year
22fdc83c-f6bd-4bc5-a29a-62e02eacdf29	MSI Titan GT77	3999.99	144Hz	17.3"	3840x2160	Mini LED	Intel Core i9-13980HX	Gaming	3.5GHz	NVIDIA GeForce RTX 4090	16GB	64GB	DDR5	5600MHz	t	MSI	4TB	Windows 11 Pro	3.78	Black	Unparalleled performance for extreme gaming and creative work.	https://storage-asset.msi.com/global/picture/image/feature/nb/GT/GT77-13V/images/GT77-13V-cherry-laptop.png	https://storage-asset.msi.com/global/picture/image/feature/nb/GT/GT77/bundle-laptop-m.png	2025-01-05 12:50:37.505181	2025-01-05 13:05:08.916633	14	24	32	GDDR6	SSD	Extreme Gaming Laptop	3 years
405fc963-eaa0-4256-ad9f-1c51eea7b65d	Acer Predator Helios 300	1599.99	165Hz	15.6"	2560x1440	IPS	Intel Core i7-12700H	Gaming	2.3GHz	NVIDIA GeForce RTX 3060	6GB	16GB	DDR5	4800MHz	t	Acer	1TB	Windows 11 Home	2.3	Black	High-performance gaming laptop with a stunning 165Hz display.	https://cdn.uc.assets.prezly.com/7f2be50f-fd1c-4538-a4b3-d9f382044a8c/Triton%20300%20-%20Floating.png	https://cdn.uc.assets.prezly.com/c1c2be80-75cf-4f19-83b4-85b6c9a8b09d/PREDATOR-HELIOS-300-SpatialLabs%E2%84%A2-Edition-PH315-55s-04.png	2025-01-05 12:50:05.755646	2025-01-05 13:06:19.911948	14	14	20	GDDR6	SSD	Gaming Laptop	2 years
b9a7e060-dd07-44f9-920c-f240e1e3a672	Lenovo ThinkPad X1 Carbon Gen 10	1699.99	60Hz	14"	1920x1200	Anti-glare IPS	Intel Core i7-1265U	Business	1.8GHz	Integrated Intel Iris Xe	Shared	16GB	LPDDR4x	4266MHz	t	Lenovo	1TB	Windows 11 Pro	1.13	Black	Ultra-light business laptop with advanced security features.	https://www.lenovoarvutid.ee/wp-content/uploads/2022/05/ThinkPad_X1_Carbon_Gen_10_CT1_07.png	https://p3-ofp.static.pub/fes/cms/2023/02/07/9sfuhvon0x9fle312enou5d3cmfuxn266002.png	2025-01-05 12:49:17.992142	2025-01-05 13:07:10.976577	14	10	12	NA	SSD	Business Laptop	3 years
aee7c3b3-7e91-4461-925f-b1488a9fbdfd	HP Spectre x360 14	1549.99	60Hz	13.5"	3000x2000	OLED Touchscreen	Intel Core i7-1260P	Mobile	2.1GHz	Integrated Intel Iris Xe	Shared	16GB	LPDDR4x	4266MHz	t	HP	1TB	Windows 11 Home	1.36	Nightfall Black	Versatile 2-in-1 laptop with a stunning OLED display.	https://i.pcmag.com/imagery/articles/06lCJHnHDqf33pmyq7rFcM5-2..v1601568716.png	https://wise-tech.com.pk/wp-content/uploads/2023/04/HP-Spectre-14-x360.png	2025-01-05 12:49:01.953834	2025-01-05 13:07:57.355081	14	12	16	NA	SSD	Convertible	1 year
fe85d764-7c17-4388-8088-889cfbcb7b2b	Dell XPS 15	1899.99	60Hz	15.6"	3840x2160	IPS	Intel Core i7-12700H	High Performance	2.3GHz	NVIDIA GeForce RTX 3050 Ti	4GB	16GB	DDR5	4800MHz	t	Dell	1TB	Windows 11 Home	1.84	Silver	High-performance ultrabook with a stunning 4K display.	https://astringo-rugged.com/wp-content/uploads/2023/02/9310_9710_9520-600x600.png	https://vistaitgroup.com/pub/media/catalog/product/cache/9285745875a6e7569e051d4003ebf2cf/x/p/xps-15-9520.png	2025-01-05 12:48:42.18055	2025-01-05 13:08:43.055885	14	12	20	GDDR6	SSD	Ultrabook	2 years
aa9e593a-bb24-4e85-b962-dbada82a8439	Acer Swift 3	749.99	60Hz	14"	1920x1080	IPS	AMD Ryzen 7 5700U	Ultrabook	1.8GHz	Integrated AMD Radeon Graphics	Shared	8GB	DDR4	3200MHz	t	Acer	512GB	Windows 10 Home	1.2	Silver	Budget-friendly ultrabook with solid performance.	https://myanmartechnovation.com/wp-content/uploads/2021/03/swift3-pink-1.png	https://static1.xdaimages.com/wordpress/wp-content/uploads/2022/04/acer-swift-3-sf314-512-512t-FpBl-pure-silver-gallery-03.png	2025-01-05 12:49:29.022913	2025-01-05 12:56:25.062289	14	8	16	NA	SSD	Laptop	1 year
a7bd298d-8725-4c66-9e78-633c223f6937	Dell XPS 17 9720	2499.99	60Hz	17"	3840x2400	IPS	Intel Core i7-12700H	Ultrabook	2.3GHz	NVIDIA GeForce RTX 3050	4GB	16GB	DDR5	4800MHz	t	Dell	1TB	Windows 11 Pro	2.5	Platinum Silver	A premium ultrabook with a stunning 4K display and exceptional performance for professionals.	https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-17-9720/media-gallery/notebook-xps-17-9720-silver-gallery-3.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=658&qlt=100,1&resMode=sharp2&size=658,402&chrss=full	https://astringo-rugged.com/wp-content/uploads/2023/02/9320-600x600.png	2025-01-05 12:52:48.401642	2025-01-05 12:58:44.923839	14	14	20	GDDR6	SSD	Ultrabook	2 years
68274bd2-05cc-4783-aa7a-59f3410a5e40	Lenovo Legion 7i Pro	1899.99	240Hz	16"	2560x1600	IPS	Intel Core i7-13700H	Gaming	3.4GHz	NVIDIA GeForce RTX 4070	8GB	16GB	DDR5	5200MHz	t	Lenovo	1TB	Windows 11 Home	2.5	Storm Grey	A powerful gaming laptop with cutting-edge graphics and ultra-fast refresh rate.	https://p2-ofp.static.pub//fes/cms/2024/09/12/hdtezbo787yrezwa710a384b6d6v6x258771.png	https://p4-ofp.static.pub/fes/cms/2022/12/15/uef7zf0vtjbk6m1hqzcxvskddhvp09851403.png	2025-01-05 12:52:30.312295	2025-01-05 12:59:35.676582	14	14	20	GDDR6	SSD	Gaming Laptop	2 years
afa0ea8e-bf46-4da1-a13b-973c33ee1928	Razer Blade 14	1999.99	165Hz	14"	2560x1440	OLED	AMD Ryzen 9 6900HX	Gaming	3.3GHz	NVIDIA GeForce RTX 3070 Ti	8GB	16GB	DDR5	4800MHz	t	Razer	1TB	Windows 11 Home	1.78	Matte Black	Compact yet powerful gaming laptop for on-the-go enthusiasts.	https://assets3.razerzone.com/zCbHcNbGxjX08_GwS4jRL61QNBc=/1500x1000/https%3A%2F%2Fmedias-p1.phoenix.razer.com%2Fsys-master-phoenix-images-container%2Fhaf%2Fh7b%2F9720377704478%2Fblade14-p10-black-500x500.png	https://1.bp.blogspot.com/-4m-z4jE8NJM/WKMdm_FaEbI/AAAAAAAAcE8/sxrLIdhaS5cpCEmnFGj8WjLJ8z11Y9M0wCLcB/s1600/Razer_Blade_1_Hero_Chroma.png	2025-01-05 12:50:22.612801	2025-01-05 13:00:18.670579	14	8	16	GDDR6	SSD	Gaming Ultrabook	2 years
5b3a995a-7259-421e-ba5b-80a2ded2ac9d	Asus ROG Strix Scar 17	2899.99	240Hz	17.3"	3840x2160	IPS	AMD Ryzen 9 7945HX	Gaming	3.5GHz	NVIDIA GeForce RTX 4080	12GB	32GB	DDR5	5600MHz	t	Asus	2TB	Windows 11 Pro	3	Black with RGB accents	The ultimate gaming beast for competitive players.	https://dlcdnwebimgs.asus.com/gain/475A387F-8E63-432D-BA0C-61AA20AF1D88/w1000/h732	https://dlcdnwebimgs.asus.com/files/media/E2F08C81-7CDB-42B7-9657-C106E47C4941/v2/images/large/1x/8__design_laptop_purple.png	2025-01-05 12:50:13.465331	2025-01-05 13:00:54.42145	14	16	32	GDDR6	SSD	Gaming Laptop	1 year
07faa3b4-98ec-4606-b07f-894241aa3f27	HP Chromebook 14a	249.99	60Hz	14"	1366x768	IPS	Intel Celeron N4020	Entry-Level	1.1GHz	Intel UHD Graphics 600	Shared	4GB	LPDDR4	2400MHz	f	HP	64GB	Chrome OS	1.46	Mineral Silver	An affordable Chromebook perfect for web browsing and online learning.	https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08414508.png?impolicy=Png_Res	https://crdms.images.consumerreports.org/f_auto,w_600/prod/products/cr/models/406322-chromebooks-hp-chromebook-14a-na1083cl-10029593.png	2025-01-05 13:32:18.969837	2025-01-05 13:35:06.62391	14	2	2	Integrated	eMMC	Chromebook	1 year
9f83097f-c758-4f47-a5f9-2edab1200720	Lenovo IdeaPad 1	299.99	60Hz	14"	1366x768	TN	AMD Athlon Silver 3050U	Entry-Level	2.3GHz	AMD Radeon Integrated Graphics	Shared	4GB	DDR4	2400MHz	f	Lenovo	128GB	Windows 11 Home in S Mode	1.4	Platinum Grey	A lightweight and affordable laptop designed for basic tasks like browsing and document editing.	https://p3-ofp.static.pub/fes/cms/2021/10/25/caqm6xeo57daq7nij26glvewaqvt02706786.png	https://psrefstuff.lenovo.com/syspool/Sys/Image/IdeaPad/IdeaPad_1_14ALC7/IdeaPad_1_14ALC7_CT1_01.png	2025-01-05 13:31:52.363233	2025-01-05 13:35:50.75956	14	2	2	Integrated	SSD	Budget Laptop	1 year
9c426dbe-beb5-41ed-b7b5-ad72e910c4b3	ACER Nitro 5 AN515-57	1199.99	144 Hz	15.6 inches	1920 x 1080	IPS	 Intel® Core™ i5-11400H	Tiger Lake	4.5 GHz	NVIDIA GeForce RTX 3060	6 GB	16 GB	DDR5		f	Acer	512 GB	DOS	2.2	Black	Go full throttle with an 11th Gen Intel® Core™ i5 processor, GeForce RTX™ 30 Series GPUs1 and the high-speed IPS FHD display with 144Hz refresh and 3ms2 response. 	https://www.corpacer.com.my/wp-content/uploads/2019/12/Acer-Nitro-5-AN515-54-main.png	https://neostar.uz/upload/iblock/34e/qju6o2zj8ue3wlc0goxlpwlc5fbsd3cc.jpg	2025-01-05 14:44:48.35873	2025-01-05 14:44:48.358736	14	6	12	GDDR6	NVMe SSD	1x HDMI 3x USB 3.2 A Tüüp 1x USB 3.2 Gen 2 (Type-C) 	2 years
\.


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
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: main
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: laptops pk_laptops; Type: CONSTRAINT; Schema: public; Owner: main
--

ALTER TABLE ONLY public.laptops
    ADD CONSTRAINT pk_laptops PRIMARY KEY (id);


--
-- Name: users pk_users; Type: CONSTRAINT; Schema: public; Owner: main
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT pk_users PRIMARY KEY (id);


--
-- Name: ix_laptops_created_at; Type: INDEX; Schema: public; Owner: main
--

CREATE INDEX ix_laptops_created_at ON public.laptops USING btree (created_at);


--
-- Name: ix_users_email; Type: INDEX; Schema: public; Owner: main
--

CREATE UNIQUE INDEX ix_users_email ON public.users USING btree (email);


--
-- Name: ix_users_username; Type: INDEX; Schema: public; Owner: main
--

CREATE UNIQUE INDEX ix_users_username ON public.users USING btree (username);


--
-- Name: laptops fk_laptops_user_id_users; Type: FK CONSTRAINT; Schema: public; Owner: main
--

ALTER TABLE ONLY public.laptops
    ADD CONSTRAINT fk_laptops_user_id_users FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

