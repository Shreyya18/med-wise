-> To start Backend server

``` 
cd backend
python app.py
```

-> To start frontend

```
cd frontend
npm start
```

-> To use sql

```
cd backend
sqlite3 medwise.db
(If it opens successfully, you'll see: sqlite>)

sqlite> .tables
SELECT id, username FROM users;
```