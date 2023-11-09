import fs from 'node:fs/promises';

const databasePath = new URL('../db.json',import.meta.url)

export class Database {
    #database = {}
    constructor(){
        fs.readFile(databasePath,'utf-8').then(data =>{
            this.#database = JSON.parse(data);
        }).catch(()=>{
           this.#persist()
        })
    }
    #persist(){
        fs.writeFile(databasePath,JSON.stringify(this.#database))
    }
    select(table,search){
       let data = this.#database[table] ?? []
       const notEmptySearch = Object.keys(search).length!=0
       if(notEmptySearch){
        data = data.filter((row)=>{
            return Object.entries(search).some(([key,value])=>{
                return row[key].toLowerCase().includes(value.toLowerCase())
            })
        })
       }
       return data
    }
    insert(table,data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }
        else{
            this.#database[table] = [data]
        }
        this.#persist()
        return data;
    }
    delete(table,id){
        const rowIndex = this.#database[table].findIndex(row=>row.id === id)
        if(rowIndex > -1){
            this.#database[table].splice(rowIndex,1)
            this.#persist()
        }
    } 
    update(table,id,data){
        const rowIndex= this.#database[table].findIndex(row=>row.id === id)
        if(rowIndex > -1){
           const {title,description} = data
           const updateDate = Date.now()
           const databaseInstance = this.#database[table][rowIndex];
           if(title && description){
            this.#database[table][rowIndex] = {...databaseInstance,title,description,updated_at:updateDate}
            this.#persist()
           }
           else if(title){
            this.#database[table][rowIndex] = {...databaseInstance,title,updated_at : updateDate}
            this.#persist()
           }
           else if(description){
            this.#database[table][rowIndex] = {...databaseInstance,description,updated_at : updateDate}
            this.#persist()
           }
           else{
            this.#persist()
           }
        }
     }
     updateCompleteState(table,id){ 
        const rowIndex= this.#database[table].findIndex(row=>row.id === id)
        if(rowIndex> -1){
            const completedDate = Date.now()
            let completeState =  this.#database[table][rowIndex].completed_at 
            const isNotCompleted = completeState == null
            if(isNotCompleted){
                this.#database[table][rowIndex].completed_at = completedDate
                this.#persist()
            }
            else{
                this.#database[table][rowIndex].completed_at  = null
                this.#persist()
            }
            
     }}
}