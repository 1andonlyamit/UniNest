const BASE_URL = 'http://localhost:8888';

// Get all companies
export async function fetchCompanies(university_id) {
  const res = await fetch(`${BASE_URL}/university/companies?university_id=${university_id}`);
  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to fetch companies');
  }

  const data = await res.json();
  // Assuming API returns array directly
  return { data: data };
}

// Invite a new company
export async function inviteCompany(payload) {
  const res = await fetch(`${BASE_URL}/university/company/invite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to invite company');
  }

  const data = await res.json();
  return data;
}
