import React, { Component } from "react"
import "./App.css"

class Header extends Component {
	constructor(props){
		super(props)
		this.state = {
            selectedDate: props.selectedDate
        }
        this.monthName = props.monthName || ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        this.type = props.type
	}
    onSwitchMonth = flag => {
        return () => {
            const {year, month, day} = this.props.selectedDate
            if(this.props.type) this.showType = ''
            const type = this.showType
            let pMonth, pYear, pDay
            if(type !== 'month'){
                if(flag === 1 && month === 12){
                    pMonth = 1
                    pYear = year + 1
                }else if(flag === -1 && month === 1){
                    pMonth = 12
                    pYear = year - 1
                }else{
                    pMonth = month + flag
                }
            }
            if(!flag){
                const date = new Date()
                pMonth = date.getMonth() + 1
                pDay = date.getDate()
                pYear  = date.getFullYear()
                this.props.monthYear()
            }
            const _flag = type === 'year' ? flag : ''
            this.props.UpdateDate({month: pMonth || month, year: pYear || year, day: pDay || day}, _flag)
        }
    }
    onChooseDate = type => {
        return () => {
            // this.state.showType = type
            // this.setState({
            //     showType: type
            // })
            this.showType = type
            this.props.chooseType(type)
        }
    } 
    render() {
        const {selectedDate} = this.state
        const type = this.state.showType
        return (
            <div className="calendar-header">
			    <i className="arrow arrow-left" onClick={this.onSwitchMonth(-1)} style={{cursor: type === 'month' && 'no-drop'}}></i>
                <p className="yearMonth">
                    <span onClick={this.onChooseDate('year')}>{selectedDate.year}</span>
                    <span onClick={this.onChooseDate('month')}>{this.monthName[selectedDate.month - 1]}</span>
                    <span className="today" onClick={this.onSwitchMonth(0)}>今</span>
                </p>
                <i className="arrow arrow-right" onClick={this.onSwitchMonth(+1)} style={{cursor: type === 'month' && 'no-drop'}}></i>
            </div>
        );
    }
}
export default Header;