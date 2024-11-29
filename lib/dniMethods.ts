import { DniRespose } from "./models/DniResponse";

export async function fetchDni(dni: string): Promise<DniRespose> {
  const url = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer apis-token-11886.x1AuDbtWASwK0ALrzq7rT99JXw6puJk2",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data as DniRespose;
}
