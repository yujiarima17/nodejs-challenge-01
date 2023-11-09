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
    #existsInstance = function (table,id){
       const exists = this.#database[table].findIndex(row=>row.id === id)
       if(exists > -1){
        return true;
       }
       else{
        return false;
       }
    }
    #persist(){
        fs.writeFile(databasePath,JSON.stringify(this.#database))
    }
    select(table,search){
       let data = this.#database[table] ?? []
       if(search){
        console.log('entrei')
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
           const {title,description} = {data}
           if(title && description){
            this.#database[table][rowIndex] = {id,...data}
           }
           if(title){
            this.#database[table][rowIndex] = {id,title}
           }
           if(description){
            this.#database[table][rowIndex = {id,description}]
           }
           
           this.#persist()
        }
  
     }
     updateCompleteState(table,id,date){ 
        const rowIndex= this.#database[table].findIndex(row=>row.id === id)
        const {completed_at} = this.#database[table][rowIndex]
        if(rowIndex> -1){
          if(completed_at){
            this.#database[table][rowIndex]['completed_at']= date
          }
          else{
            this.#database[table][rowIndex]['completed_at'] = null
          }
     }}
}