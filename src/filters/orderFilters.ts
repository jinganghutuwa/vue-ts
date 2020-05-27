/*
 * @Author: Jason
 * @Date: 2020-04-22 11:36:50
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2020-04-22 12:07:25
 * @Descripttion: 
 */
function besTypeText(val: string, activityId: string) {
    // DB：酒后代驾 
    // AS：机场接送
    // BD：商务代驾
    // IG：代办年检
    // DBC：代步车
    // RA：道路救援
    // JWJS:境外接送
    let bestypeText = ''
    switch (val) {
        case 'DB':
            bestypeText = '酒后代驾'
            break
        case 'IG':
            bestypeText = '代办年检'
            break
        case 'AS':
            bestypeText = '机场接送'
            break
        case 'HS':
            bestypeText = '高铁接送'
            break
        case 'BD':
            bestypeText = '商务代驾'
            break
        case 'DBC':
            bestypeText = '代步车'
            break
        case 'RA':
            bestypeText = '道路救援'
            break
        case 'JWJS':
            bestypeText = '境外接送'
            break
        case "VIPR":
            if (activityId === '5476') {
                bestypeText = "机场贵宾厅"
            } else if (activityId === '5475') {
                bestypeText = "高铁贵宾厅"
            }

    }
    return bestypeText
}
function pickUpDeliver(val: string, type: string) {
    if (type === 'AS') {
        if (val === '1') {
            return "接机"
        }
        if (val === '2') {
            return "送机"
        }
    }
    if (type === 'HS') {
        if (val === '1') {
            return "接高铁"
        }
        if (val === '2') {
            return "送高铁"
        }
    }
}
function carServerType(val: string) {
    // 经济	JJX00001  豪华	HHX0004 商务	SWX0003 舒适 SSX00002
    switch (val) {
        case "JJX00001":
            return "经济型"
        case "HHX0004":
            return "豪华型"
        case "SWX0003":
            return "商务型"
        case "SSX00002":
            return "舒适型"
    }

}
function carServerPrice(val: string) {
    // 经济	JJX00001  豪华	HHX0004 商务	SWX0003 舒适 SSX00002
    switch (val) {
        case "JJX00001":
            return "经济型"
        case "HHX0004":
            return "350元"
        case "SWX0003":
            return "260元"
        case "SSX00002":
            return "218元"
    }
}
function orderStatus(val: number, payStatus: number){
    switch (Number(val)) {
        case 0:
            return '待支付'
        case 1:
            if (payStatus === 0) return "待支付"
            return '待使用'
        case 2:
            return '预约确认中'
        case 3:
            return '预约成功'
        case 5:
            return '已完成'
        case 7:
            return '已取消'
        case 8:
            return '司机已经到达'
    }
}


export { besTypeText,pickUpDeliver,carServerType,carServerPrice,orderStatus }