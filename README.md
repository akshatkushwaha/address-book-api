# ADDRESS BOOK API

## 💾 Database schemas

#### Contact schema

| **Field** | **Type** | **Required** | **Unique** | **Default** |
| --------- | -------- | ------------ | ---------- | ----------- |
| firstName | String   | True         | False      | -           |
| LastName  | String   | Flase        | False      | -           |
| email     | String   | False        | False      | -           |
| adress    | String   | False        | False      | -           |
| tel       | String   | False        | False      | -           |

## 🌍 APIs

| Method | Route                 | Parameters | Query parameters         | Body                                                                                 | Description                            |
| ------ | --------------------- | ---------- | ------------------------ | ------------------------------------------------------------------------------------ | -------------------------------------- |
| GET    | /api/v1/auth/login    | -          | -                        | {username: String, Password: String}                                                 | Login and get token                    |
| GET    | /api/v1/auth/register | -          | -                        | {username: String, Password: String}                                                 | Register and get token                 |
| GET    | /api/v1/book          | -          | {page, limit}            | -                                                                                    | Get paginated list of contacts         |
| GET    | /api/v1/person/id     | {id}       | -                        | -                                                                                    | Get single contact by using its ID     |
| GET    | /api/v1/book/query    | -          | {name, address, contact} | -                                                                                    | Get contacts by using query parameters |
| POST   | /api/v1/book/         | -          | -                        | {firstName: String, lastName: String, address: String, tel: String, email: String}   | Create new single contact              |
| POST   | /api/v1/book/bulk     | -          | -                        | [{firstName: String, lastName: String, address: String, tel: String, email: String}] | Create bulk contacts                   |
| PATCH  | /api/v1/person/id     | {id}       | -                        | {firstName: String, lastName: String, address: String, tel: String, email: String}   | Update existing contact details        |
| DELETE | /api/v1/person/id     | {id}       | -                        | {firstName: String, lastName: String, address: String, tel: String, email: String}   | Delete existing contact                |

## 🛠 Installation and setup

1. Clone the repo to your local machine.
2. Install the required dependency for server using :

   ```javascript
   npm install
   ```

3. Create a .env file inside the root folder and provide the following environment variables:

   ```env
   PORT=<port>
   MONGODB_URI=<mongo_uri>
   SECRET=<jwt_secret>
   ```

4. Start the dev server using :

   ```javascript
   npm start
   ```
