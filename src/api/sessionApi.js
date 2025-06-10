import axios from 'axios';

const BASE_URL = 'http://localhost:8086';

export const getSessionsByTime = async (start, end, companyId) => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/session/by-period-of-time`,
    {
      params: {
        companyId,
        start,
        end,
      },
    },
  );
  return response.data;
};

export const getSessionsByCompanyId = async companyId => {
  const response = await axios.get(`${BASE_URL}/api/v1/session/by-companyId`, {
    params: {companyId},
  });
  return response.data;
};

export const getSessionDatesBySessionId = async sessionId => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/session-date/by-session-id/${sessionId}`,
  );
  return response.data;
};
