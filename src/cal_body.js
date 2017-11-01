import React, { Component } from "react"
import "./App.css"

class Header extends Component {
	constructor(props){
        super(props)
        const {selectedDate} = this.props
		this.state = {
            curDate: selectedDate
        }
        this.weekName = props.weekName || ['一', '二', '三', '四', '五', '六', '日']
        this.monthName = props.monthName || ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        this.yearList = []
	}
    componentWillMount = (obj = {}) => {
        const monthDaysList = this.getMonth();
        this.setState({
            monthDaysList,
            ...obj,
            chooseType: false
        })
    }
    componentWillReceiveProps = (nprops) => {
        const flag = nprops.selectedDate.flag
        if((!nprops.chooseType || this.chooseType === nprops.chooseType) && (!flag || flag && this.flag === flag)){
            this.chooseType = nprops.chooseType
            this.flag = flag
            this.componentWillMount()
        }
        if(nprops.chooseType && this.chooseType !== nprops.chooseType){
            if(nprops.chooseType === 'month'){
            }else{
                this.getYearList(flag)
            }
        }
        if(nprops && nprops.chooseType ){//&& this.type !== nprops.chooseType && !this.chooseYearMonths){
            this.type = nprops.chooseType
            this.setState({chooseType: nprops.chooseType})
        }
    }
    getYearList = (type = 0) => {
        const {year} = this.state.curDate
        let startYear = Math.floor(year / 10) * 10 - 1
        this.yearList = !type ? [] : this.yearList
        for(let i = 0; i < 12; i++){
            if(+type === 1){
                this.yearList[i] += 10
            }else if(+type === -1){
                this.yearList[i] -= 10
            }else{
                this.yearList.push(startYear + i)
            }
        }
    }
    onChooseDate = day => {
        return () => {
            let curDate = this.state.curDate;
            if(day > 15 && day <= 31){
                if(curDate.month === 1){
                    curDate.year -= 1
                    curDate.month = 12
                }
                curDate.month -= 1 
            }else if(day <= 15){
                if(curDate.month === 12){
                    curDate.year += 1
                    curDate.month = 1
                }
                curDate.month += 1 
            }
            curDate.day = day % 100;
            const char = this.props.char;
            this.props.getDate(`${curDate.year}${char}${curDate.month}${char}${curDate.day}`, curDate);
            this.setState({
                curDate
            })
        }
    }
    chooseYearMonth = (record, type) => {
        return () => {
            let curDate = this.state.curDate
            curDate[type] = record
            const char = this.props.char
            this.props.getDate(`${curDate.year}${char}${curDate.month}${char}${curDate.day}`, curDate)
            this.props.chooseYearMonth()
            this.componentWillMount({
                curDate
            })
        }
    }
    getMonth = () => {
        let {year, month} = this.state.curDate
        if(month >= 12){
            month = 1
            year += 1
        }
        const nextMonth = new Date(`${year}/${month + 1}/1`) // 下月一号的日期, 备用
        const currMonth = new Date(`${year}/${month}/1`)     // 本月一号的日期, 备用

        // 获取本月一号是周几
        const curMonthFirstDate = currMonth.getDay() || 7
        // 获取本月天数
        const curMonthDays = new Date(nextMonth.getTime() - 60 * 60 * 24 * 1000).getDate()
        // 获取上一个月的天数
        const nextMonthDays = new Date(currMonth.getTime() - 60 * 60 * 24 * 1000).getDate()

        let monthDaysList = [], // 保存本月日期数据 
            v = 1, k = 1;               
        for(let i = 1; i <= 42; i++){
            if(i < curMonthFirstDate){
                monthDaysList.push(nextMonthDays - curMonthFirstDate + i + 1)
            }else if(i > curMonthDays + curMonthFirstDate - 1){
                monthDaysList.push(v++)
            }else{
                monthDaysList.push(100 + k++)
            }
            if(i % 7 === 0){
                monthDaysList.push(0);
            }
        }
        return monthDaysList
    }
    render() {
        const {monthDaysList, curDate, chooseType} = this.state
        let td = [];
        return (
            <div className="calendar-body">
                <table>
                    <thead>
                        <tr>
                            {
                                !chooseType && this.weekName.map((rec, idx) => {
                                    return <th key={idx}>{rec}</th>
                                })
                            }
                        </tr>  
                    </thead>
                    <tbody>
                        {
                            chooseType === 'year' ? 
                            this.yearList.map((rec, idx) => {
                                const active = curDate.year === rec ? 'active' : 'o'
                                if((idx + 1) % 4){
                                    td.push(<td key={idx}><div onClick={this.chooseYearMonth(rec, 'year')} className={active}>{rec}</div></td>)
                                }else{
                                    td.push(<td key={idx}><div onClick={this.chooseYearMonth(rec, 'year')} className={active}>{rec}</div></td>)
                                    let _td = td
                                    td = []
                                    return <tr key={idx} className="yearMonthList">{_td}</tr>
                                }
                                return true
                            })
                            : chooseType === 'month' ?
                            this.monthName.map((rec, idx) => {
                                const active = rec === this.monthName[curDate.month - 1] ? 'active' : 'o'
                                if((idx + 1) % 4){
                                    td.push(<td key={idx}><div onClick={this.chooseYearMonth(idx + 1, 'month')} className={active}>{rec}</div></td>)
                                }else{
                                    td.push(<td key={idx}><div onClick={this.chooseYearMonth(idx + 1, 'month')} className={active}>{rec}</div></td>)
                                    let _td = td
                                    td = []
                                    return <tr key={idx} className="yearMonthList">{_td}</tr>
                                }
                                return true
                            }) :
                            monthDaysList.map((rec, idx) => {
                                if(rec){
                                    const isOther = rec < 100 && 'other'
                                    const active = curDate.day === rec - 100 && 'active'

                                    td.push(<td key={idx}>
                                        <div className={isOther + ' ' + active} onClick={this.onChooseDate(rec)}>{rec % 100}</div>
                                    </td>)
                                }else{
                                    let _td = td;
                                    td = [];
                                    return <tr key={idx}>{_td}</tr>
                                }
                                return true
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Header;