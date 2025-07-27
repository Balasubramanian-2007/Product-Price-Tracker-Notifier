-- written using POSTGRE SQL , just for remebering 

CREATE TABLE userTable(
	user_id VARCHAR(20) UNIQUE,
	name VARCHAR(50),
	email_id VARCHAR(30),
	password VARCHAR(100),
	PRIMARY KEY(user_id)
);

CREATE TABLE notificationTable(
	sno SERIAL PRIMARY KEY,
	user_id VARCHAR(20),
	product_name VARCHAR(100),
	product_url TEXT,
	old_price VARCHAR(20),
	datex DATE,
	FOREIGN KEY(user_id) REFERENCES userTable(user_id)
);