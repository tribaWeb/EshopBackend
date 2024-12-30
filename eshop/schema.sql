-- PostgreSQL database dump

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2024-12-30 10:57:14

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';
SET default_table_access_method = heap;

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    price numeric(10,2) NOT NULL
);

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);

INSERT INTO public.products (id, name, description, price)
VALUES 
    (1, 'Produkt 1', 'Popis produktu 1', 99.99),
    (2, 'Produkt 2', 'Popis produktu 2', 199.99),
    (3, 'Produkt 3', 'Popis produktu 3', 299.99);
Tento příkaz přidá tři řádky do tabulky products.
-- Completed on 2024-12-30 10:57:14
