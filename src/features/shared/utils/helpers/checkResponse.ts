const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const resp = await response.json()
    throw new Error(`${resp.details}`);
  }
  return await response.json();
};

export default checkResponse;
