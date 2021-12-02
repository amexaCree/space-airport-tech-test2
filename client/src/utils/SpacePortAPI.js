
const api = "http://localhost:4000"

const headers = {
    'Accept': 'application/json'
}

export const GetCapsules = () => fetch(`${api}/capsules`, { headers })
        .then(res => res.json())
        .then(data => data)


export const GetLandPad = (id) => fetch(`${api}/landpads`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
    })
    .then(res => res.json())
    .then(data => data)