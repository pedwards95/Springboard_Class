-- write your queries here
--1
SELECT * 
FROM owners 
FULL JOIN vehicles 
    ON owners.id = vehicles.owner_id;

--2
SELECT first_name, last_name, COUNT(vehicles.id) 
FROM owners 
JOIN vehicles 
    ON owners.id = vehicles.owner_id
GROUP BY owners.id 
ORDER BY first_name;

--3
SELECT first_name, last_name, ROUND(SUM(price)/COUNT(vehicles.id)) AS "average_price", COUNT(vehicles.id) 
FROM owners 
JOIN vehicles 
	ON owners.id = vehicles.owner_id 
GROUP BY owners.id
HAVING COUNT(vehicles.id) > 1 AND SUM(price)/COUNT(vehicles.id) > 10000
ORDER BY first_name DESC;