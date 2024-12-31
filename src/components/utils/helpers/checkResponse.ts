import getStatusMessage from "./getStatusMessage";


 const checkResponse = async (response: Response) => {
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${getStatusMessage(response.status)}`);
    }
    return await response.json();
}

export default checkResponse;