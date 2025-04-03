CREATE TABLE cds (
    id INT AUTO_INCREMENT PRIMARY KEY,
    band_name VARCHAR(255) NOT NULL,
    album_name VARCHAR(255) NOT NULL,
    release_year YEAR NOT NULL,
    cover VARCHAR(255) NULL
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cd_id INT NOT NULL UNIQUE,
    rating INT CHECK (rating BETWEEN 1 AND 5) NULL,
    review_text TEXT NULL,
    FOREIGN KEY (cd_id) REFERENCES cds(id) ON DELETE CASCADE
);


INSERT INTO cds (band_name, album_name, release_year, cover)
values
   ('Muse', 'Showbiz', 1999,'https://i.redd.it/yn4uzad9enzc1.jpeg'),
    ('Muse', 'Origin of Symmetry', 2001, 'https://upload.wikimedia.org/wikipedia/en/3/35/Muse_-_Origin_of_Symmetry_cover_art.png'),
    ('Muse', 'Absolution', 2003, 'https://upload.wikimedia.org/wikipedia/en/b/b4/Muse_-_Absolution_Cover_UK.jpg'),
    ('Muse', 'Black Holes and Revelations', 2006, 'https://upload.wikimedia.org/wikipedia/en/c/c5/BlackHolesCover.jpg'),
    ('Muse', 'The Resistance', 2009, 'https://upload.wikimedia.org/wikipedia/en/8/8a/Theresistance.jpg'),
    ('Muse', 'The 2nd Law', 2012, 'https://upload.wikimedia.org/wikipedia/en/3/35/Muse_2nd_law.jpg'),
    ('Muse', 'Live at Rome Olympic Stadium', 2013, 'https://upload.wikimedia.org/wikipedia/en/0/0e/Muse_-_Rome_Olympic_Stadium.jpg'),
    ('Muse', 'Drones', 2015, 'https://upload.wikimedia.org/wikipedia/en/4/44/MuseDronesCover.jpg'),
    ('Muse', 'Simulation Theory', 2018, 'https://upload.wikimedia.org/wikipedia/en/e/e1/Simulation_Theory_%28album%29.jpg'),
    ('Muse', 'Will of the People', 2022, 'https://upload.wikimedia.org/wikipedia/en/1/12/Muse_-_Will_of_the_People.png'),
    ('Foo Fighters', 'Foo Fighters', 1995, "https://m.media-amazon.com/images/I/712hEF1WDJL._AC_UY436_FMwebp_QL65_.jpg"),
    ('Foo Fighters', 'The Colour and the Shape', 1997, NULL),
    ('Foo Fighters', 'There Is Nothing Left to Lose', 1999, 'https://upload.wikimedia.org/wikipedia/en/8/8b/Foo_Fighters_-_There_Is_Nothing_Left_to_Lose.jpg'),
    ('Foo Fighters', 'One by One', 2002, 'https://m.media-amazon.com/images/I/61BP5VG22VL._UF1000,1000_QL80_.jpg'),
    ('Foo Fighters', 'In Your Honor', 2005, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjphdApUnwav5-JTQIC1-LG-FD8cd2w8KPhgNxGvoSPhspyCrM98m3E60__IsFxntTZmU&usqp=CAU'),
('Red Hot Chili Peppers', 'Californication', 1999, 'https://m.media-amazon.com/images/I/81TnWHafWdL._SX522_.jpg'),
    ('Red Hot Chili Peppers', 'By the Way', 2002, 'https://m.media-amazon.com/images/I/81RM+S0I9wL._SX522_.jpg');
    
INSERT INTO reviews (cd_id, rating, review_text)
values
    (1, 4, 'Un excellent début, brut et authentique.'),
    (2, 5, 'Une évolution impressionnante avec des influences classiques.'),
    (3, 5, 'des morceaux inoubliables comme Hysteria.'),
    (4, 5, 'Un album révolutionnaire avec des éléments électroniques.'),
    (5, 4, 'Un concept album puissant.'),
    (6, 4, NULL),
    (7, 5, 'Un concert époustouflant avec une grande énergie.'),
    (8, 4, 'Un album solide avec des morceaux mémorables.'),
    (9, 3, 'Un album qui manque de cohérence.'),
    (10, 5, 'Une œuvre d''art avec des thèmes profonds.'),
    (11, 4, 'Un bon mélange de rock et de mélodies.'),
    (12, 5, 'Un album qui a marqué une génération.'),
    (13, 3, 'Un album correct mais pas à la hauteur des précédents.'),
    (14, 4, 'Un album ambitieux avec des morceaux épiques.'),
    (15, 5, 'Un album qui mélange rock et acoustique.'),
    (16, 5, 'Un album qui mélange rock et acoustique.'),
      (17, 5, 'Un album qui mélange rock et acoustique.');
    

    



SELECT * FROM cds;

SELECT * FROM reviews;

SELECT * FROM cds LEFT JOIN reviews ON cds.id = reviews.cd_id;

SELECT cds.id, cds.band_name, cds.album_name, cds.release_year, reviews.rating
FROM cds
LEFT JOIN reviews ON cds.id = reviews.cd_id;

USE checkpoint4