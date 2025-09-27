const dbConfig = require('../configs/dbConfig')

const userSeeder = require('./userSeeder')

const args = process.argv.slice(2)[0]
const run = async () => {
    try {
        dbConfig()
        switch (args) {
            case 'user': {
                await userSeeder()
                break
            }
            case 'all': {
                await userSeeder()
                break
            }
            default: {
                console.log('Not match')
            }
        }
        console.log('Seeding completed')
        process.exit(0)
    } catch (error) {
        console.log('Seeding failed: ', error)
        process.exit(1)
    }
}

run()
