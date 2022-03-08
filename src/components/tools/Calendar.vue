<template>
    <el-calendar v-model='value' style='width: 820px'>
        <template slot='dateCell' slot-scope='{date, data}'>
            <div :class='{ selected : isSelected(date, data) }'>
                <div class='solar'>
                    {{ data.day.split('-')[2] }}
                </div>
                <div class='lunar' :class='{ festival : isFestival(date, data) }'>
                    {{ solarToLunar(date, data) }}
                </div>
            </div>
        </template>
    </el-calendar>
</template>

<script>
import calendar from '@/assets/js/plugins/calendar.js'
import '@/assets/js/date.format'

export default {
    data() {
        let now = new Date().format('Y-m-d')
        return {
            // 设置value，会自动显示value对应月份，可以设置为selectedDates的第一个日期
            value: now,
            // 根据selectedDates设置选中日期
            selectedDates: ['2021-03-12']
        }
    },
    methods: {
        // 是否选中日期
        isSelected: function(slotDate, slotData) {
            return this.selectedDates.includes(slotData.day)
        },
        // 是否节假日
        isFestival(slotDate, slotData) {
            let solarDayArr = slotData.day.split('-')
            let lunarDay = calendar.solar2lunar(solarDayArr[0], solarDayArr[1], solarDayArr[2])

            // 公历节日\农历节日\农历节气
            let festAndTerm = []
            festAndTerm.push(lunarDay.festival == null ? '' : ' ' + lunarDay.festival)
            festAndTerm.push(lunarDay.lunarFestival == null ? '' : '' + lunarDay.lunarFestival)
            festAndTerm.push(lunarDay.Term == null ? '' : '' + lunarDay.Term)
            festAndTerm = festAndTerm.join('')

            return festAndTerm !== ''
        },
        // 公历转农历
        solarToLunar(slotDate, slotData) {
            let solarDayArr = slotData.day.split('-')
            let lunarDay = calendar.solar2lunar(solarDayArr[0], solarDayArr[1], solarDayArr[2])

            // 农历日期
            let lunarMD = lunarDay.IMonthCn + lunarDay.IDayCn

            // 公历节日\农历节日\农历节气
            let festAndTerm = []
            festAndTerm.push(lunarDay.festival == null ? '' : ' ' + lunarDay.festival)
            festAndTerm.push(lunarDay.lunarFestival == null ? '' : '' + lunarDay.lunarFestival)
            festAndTerm.push(lunarDay.Term == null ? '' : '' + lunarDay.Term)
            festAndTerm = festAndTerm.join('')

            return festAndTerm === '' ? lunarMD : festAndTerm
        }
    }
}
</script>

<style>
/**隐藏上一月、本月、下一月*/
.el-calendar__button-group {
    display: none;
}

/**月份居中*/
.el-calendar__title {
    width: 100%;
    text-align: center;
}

/**日期div的样式*/
.el-calendar-table tr td:first-child {
    border-left: 0;
}

.el-calendar-table td {
    min-height: 110px;
    min-width: 110px;
    border-right: 0;
}

.el-calendar-table td.is-selected {
    background-color: white;
}

.el-calendar-table .el-calendar-day {
    height: 100%;
    padding: 0;
    text-align: center;
}

.el-calendar-table .el-calendar-day > div {
    height: 104px;
}

/**日期div的样式-公历*/
.el-calendar-table .el-calendar-day > div .solar {
    padding-top: 10px;
}

/**日期div的样式-农历*/
.el-calendar-table .el-calendar-day > div .lunar {
    padding-top: 10px;
}

/**日期div的样式-选中*/
.el-calendar-table .el-calendar-day > div.selected {
    background-color: #fef2f2;
    border: 3px solid #fb0;
    border-radius: 20px;
}

/**本月周末设置为红色*/
.el-calendar-table .current:nth-last-child(-n+2) .solar {
    color: red;
}

/**本月农历设置为灰色*/
.el-calendar-table .current .lunar {
    color: #606266;
}

/**本月农历节日设置为红色*/
.el-calendar-table .current .lunar.festival {
    color: red;
}

/**禁用点击效果*/
/*.el-calendar-table td {*/
/*    pointer-events: none;*/
/*}*/
</style>
