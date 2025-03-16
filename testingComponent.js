import { LightningElement, wire, track } from 'lwc';

export default class TestComponentclass extends LightningElement {
    
    Greeting = 'Good Morning';
    Time = '6:66 AM';

    @track todolist = [];
    @track taskName = '';
    

    connectedCallback(){
        this.getTime();

        setInterval(() => {
            this.getTime();
        }, 1000*60);
    }

    getTime() {
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();

        this.Time = `${this.gethour(hour)}:${this.getDoubledigit(min)} ${this.getMidday(hour)}`;
        this.setGreeting(hour);
    }

    gethour(hour){
        return hour === 0 ? 12 : hour > 12 ? (hour - 12) : hour;
    }

    getDoubledigit(min){
        return min < 10 ? '0'+ min : min;
    }

    getMidday(hour){
        return hour <= 12 ? 'AM' : 'PM' ; 
    }

    setGreeting(hour){
        if(hour >= 4 && hour < 12){
            this.Greeting = 'Good Morning';
        } else if(hour >= 12 && hour < 17){
            this.Greeting = 'Good Afternoon';
        } else if(hour > 17 && hour <= 21){
            this.Greeting = 'Good Evening';
        } else this.Greeting = 'Good Night';
    }
    handleinputtask(event){
        this.taskName = event.target.value;
    }

    addtask(event){
        if(this.taskName.trim() !== ''){
            const newtask = {
                id: Date.now().toString(),
                name: this.taskName,
                completed: false
            };
            
            this.todolist = [...this.todolist, newtask];
            this.taskName = '';
        }
    }

    markascomplete(event){
        const taskid = event.target.dataset.id;
        if(!taskid) return;
        this.todolist = this.todolist.map(task => task.id.toString() === taskid.toString() ? {...task, completed:true} : task);

    }

    deletetask(event){
        const taskid = event.target.dataset.id;
        this.todolist = this.todolist.filter(task => task.id !== taskid);
    }



}
