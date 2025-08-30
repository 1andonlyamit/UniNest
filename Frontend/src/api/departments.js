const BASE_URL = 'http://localhost:8888'

// Create a new department
export async function createDepartmentApi(departmentData) {
  const res = await fetch(`${BASE_URL}/university/departments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(departmentData)
  })
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to create department')
  }
  
  const data = await res.json()
  return data
}

// Update a department
export async function updateDepartmentApi(id, departmentData) {
  const res = await fetch(`${BASE_URL}/university/departments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(departmentData)
  })
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to update department')
  }
  
  const data = await res.json()
  return data
}

// Delete a department
export async function deleteDepartmentApi(id) {
  const res = await fetch(`${BASE_URL}/university/departments/${id}`, {
    method: 'DELETE'
  })
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to delete department')
  }
  
  const data = await res.json()
  return data
}

// Create a new sub-department
export async function createSubDepartmentApi(subDepartmentData) {
  const res = await fetch(`${BASE_URL}/university/subdepartments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subDepartmentData)
  })
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to create sub-department')
  }
  
  const data = await res.json()
  return data
}

// Update a sub-department
export async function updateSubDepartmentApi(id, subDepartmentData) {
  const res = await fetch(`${BASE_URL}/university/subdepartments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subDepartmentData)
  })
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to update sub-department')
  }
  
  const data = await res.json()
  return data
}

// Delete a sub-department
export async function deleteSubDepartmentApi(id) {
  const res = await fetch(`${BASE_URL}/university/subdepartments/${id}`, {
    method: 'DELETE'
  })
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to delete sub-department')
  }
  
  const data = await res.json()
  return data
}

// Create a new class
export async function createClassApi(classData) {
  const res = await fetch(`${BASE_URL}/university/classes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(classData)
  })
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to create class')
  }
  
  const data = await res.json()
  return data
}

// Update a class
export async function updateClassApi(id, classData) {
  const res = await fetch(`${BASE_URL}/university/classes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(classData)
  })
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to update class')
  }
  
  const data = await res.json()
  return data
}

// Delete a class
export async function deleteClassApi(id) {
  const res = await fetch(`${BASE_URL}/university/classes/${id}`, {
    method: 'DELETE'
  })
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to delete class')
  }
  
  const data = await res.json()
  return data
}

// Get all departments
export async function getDepartmentsApi() {
  const res = await fetch(`${BASE_URL}/university/departments`)
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to fetch departments')
  }
  
  const data = await res.json()
  // The API returns the array directly, not wrapped in a data property
  return { data: data }
}

// Get all sub-departments
export async function getSubDepartmentsApi() {
  const res = await fetch(`${BASE_URL}/university/subdepartments`)
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to fetch sub-departments')
  }
  
  const data = await res.json()
  // The API returns the array directly, not wrapped in a data property
  return { data: data }
}

// Get all classes
export async function getClassesApi() {
  const res = await fetch(`${BASE_URL}/university/classes`)
  
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to fetch classes')
  }
  
  const data = await res.json()
  // The API returns the array directly, not wrapped in a data property
  return { data: data }
}
