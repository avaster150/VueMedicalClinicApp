PGDMP         
                z           przychodnia    14.1    14.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16406    przychodnia    DATABASE     g   CREATE DATABASE przychodnia WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Polish_Poland.1250';
    DROP DATABASE przychodnia;
                postgres    false                       0    0    przychodnia    DATABASE PROPERTIES     4   ALTER DATABASE przychodnia CONNECTION LIMIT = 1000;
                     postgres    false            ?            1259    16439    Appointments    TABLE     X  CREATE TABLE public."Appointments" (
    id integer NOT NULL,
    "userId" text,
    "doctorId" text,
    "dateStart" date,
    "timeStart" text,
    status text,
    "preNotes" text,
    "postNotes" text,
    cost text,
    code text,
    "userFirstName" text,
    "userLastName" text,
    "doctorFirstName" text,
    "doctorLastName" text
);
 "   DROP TABLE public."Appointments";
       public         heap    postgres    false            ?            1259    16446    Appointments_id_seq    SEQUENCE     ?   ALTER TABLE public."Appointments" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Appointments_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    213            ?            1259    16418    Doctors    TABLE     ?   CREATE TABLE public."Doctors" (
    id integer NOT NULL,
    "firstName" text,
    "lastName" text,
    specialisation text,
    cost integer,
    description text,
    photo text,
    email text,
    password text,
    token text
);
    DROP TABLE public."Doctors";
       public         heap    postgres    false            ?            1259    16427    Doctors_id_seq    SEQUENCE     ?   ALTER TABLE public."Doctors" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Doctors_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    211            ?            1259    16407    Users    TABLE     ?   CREATE TABLE public."Users" (
    id integer NOT NULL,
    "firstName" text,
    "lastName" text,
    email text,
    password text,
    token text
);
    DROP TABLE public."Users";
       public         heap    postgres    false            ?            1259    16414    Users_id_seq    SEQUENCE     ?   ALTER TABLE public."Users" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    209            ?          0    16439    Appointments 
   TABLE DATA           ?   COPY public."Appointments" (id, "userId", "doctorId", "dateStart", "timeStart", status, "preNotes", "postNotes", cost, code, "userFirstName", "userLastName", "doctorFirstName", "doctorLastName") FROM stdin;
    public          postgres    false    213   ?       ?          0    16418    Doctors 
   TABLE DATA           ?   COPY public."Doctors" (id, "firstName", "lastName", specialisation, cost, description, photo, email, password, token) FROM stdin;
    public          postgres    false    211   ?       ?          0    16407    Users 
   TABLE DATA           V   COPY public."Users" (id, "firstName", "lastName", email, password, token) FROM stdin;
    public          postgres    false    209                     0    0    Appointments_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Appointments_id_seq"', 36, true);
          public          postgres    false    214            	           0    0    Doctors_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Doctors_id_seq"', 1, false);
          public          postgres    false    212            
           0    0    Users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Users_id_seq"', 32, true);
          public          postgres    false    210            o           2606    16445    Appointments Appointments_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Appointments"
    ADD CONSTRAINT "Appointments_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."Appointments" DROP CONSTRAINT "Appointments_pkey";
       public            postgres    false    213            k           2606    16426    Doctors Doctors_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public."Doctors"
    ADD CONSTRAINT "Doctors_email_key" UNIQUE (email);
 G   ALTER TABLE ONLY public."Doctors" DROP CONSTRAINT "Doctors_email_key";
       public            postgres    false    211            m           2606    16424    Doctors Doctors_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Doctors"
    ADD CONSTRAINT "Doctors_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Doctors" DROP CONSTRAINT "Doctors_pkey";
       public            postgres    false    211            g           2606    16416    Users Users_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);
 C   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_email_key";
       public            postgres    false    209            i           2606    16413    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    209            ?      x?????? ? ?      ?   (  x???˒?8?ux=܅?(4?6??????
?<5???5????3??*7I%?d?????*,ɥ??<?>~?M???y??? /H~?_?e???<V?_?yX$ ?x)DVY&?)d_?!
 J??0-0<?i?G?Y1'???3?mvB?Odf?;???Q?-??!q??(3y?J?V+??fj_=ξ??=??r???=?Ti??k??W?]}>#֢g?fd?weV??w?!??w?mDykE??t׷~f??0?O>g^d?=??n????Fx5??	}?u??HOݴ1wNNI@?p??6??.?޲ ??[???bJO?ҋ`?~?{?{L??????c?eSS?_5C??ų?q?]5?2I??2??0J?A??q??>?,?KB???J9z??e?͔&oukz??BO??b?i??ܸ??F????$?S?d????(??5?F??K?c??2??#?@rO?܋@Z?)X?٘???????'?????;??Q??#[??q?}?i?ͽ?t;\
)?X0>fW]?=?	????˲?@??Q??'?"??*??g?{?`?ՙ?E???`?E?9??tM??o/]w????S? "0??.?????Y?????y?d^?R?ʅzO挮?-a7B???7??륳R&N?U/RIt??S9S?'??`]"??Jp??[????$???????Y?Ʋ=??0$?\jù?X?9OU$[O(???6r=Jv????wK0?e@}e??a???ƍ????Qδbq??϶G?E??ٲ'v?	~y?-XgE?=?(?_o?^?      ?      x?????? ? ?     