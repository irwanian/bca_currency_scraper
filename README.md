# bca_currency_scraper
A currency scraper from BCA currency info, using tech stacks:
* Node.js and Express as a server
* MySQL as a database service
* Sequelize as an ORM helper
* cheerio as a web scraper
* Joi as a data input validator
* Mocha chai and nyc as a testing and reporting library


## BCA Currency Scraper Documentation

1.	Create .env file in the root directory, then provide credentials to connect to mysql database in .env file.
2.	Credentials needed:
-	DB_NAME : insert database name
-	DB_USER : insert database username
-	DB_PASSWORD : insert database password
-	DB_HOST : insert database host
-	DB_PORT : insert database port
3.	Run “npm install” on terminal to install all required dependencies.
4.	Run Application by entering command “npm start” on terminal, then application will run on http://localhost:7000.
5.	If the database connection established, it will automatically create table “currencies” (if doesn’t exist) after application started.
6.	To run test cases, enter command “npm test” on terminal.

Routing:
1.	GET http://localhost:7000/api/indexing
-	It will directly scrape currency data from BCA website.
-	If data with certain symbol and currency date don’t exist, it will bulk insert currency records to database.
-	If data partially exist, it will only insert non-existing data (e.g., existing currency data in the database doesn’t have USD, and JPY data on scraped currency date, it will only insert USD and JPY data on that date).
-	If all data exist, it will just return the existed data without inserting new record to database.

2.	DELETE 
http://localhost:7000/api/kurs/:date	
-	If exist, it will delete all record on desired date.
-	If no record found on the desired date, it will return 404.
-	Date format must be YYYY-MM-DD.

3.	GET http://localhost:7000/api/kurs?startdate=:startdate&enddate=:enddate
-	It will return all records ranging between start date and end date.
-	 startdate and enddate format must be YYYY-MM-DD.
-	If no record found it will return 404.

4.	GET http://localhost:7000/api/kurs/:symbol?startdate=:startdate&enddate=:enddate
-	It will return all records with specific symbol ranging between start date and end date.
-	Symbol must be 3 uppercase letters.
-	If no record found it will return 404.

5.	POSThttp://localhost:7000/api/kurs
-	API receive request body in JSON format:
{
	"symbol": "PLG",
	"e_rate": {
		"jual": 3803.55,
		"beli": 377355
	},
	"tt_counter": {
		"jual": 3803.55,
		"beli": 377355
	},
	"bank_notes": {
		"jual": 3803.55,
		"beli": 377355
	},
	"date": "2021-02-02"
}
-	If data doesn’t exist (based on symbol and date), it will insert a new record to database, and returning inserted record.
-	If data exists, it will return 400.
-	Property “jual” and “beli” must contain a value of float greater than or equal 0.
-	Date format must be YYYY-MM-DD.
-	Symbol must be 3 uppercase letters.

6.	PUT http://localhost:7000/api/kurs
- API receive request body in JSON format:
{
	"symbol": "PLG",
	"e_rate": {
		"jual": 2803.55,
		"beli": 277355
	},
	"tt_counter": {
		"jual": 2803.55,
		"beli": 277355
	},
	"bank_notes": {
		"jual": 2803.55,
		"beli": 277355
	},
	"date": "2021-02-02"
}
- If data exists (based on symbol and date), it will update record from database, and returning updated record.
- If data doesn’t exist, it will return 400.
-	Property “jual” and “beli” must contain a value of float greater than or equal 0.
-	Date format must be YYYY-MM-DD.
-	Symbol must be 3 uppercase letters.

