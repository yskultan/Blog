export const updateObject = (oldObject, updatedObject) => {
    return {
        ...oldObject,
        ...updatedObject
    }
}

export function tokenHeader() {
    const token = localStorage.getItem('token');
    if (token)
        return {
            headers: {
                Authorization: `JWT ${token}`
            }
        };

    return {}
}