import {Task} from './task.js'
import {randomUUID} from 'node:crypto'
import {Database} from './database.js'
import { buildRoutePath } from './utils/build-route-path.js';
const database = new Database()
const idErrorMessage = 'There is no record with this ID in the database.'
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
            const {title,description} = request.body;
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
    },
    {
        method:'DELETE',
        path : buildRoutePath('/tasks/:id'),
        handler :(request,response)=>{
            const {id}= request.params
            const existId= database[table].findIndex(row=>row.id === id)
            if(existId> -1){
                database.delete('tasks',id)
                return response.writeHead(204).end()
            }
            else{
                return response.writeHead(400,idErrorMessage ).end()
           }
        }
    },
    {
        method:'PATCH',
        path : buildRoutePath('/tasks/:id/complete'),
        handler :(request,response)=>{
            const {id} = request.params
            const existId= database[table].findIndex(row=>row.id === id)
            if(existId > -1){
                database.updateCompleteState('tasks',id)
                return response.writeHead(204).end()
            }
            else{
                return response.writeHead(400,idErrorMessage ).end()
           }
            }
        },
    {
        method:'PUT',
        path : buildRoutePath('/tasks/:id'),
        handler :(request,response)=>{
            const {id} = request.params
            const existId= database[table].findIndex(row=>row.id === id)
            if(existId > -1){
                database.update('tasks',id,data)
                return response.writeHead(204).end()
            }
            else{
                return response.writeHead(400,idErrorMessage ).end()
           }
        }
    }
]