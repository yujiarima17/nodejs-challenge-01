export class Task{
    id 
    title
    description
    completed_at
    created_at 
    updated_at 
    constructor(id, title, description, completed_at, created_at, updated_at){
        this.id =id;
        this.title = title
        this.description = description
        this.completed_at = completed_at
        this.created_at = created_at
        this.updated_at = updated_at
      }
}