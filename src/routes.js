export const routes = [
    {
        method:'GET',
        path : ' /tasks',
        handler :(request,response)=>{

        }
    },
    {
        method:'POST',
        path : '/tasks',
        handler :(request,response)=>{
            return response.writeHead(204).end()
        }
    },
    {
        method:'DELETE',
        path : '/tasks/:id',
        handler :(request,response)=>{
            return response.writeHead(204).end()
        }
    },
    {
        method:'PATCH',
        path : '/tasks/:id/complete',
        handler :(request,response)=>{
            return response.writeHead(204).end()
        }
    },
    {
        method:'PUT',
        path : '/tasks/:id',
        handler :(request,response)=>{
            return response.writeHead(204).end()
        }
    }
]