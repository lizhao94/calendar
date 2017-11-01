import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			month: [],
			yearList: []
		}
		this.weekName = ['一', '二', '三', '四', '五', '六', '日'];
		this.monthName = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
		this.prevMonth = "上一个月";
		this.nextMonth = "下一个月";
		this.nextPage = "下一页";
		this.prevPage = "上一页";
		this.backToday = "今";
	}
    componentWillMount = () => {
		const props = this.props;
		const cur = props.current ? new Date(props.current) : new Date();
		const currentDate = {
			day: cur.getDate(),
			month: +cur.getMonth() + 1,
			year: cur.getFullYear()
		}
		const val = Math.floor(currentDate.year / 10) * 10 - 1;
		
		const yearList = this.state.yearList;
		for(let i = 0; i < 12; i++){
			yearList.push(val + i);
		}
		this.state.yearList = yearList;
		this.setMonth(currentDate);
	};
	setMonth = (currentDate, date) => {
		const {week, curMonthDays, month} = this.getMonthDays(date);

		this.setState({
			currentDate,
			week,
			curMonthDays,
			month,
			chooseYear: false,
			chooseMonth: false
		})
	}
	getMonthDays = (date = new Date()) => {
		// const nextMonthFirstDay = new Date(`${date.getFullYear()}/${+date.getMonth() + 2}/1`);
		let nextMonthFirstDay = new Date(`${date.getFullYear()}/${+date.getMonth() + 2}/1`);
		if(date.getMonth() === 11){
			nextMonthFirstDay = new Date(`${date.getFullYear() + 1}/1/1`);
		}
		const curMonthDays = new Date(nextMonthFirstDay.getTime() - 24 * 60 * 60 * 1000).getDate();

		const week = new Date(`${date.getFullYear()}/${+date.getMonth() + 1}/1`).getDay() || 7;

		const curMonthFirstDay = new Date(`${date.getFullYear()}/${+date.getMonth() + 1}/1`);
		const prevMonthDays = new Date(curMonthFirstDay.getTime() - 24 * 60 * 60 * 1000).getDate();
		let arr = [];
		let k = 1;
		let v = 1;
		console.log(week, curMonthDays, prevMonthDays)
		for(let i = 1; i <= 42; i++){
			if(k > curMonthDays){
				// arr.push(-1);
				const start = 42 - week - curMonthDays + 1;
				// console.log(start)
				if(v <= start){
					arr.push(v);
					v++;
				}
			}else if(i < week){
				arr.push(prevMonthDays - week + i + 1);
			}else{
				const cur = date.getDate();
				if(k === cur){
					arr.push(100 + k)
				}else{
					arr.push(100 + k)
				}
				k++;
			}
			if(i % 7 === 0 && i !== 42){
				arr.push(0);
			}
		}
		return {
			week,
			curMonthDays,
			month: arr
		}
	}

	chooseDate = (date, curr) => {
		let {currentDate} = this.state;
		if(curr < 15){
			currentDate.day = curr;
			if(currentDate.month < 12){
				currentDate.month = currentDate.month + 1;
			}else{
				currentDate.month = 1;
				currentDate.year += 1; 
			}
			this.setMonth(currentDate, new Date(`${date.year}/${date.month}/${curr}`));
			return;
		}else if(curr > 15 && curr < 100){
			currentDate.day = curr;
			if(currentDate.month > 1){
				currentDate.month = currentDate.month - 1;
			}else{
				currentDate.month = 12;
				currentDate.year -= 1; 
			}
			this.setMonth(currentDate, new Date(`${date.year}/${date.month}/${curr}`));
			return;
		}
		let cur = curr % 100;
		console.log(`${date.year}/${date.month}/${cur}`)
		currentDate.day = cur;
		this.setMonth(currentDate, new Date(`${date.year}/${date.month}/${cur}`));
	}

	onPrevMonth = (cur, isChooseYear) => {
		return () => {
			if(isChooseYear){
				const yearList = this.state.yearList;
				for(let i = 0; i < 12; i++){
					yearList[i] = yearList[i] - 10;
				}
				this.setState({yearList})
				return;
			}
			let {currentDate} = this.state;
			const month = currentDate.month;
			if(month > 1){
				// currentDate.day = NaN;
				currentDate.month = currentDate.month - 1;
				this.setMonth(currentDate, new Date(`${currentDate.year}/${currentDate.month}/${currentDate.day}`));
			}else{
				currentDate.year = currentDate.year - 1;
				currentDate.month = 12;
				console.log(`${currentDate.year}/${currentDate.month}/${currentDate.day}`)
				this.setMonth(currentDate, new Date(`${currentDate.year}/${currentDate.month}/${currentDate.day}`));
			}
		}
	}

	onNextMonth = (cur, isChooseYear) => {
		return () => {
			console.log(1)
			if(isChooseYear){
				const yearList = this.state.yearList;
				for(let i = 0; i < 12; i++){
					yearList[i] = yearList[i] + 10;
				}
				this.setState({yearList})
				return;
			}
			let {currentDate} = this.state;
			const month = currentDate.month;
			if(month < 12){
				// currentDate.day = NaN;
				currentDate.month = currentDate.month + 1;
				this.setMonth(currentDate, new Date(`${currentDate.year}/${currentDate.month}/${currentDate.day}`));
			}else{
				currentDate.year = currentDate.year + 1;
				currentDate.month = 1;
				console.log(`${currentDate.year}/${currentDate.month}/${currentDate.day}`)
				this.setMonth(currentDate, new Date(`${currentDate.year}/${currentDate.month}/${currentDate.day}`));
			}
		}
	}

	chooseYear = (cur) => {
		return () => {
			this.setState({
				chooseYear: true,
				chooseMonth: false
			})
		}
	}

	chooseMonth = (cur) => {
		return () => {
			this.setState({
				chooseMonth: true,
				chooseYear: false
			})
		}
	}

	onChoose = (type, val) => {
		return () => {
			console.log(type, val)
			let {currentDate} = this.state;
			if(type === 'month'){
				currentDate.month = val
				this.setMonth(currentDate, new Date(`${currentDate.year}/${val}/${currentDate.day}`));
			}else{
				currentDate.year = Number(val);
				this.setMonth(currentDate, new Date(`${val}/${currentDate.month}/${currentDate.day}`));
			}
		}
	}

	goToday = () => {
		const date = new Date();
		const currentDate = {
			day: date.getDate(),
			month: +date.getMonth() + 1,
			year: date.getFullYear()
		}
		this.setMonth(currentDate, new Date(`${currentDate.year}/${currentDate.month}/${currentDate.day}`));
	}
    render() {
		const {currentDate, week, month, chooseYear, chooseMonth, yearList} = this.state;
		let day = 0;
		const today = new Date();
		console.log(month)
        return (
            <div className="calendar">
				<div className="calendar-header">
					<i className="arrow arrow-left" title={this.prevMonth} onClick={!chooseMonth ? this.onPrevMonth(currentDate, chooseYear) : () => {}}></i>
					<p className="yearMonth">
						<span onClick={this.chooseYear(currentDate.year)}>{chooseYear ? `${yearList[0]} ~ ${yearList[11]}` : currentDate.year}</span>
						{ !chooseYear && <span onClick={this.chooseMonth(currentDate.month)}>{this.monthName[currentDate.month - 1]}</span>}
						<span onClick={this.goToday} className="today">{this.backToday}</span>
					</p>
					<i className="arrow arrow-right" title={this.nextMonth} onClick={!chooseMonth ? this.onNextMonth(currentDate, chooseYear) : () => {}}></i>
				</div>
                <div className="calendar-body">
					{
						!chooseYear && !chooseMonth && this.weekName.map((rec, index) => {
							return <span key={index} className="weekname">{rec}</span>
						})
					}
					{
						!chooseYear && !chooseMonth && month.map( (rec, index) => {
							if(rec === 0){
								return <br key={index}/>
							}else{
								const active = rec - 100 === currentDate.day ? 'active' : '';
								const curMonth = rec > 100 ? '' : 'other'; //this.chooseDate(currentDate, rec)
								return <span key={index} className={active + curMonth} onClick={this.chooseDate.bind(this, currentDate, rec)}>{rec % 100}</span>
							}
						})
					}
					{
						chooseMonth && this.monthName.map((rec, index) => {
							const color = today.getMonth() === index && '#fff';
							const background = today.getMonth() === index && '#f60';
							return <label className="monthlist" onClick={this.onChoose('month', index + 1)} key={index} style={{color, background}}>{rec}</label>
						})
					}
					{
						chooseYear && yearList.map((rec, index) => {
							const color = today.getFullYear() === rec && '#fff';
							const background = today.getFullYear() === rec && '#f60';
							return <label className="monthlist" onClick={this.onChoose('year', rec)} key={index} style={{color, background}}>{rec}</label>
						})
					}
				</div>	
            </div>
        );
    }
}
export default App;
// class CalendarHeader extends component{
// 	getInitialState = () => {
// 		return {
// 			year  : this.props.year, 
// 			month : this.props.month
// 		}
// 	}
// 	render(){
// 		return (
// 			<div className="calendar-header">
// 				<i className="arrow arrow-left" onClick={!chooseMonth ? this.onPrevMonth(currentDate, chooseYear) : () => {}}></i>
// 				<p className="yearMonth">
// 					<span onClick={this.chooseYear(currentDate.year)}>{chooseYear ? `${yearList[0]} ~ ${yearList[11]}` : currentDate.year}</span>
// 					{ !chooseYear && <span onClick={this.chooseMonth(currentDate.month)}>{this.monthName[currentDate.month - 1]}</span>}
// 					<span onClick={this.goToday} className="today">今</span>
// 				</p>
// 				<i className="arrow arrow-right" onClick={!chooseMonth ? this.onNextMonth(currentDate, chooseYear) : () => {}}></i>
// 			</div>
// 		)
// 	}
// }