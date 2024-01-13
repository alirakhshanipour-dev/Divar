import { config } from 'dotenv'
config()
// !important! 
// you need to install the following libraries |express|[dotenv > if required]
// or run this command >> npm i express dotenv 

export const ServerConfig = (() => {
    class ServerConfig {
        #port
        constructor() {
            this.#port = process.env.PORT
        }

        run(app) {
            app.listen(this.#port, () => {
                console.log('-> Server is up and running on port : ' + this.#port);
            })
        }
    }
    return new ServerConfig()
})()