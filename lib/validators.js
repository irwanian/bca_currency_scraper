const validate = (schema, property) => {
    return (req, res, next) => {
        const params = {...req.body || null, ...req.params || null, ...req.query}
        console.log('Entering Validation', { params })
        const { error } = schema.validate(params)

        if (error) {
            res.error(error)
        }
        next()    
    }
}

module.exports = {
validate
}