use supportportal;
drop table user;
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255),
    first_name NVARCHAR(255),
    last_name NVARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    profile_image_url VARCHAR(255),
    last_login_date DATETIME,
    last_login_date_display DATETIME,
    join_date DATETIME,
    role VARCHAR(255),
    authorities TINYBLOB,
    is_active BIT,
    is_not_locked BIT
);
DELETE FROM user
ORDER BY id DESC
LIMIT 10;


INSERT INTO user (user_id, first_name, last_name, username, password, email, profile_image_url, last_login_date, last_login_date_display, join_date, role, authorities, is_active, is_not_locked)
VALUES
('8927361045', 'John', 'Doe', 'johndoe', '$10$wZWHxEvaUmQhGU7BGu/43OOmEp1d5BR/SAfJjTVOKK/1ycufd0kvm', 'johndoe@example.com', 'http://localhost:8081/user/image/profile/johndoe', '2023-08-01 12:00:00', '2023-08-01 12:00:00', '2023-08-01 12:00:00', 'ROLE_USER', 'user:read', 1, 1),
('5724916083', 'Alice', 'Smith', 'alicesmith', '$10$wZWHxEvaUmQhGU7BGu/43OOmEp1d5BR/SAfJjTVOKK/1ycufd0kvm', 'alicesmith@example.com', 'http://localhost:8081/user/image/profile/alicesmith', '2023-08-02 12:00:00', '2023-08-02 12:00:00', '2023-08-02 12:00:00', 'ROLE_HR', 'user:read,user:update', 0, 1),
('4209857163', 'Bob', 'Johnson', 'bobjohnson', '$10$wZWHxEvaUmQhGU7BGu/43OOmEp1d5BR/SAfJjTVOKK/1ycufd0kvm', 'bobjohnson@example.com', 'http://localhost:8081/user/image/profile/bobjohnson', '2023-08-03 12:00:00', '2023-08-03 12:00:00', '2023-08-03 12:00:00', 'ROLE_MANAGER', 'user:update', 1, 0),
('1368904725', 'Eve', 'Brown', 'evebrown', '$10$wZWHxEvaUmQhGU7BGu/43OOmEp1d5BR/SAfJjTVOKK/1ycufd0kvm', 'evebrown@example.com', 'http://localhost:8081/user/image/profile/evebrown', '2023-08-04 12:00:00', '2023-08-04 12:00:00', '2023-08-04 12:00:00', 'ROLE_ADMIN', 'user:read,user:create,user:update', 0, 0),
('7659210483', 'Charlie', 'Williams', 'charliewilliams', '$10$wZWHxEvaUmQhGU7BGu/43OOmEp1d5BR/SAfJjTVOKK/1ycufd0kvm', 'charliewilliams@example.com', 'http://localhost:8081/user/image/profile/charliewilliams', '2023-08-05 12:00:00', '2023-08-05 12:00:00', '2023-08-05 12:00:00', 'ROLE_USER', 'user:update', 1, 1),
('9842635701', 'Grace', 'Lee', 'gracelee', '$10$wZWHxEvaUmQhGU7BGu/43OOmEp1d5BR/SAfJjTVOKK/1ycufd0kvm', 'gracelee@example.com', 'http://localhost:8081/user/image/profile/gracelee', '2023-08-06 12:00:00', '2023-08-06 12:00:00', '2023-08-06 12:00:00', 'ROLE_HR', 'user:read,user:update', 0, 1),
('3157092846', 'David', 'Anderson', 'davidanderson', '$10$wZWHxEvaUmQhGU7BGu/43OOmEp1d5BR/SAfJjTVOKK/1ycufd0kvm', 'davidanderson@example.com', 'http://localhost:8081/user/image/profile/davidanderson', '2023-08-07 12:00:00', '2023-08-07 12:00:00', '2023-08-07 12:00:00', 'ROLE_MANAGER', 'user:update', 1, 0),
('6078423195', 'Emma', 'Davis', 'emmadavis', '$10$wZWHxEvaUmQhGU7BGu/43OOmEp1d5BR/SAfJjTVOKK/1ycufd0kvm', 'emmadavis@example.com', 'http://localhost:8081/user/image/profile/emmadavis', '2023-08-08 12:00:00', '2023-08-08 12:00:00', '2023-08-08 12:00:00', 'ROLE_ADMIN', 'user:read,user:create,user:update', 0, 0),
('2498057316', 'Frank', 'Martin', 'frankmartin', '$10$wZWHxEvaUmQhGU7BGu/43OOmEp1d5BR/SAfJjTVOKK/1ycufd0kvm', 'frankmartin@example.com', 'http://localhost:8081/user/image/profile/frankmartin', '2023-08-09 12:00:00', '2023-08-09 12:00:00', '2023-08-09 12:00:00', 'ROLE_USER', 'user:update', 1, 1),
('9183762054', 'Helen', 'Clark', 'helenclark', '$10$wZWHxEvaUmQhGU7BGu/43OOmEp1d5BR/SAfJjTVOKK/1ycufd0kvm', 'helenclark@example.com', 'http://localhost:8081/user/image/profile/helenclark', '2023-08-10 12:00:00', '2023-08-10 12:00:00', '2023-08-10 12:00:00', 'ROLE_HR', 'user:read,user:update', 0, 1);


	