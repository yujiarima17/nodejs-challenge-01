export async function json(request,response){
    const buffers = []

    for(const chunk of request){
        buffers.push(chunk)
    }
    try{
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    }
    catch(e){
        req.body = null
    }

    response.setHeader('Content-Type','application/json')
}