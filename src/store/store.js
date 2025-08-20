import { makeAutoObservable } from 'mobx';
 
class AppStore {
    count = 0;
    userName = 'Nic.Li';
 
    constructor() {
        makeAutoObservable(this);
    }
 
    increment() {
        this.count += 1;
    }
}
 
const appStore = new AppStore();
export default appStore;