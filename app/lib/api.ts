const baseUrl =
  process.env.NEXT_PUBLIC_base_url ||
  'https://resback.sampaarsh.cloud'

function readToken() {
  if (typeof window === 'undefined') {
    return null
  }

  return localStorage.getItem('token')
}

export async function get(url: string) {
  const token = readToken()

  const response = await fetch(`${baseUrl}${url}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  })

  return response.json()
}

export async function post(url: string, body: any) {
  const token = readToken()

  const response = await fetch(`${baseUrl}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(body)
  })

  return response.json()
}

export async function patch(url: string, body: any) {
  const token = readToken()

  const response = await fetch(`${baseUrl}${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    },
    body: JSON.stringify(body)
  })

  return response.json()
}

export async function del(url: string) {
  const token = readToken()

  const response = await fetch(`${baseUrl}${url}`, {
    method: 'DELETE',
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  })

  return response.json()
}
