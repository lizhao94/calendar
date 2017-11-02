import React, { Component } from "react";
import "./App.css";
import Header from './cal_header'
import Body from './cal_body'
class App extends Component {
	constructor(props){
		super(props)
		const {year, month, day} = props.defaultDate || this.fmtDate(new Date())
		this.state = {
			curDate: {year, month, day}
		}
		this.weekName = props.local && props.local.weekName || ['一', '二', '三', '四', '五', '六', '日']
        this.monthName = props.local && props.local.monthName || ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
	}

	fmtDate = (date) => {
		if(Object.prototype.toString.call(date) === "[object Date]"){
			const year  = date.getFullYear(),
				  month = date.getMonth() + 1,
				  day   = date.getDate()
			return {
				year,
				month,
				day,
				dateStr : `${year}/${month}/${day}`
			}
		}
	}

	UpdateDate = (date, flag) => {
		let {curDate} = this.state
		curDate.year  = date.year
		curDate.month = date.month
		curDate.flag = flag
		curDate.day = date.day
		const char = this.props.connector || '-'
		this.props.onChange(`${curDate.year}${char}${curDate.month}${char}${curDate.day}`, date)
		this.setState({ curDate })
	}

	chooseType = type => {
		this.setState({
			chooseType: type
		})
	}
	getDate = (dateStr, date) => {
		this.props.onChange(dateStr, date)
		this.setState({ curDate: date })
	}
	chooseYearMonth = (type) => {
		this.setState({chooseType: null, type})
	}
    render() {
		const {curDate, chooseType, type} = this.state;
        return (
			<div className="calendar" style={{width: this.props.width || 100, minWidth: 250}}>
				<label className="output">{`${curDate.year}-${curDate.month < 10 ? '0' + curDate.month : curDate.month}-${curDate.day < 10 ? '0' + curDate.day : curDate.day}`}</label>
				<Header 
					selectedDate={curDate} 
					UpdateDate={this.UpdateDate} 
					chooseType={this.chooseType}
					monthName={this.monthName}
					monthYear={this.chooseYearMonth}
					type={type}/>
				<Body 		
					selectedDate={curDate}  
					chooseType={chooseType} 
					char={this.props.connector || '/'} 
					getDate={this.getDate}
					chooseYearMonth={this.chooseYearMonth}
					weekName={this.weekName}
					monthName={this.monthName}
				/>
			</div>
        );
    }
}
export default App;