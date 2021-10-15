# eComm-back

## Instructions: ```npm i + npm start```

## Testing: ```npm test```

### Register a user: 
POST: ```http://localhost:3000/user/register```
BODY: 
```
{
    "name": "TaniEis",
    "email": "tani@tani.com",
    "password": "Tani654321"
}
```

### Login a user: 
POST: ```http://localhost:3000/user/login```
BODY: 
```
{
    "email": "tani@tani.com",
    "password": "Tani654321"
}
```

### Watches
- Insert new watches: POST: ```http://localhost:3000/watches/:userId```
- User Id example: 6169c7c65608f6a48daaaaf6

```
{
     "watch_id": "004",
      "name": "Casio",
      "price": 30,
      "discount_qty": 1,
      "discount_percentage": 0
}
```
Checkout:
POST: ```http://localhost:3000/watches/checkout```
BODY: 
```
["001","002","003","002","003", "004","001" ...]
```
Clear Cart:
- GET: ```http://localhost:3000/watches/clear```