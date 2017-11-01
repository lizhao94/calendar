import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class PPP extends React.Component{
    render(){
        const local = null;
        // {
        //     weekName: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        //     monthName: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        // }
        return(
            <App onChange={(str, date) => console.log(str, date)} local={ local }/>
        )
    }
}
ReactDOM.render(<PPP />, document.getElementById('root'));
registerServiceWorker();

// let curMonthDays;
// if(date.getMonth === 11){
//     curMonthDays = new Date(`${date.getFullYear() + 1}/1/1`);
// }else if(date.getMonth === 0){
    
// }