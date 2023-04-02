--CREATE AUTHOR TABLE--
CREATE TABLE authors (
  email varchar(100) NOT NULL UNIQUE PRIMARY KEY,
  fullname varchar(45) NOT NULL, 
  password varchar(45) NOT NULL
)

--CREATE ENTRIES TABLE --
CREATE TABLE entries (
  id_entry serial NOT NULL PRIMARY KEY, 
  title varchar(100) NOT NULL UNIQUE, 
  extract varchar(100) NOT NULL,
  content text NOT NULL, 
  image varchar(255),
  date date DEFAULT CURRENT_DATE,
  email varchar(100) NOT NULL,
  category varchar(15),
  FOREIGN KEY (email) REFERENCES authors(email)
);

--CREATE ENTIES IN AUTHORS TABLE (test data) ==NOT REQUIRED
INSERT INTO authors(fullname,email,password)
VALUES
('ana cleta','ana@correo.es','123456'),
('jose garcia','jose@correo.es','123457'),
('juan torneo','jean@correo.es','123466'),
('isa gomez','isa@correo.es','124457')


--CREATE ENTRY FOR ENTRIES -TEST DATA 

INSERT INTO entries(title,content,extract, image, email, category)
VALUES 
('Noticia: Un panda suelto por la ciudad', 'El panda se comió todas las frutas de una tienda','extract Noticia 2', 'image 2', 'isa@correo.es','Sucesos')