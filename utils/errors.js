export const convertError = (err) => {
    if (err.name === 'ValidationError') {
        return err
    }

    if (err.name === 'BadRequest') {
        const path = Object.keys(err.errors)[0]
        const message = err.errors[path].message

        return { path, message }
    }

    // eslint-disable-next-line
  console.error('Unkown error type', err)
    return { path: 'unkown', message: err.message }
}
