import {Task} from './task.js'
import {randomUUID} from 'node:crypto'
import {Database} from './database.js'
import { buildRoutePath } from './utils/build-route-path.js';
const database = new Database()
function verifyBodyProps(requestBody){
  
    if(requestBody ==null){
      return {isInvalid:true,errorMessage : 'Its necessary to provide title or/and description'}
    }
    else{
      const {title,description,...invalidProps} = requestBody
      if(invalidProps){
          return {isInvalid: true,errorMessage : 'Its only necessary to provide a title or/and description'}
      }
      else{
          return {isInvalid : false,errorMessage:''}
      }
    }
  }
export const routes = [
    
    {
        method:'GET',
        path : buildRoutePath('/tasks'),
        handler :(request,response)=>{
           const search = request.query
           const tasks = database.select('tasks', search?? {
            title: search.title,
            description:search.description,
           });
           return response.end(JSON.stringify(tasks));
        }
    },
    {
        method:'POST',
        path : buildRoutePath('/tasks'),
        handler :(request,response)=>{
            const data= request.body;
            console.log(data)
            const verifyProps = verifyBodyProps(data);

            if(verifyProps.isInvalid){
                return response.writeHead(400,verifyProps.errorMessage).end()
            }
            else{
                const task = new Task(
                    randomUUID(),
                    title,
                    description,
                     null,
                    Date.now(),
                     null
                    )
                    database.insert('tasks',task);
                return response.writeHead(204).end()
            }
            
            
        }
    },
    {
        method:'DELETE',
        path : buildRoutePath('/tasks/:id'),
        handler :(request,response)=>{
            const {id}= request.params
            database.delete('tasks',id)
            return response.writeHead(204).end()
        }
    },
    {
        method:'PATCH',
        path : buildRoutePath('/tasks/:id/complete'),
        handler :(request,response)=>{
            const {id} = request.params
            database.updateCompleteState('tasks',id)
            return response.writeHead(204).end()
        }
    },
    {
        method:'PUT',
        path : buildRoutePath('/tasks/:id'),
        handler :(request,response)=>{
            const {id}= request.params
            const data = request.body
            database.update('tasks',id,data)
            return response.writeHead(204).end()
        }
    }
]
