import { observable, action } from "mobx";


class MainStore {

    @observable taskStyle = {
        textAlign: 'right',
        padding: 5,
        backgroundColor: '#f2f6f5',
        borderRadius: 10,
        width: 200
    }

    @observable taskList = [
    ]

    @observable id = 0

    @observable data = {
        id: 123112313 , 
        task: "fuufkkfa", 
        edit: false, 
        done: false, 
        style: null
    }

    @action takeInput = (data) => {
        data.id = this.id
        this.taskList.push(data)
        this.id += 1
    }   

    @action makeEditable = (id) => {
        const copiedData = this.taskList.find((copiedData) =>(copiedData.id == id))
        copiedData.edit = true
    }

    @action saveInput = (id, text) => {
        const copiedList = this.taskList.slice()
        const copiedData = copiedList.find((copiedData) => copiedData.id == id)
        copiedData.task = text
        
    }

    @action completedTask = (id) => {
        const isDone = this.taskList.find((data) => data.id == id).done
        if(isDone === false){
            this.taskList.find((data) => data.id == id).done = true
          }
          else {
            this.taskList.find((data) => data.id == id).done = false
          }
    }

    @action doneStyle = (id) => {
        const node = this.taskList.find((data) => data.id == id)
        if (node.done === false) {
            node.style = null
            this.taskList[node.id] = node
        }
        else {
            const style = {
                backgroundColor: '#A7F432',
                textAlign: 'right',
                padding: 5,
                borderRadius: 10,
                width: 200
            }
            node.style = style
            this.taskList[node.id] = node
        }
    }
}

const store = new MainStore();
export default store;