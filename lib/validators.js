const validate = (schema, property) => {
    return (req, res, next) => {
        const arguments = {...req.body || null, ...req.params || null, ...req.query}
        console.log('Entering Validation', { arguments })
        const { error } = schema.validate(arguments)

        if (error) {
            res.error(error)
        }
        else {
            next()    
        }
    }
}

module.exports = {
validate
}