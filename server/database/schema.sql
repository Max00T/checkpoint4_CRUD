CREATE TABLE cds (
    id INT AUTO_INCREMENT PRIMARY KEY,
    band_name VARCHAR(255) NOT NULL,
    album_name VARCHAR(255) NOT NULL,
    release_year YEAR NOT NULL,
    cover VARCHAR(255)NULL
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cd_id INT NOT NULL UNIQUE,
    rating INT CHECK (rating BETWEEN 1 AND 5) NULL,
    review_text TEXT NULL,
    FOREIGN KEY (cd_id) REFERENCES cds(id) ON DELETE CASCADE
);


INSERT INTO cds (band_name, album_name, release_year)
values
   ('Muse', 'Showbiz', 1999),
    ('Muse', 'Origin of Symmetry', 2001),
    ('Muse', 'Absolution', 2003),
    ('Muse', 'Black Holes and Revelations', 2006),
    ('Muse', 'The Resistance', 2009),
    ('Muse', 'The 2nd Law', 2012),
    ('Muse', 'Drones', 2015),
    ('Muse', 'Simulation Theory', 2018),
    ('Muse', 'Will of the People', 2022);

INSERT INTO reviews (cd_id, rating, review_text)
values
  (1, 4, 'Un excellent début, brut et authentique.'),
    (2, 5, 'Une évolution impressionnante avec des influences classiques.'),
    (3, 5, 'des morceaux inoubliables comme Hysteria.'),
    (4, 5, 'Un album révolutionnaire avec des éléments électroniques.'),
    (5, 4, 'Un concept album puissant.'),
    (6, 4, NULL),
    (7, 4, 'Un retour aux racines rock avec un message fort.'),
    (8, 3, 'Un album divertissant mais inégal.'),
    (9, 4, 'Un mélange de tous les styles précédents de Muse.');



SELECT * FROM cds;

SELECT * FROM reviews;

SELECT * FROM cds LEFT JOIN reviews ON cds.id = reviews.cd_id;

SELECT cds.id, cds.band_name, cds.album_name, cds.release_year, reviews.rating
FROM cds
LEFT JOIN reviews ON cds.id = reviews.cd_id;

USE checkpoint4