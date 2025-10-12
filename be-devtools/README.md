//dependencies
express cors sequelize pg pg-hstore dotenv
npm install --save-dev nodemon

- npm install
- docker-compose up -d
- npm run dev

goood-comfy-snappy-likes


- check: stripe listen
- stripe listen --forward-to localhost:3000/webhook
- stripe trigger checkout.session.completed
- 4242424242424242

STEP 1 -backup db
----------------------
PGPASSWORD='mypassword' \
pg_dump -h localhost \
        -p 5435 \
        -U postgres \
        -d devtoolsDB \
        -F c \
        -f ~/backup/devdb$(date +%Y-%m-%d).bak

- start pgadmin + postgres first


STEP 2: Copy .bak to Docker container #localhost to postgres
-------------------------------------
docker cp ~/backup/dev_db_2025-10-10.bak postgres_container:/tmp/dev_db.bak

Note: Overwrites if the filename already exists.


STEP 3: Access the container
-----------------------------
docker exec -it postgres_container bash



STEP 4: (Optional) Drop & recreate database
-------------------------------------------
dropdb -U postgres COREDB
createdb -U postgres COREDB

STEP 5: Restore(import to db) the backup
---------------------------
pg_restore -U postgres -d COREDB -v /tmp/dev_db.bak


Verify Tables(check)
-------------
psql -U postgres -d COREDB -c "\dt"