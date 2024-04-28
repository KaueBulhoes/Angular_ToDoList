export class Todo {
    id: string;
    text: string;
    completed: boolean;

    constructor(id: string, text: string, completed: boolean) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }
}
