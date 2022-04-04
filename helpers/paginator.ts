export const nextOffset = (count: number, limit: number, offset: number) => {
    if ((offset + limit) >= count) {
        return null
    } else {
        return offset + limit
    }
}

export const previousOffset = (count: number, limit: number, offset: number) => {
    if (offset <= 0) {
        return null
    } else {
        return Math.max(0, (offset - limit))
    }
}