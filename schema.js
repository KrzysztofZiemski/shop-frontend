
class Validate {
    constructor() {
        this.schemaProduct = {
            name: undefined,
            description: undefined,
            tags: [],
            price: undefined,
            count: undefined,
            image: undefined,
        }
        this.schemaUser = {
            login: undefined,
            password: undefined,
            mail: undefined,
            category: undefined,
            historyTransactions: [],
            activeBasket: "",
            dateLastLogin: new Date(),
            countIncorrectLogin: 0,
            permission: "user"
        }
    }

    validateProduct(product) {

        return new Promise((resolve, reject) => {
            const validateItem = { ...this.schemaProduct, ...product };
            let isCorrect = true;
            for (let item in validateItem) {
                if (validateItem[item] === undefined) isCorrect = false;
            }
            if (isCorrect) resolve(validateItem)
            reject('not enough properties')
        })
    }

    validateUser(user) {
        return new Promise((resolve, reject) => {
            const validateUser = { ...this.schemaUser, ...user };
            let isCorrect = true;
            for (let user in validateUser) {
                if (validateUser[user] === undefined) isCorrect = false;
            }
            if (isCorrect) resolve(validateUser)
            reject('not enough user informations')
        })
    }
}


module.exports = Validate;