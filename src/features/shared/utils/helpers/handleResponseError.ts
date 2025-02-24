const handleResponseError = async (response: Response) => {
  if (!response.ok) {
    const resp = await response.json();
    throw new Error(`${resp.status} - ${resp.details}`);
  }
};

export default handleResponseError;
