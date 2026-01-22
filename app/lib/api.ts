const baseUrl = process.env.NEXT_PUBLIC_base_url as string ||  'https://resback.sampaarsh.cloud';


function getToken() {
  if (typeof window === 'undefined') 
    {
      return null
      
    }
  return localStorage.getItem('token')
}

export async function get(url:String){
  const token = getToken();

  const res= await fetch (`${baseUrl}${url}`, {
    headers: {
      Authorization: token ?`Bearer ${token}`:''}})
      return res.json()
}


export async  function post (url:string,body:any){
  const token = getToken()

  const res = await fetch (`${baseUrl}${url}`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization':token ?`Bearer ${token}`:''
    }
    ,
    body:JSON.stringify(body)
})
return res.json()
}

export async function patch(url:string,body:any){
  const token =  getToken()

  const res = await fetch(`${baseUrl}${url}`,{
    method:'PATCH',
    headers:{
      'Content-Type':'application/json',
        'Authorization':token ?`Bearer ${token}`:''
    }
    ,body:JSON.stringify(body)
  })
  return res.json()
}



export async function del(url:String){
  const token = getToken();

  const res= await fetch (`${baseUrl}${url}`, {
    method:'DELETE',
    headers: {
      Authorization: token ?`Bearer ${token}`:''}})
      return res.json()
}
