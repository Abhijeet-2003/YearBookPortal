export const fetchGraphData = (endpoint, accessToken) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers,
    }

    return fetch(endpoint, options)
    .then(response => response.json())
    .catch(e => console.log(e));
}
