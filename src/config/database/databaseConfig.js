import mongoose from 'mongoose';
import { config } from 'dotenv';
config()

export const DatabaseConfig = (() => {
    class DatabaseConfig {
        #db_uri
        #db_name
        constructor() {
            this.#db_name = process.env.DB_NAME
            this.#db_uri = process.env.DB_URI
        }
        connect_mongo() {
            mongoose.connect(this.#db_uri, { dbName: this.#db_name }).then(() => {
                console.log('connected to database');
            }).catch(error => {
                console.log(error);
            })
        }
    }
    return new DatabaseConfig()
})()