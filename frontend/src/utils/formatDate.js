export const formatDate = (d) => {
    const date = new Date(d)
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
}
