const app = getApp();
Page({
  data: {
    param: null,
    firstHouse: {
      total: 0, // 总税费
      yhTaxes: 5,
      deedTax: 0, // 契税
      maintenance: 0,
    },
    secondHouse:{
      deedTax: 0,    // 增值税
      yhTaxes: 5,   // 印花税
      registration: 80,   // 房屋登记费
      mortgage: 80,     // 抵押登记费
      captions: 25,   // 配图费
      formalities: 0, // 交易手续费
      total: 0,       // 总计
    },

  },
  onLoad (o) {
    let param = JSON.parse(o.param);
    this.setData({
      param
    })
    this.onLoadData();
  },
  onLoadData () {
    // 如果是二手房
    if (this.data.param.houseChoose) {
      // // 如果不满两年
      // if(this.data.param.holdingTime === 0){
      //   this.setData({
      //     ['secondHouse.VTA']:  this.data.param.oldPrice / 1.05 * 0.565 * 10000
      //   })
      // }
      // // 如果满两年且非普通住宅
      // if(this.data.param.holdingTime >= 1 && this.data.param.residenceType === 1){
      //   this.setData({
      //     ['secondHouse.VTA']:  (this.data.param.newPrice - this.data.param.oldPrice ) / 1.05 * 0.565 * 10000
      //   })
      // }
      // 契税
      let rate = this.data.param.area < 90 ? 0.01 : !this.data.param.only ? 0.015 :  0.03
      console.log(rate)
      console.log(this.data.param.newPrice)
      let total = this.data.param.newPrice * rate * 10000 + this.data.param.area * 2 + this.data.secondHouse.yhTaxes +
        this.data.secondHouse.registration + this.data.secondHouse.mortgage + this.data.secondHouse.captions
      this.setData({
        ['secondHouse.deedTax']:  this.data.param.newPrice * rate,
        ['secondHouse.formalities']: this.data.param.area * 2,
        ['secondHouse.total']: total
      })
    } else {
      // 契税 面积小于90 百分之一  面积大于90且唯一住房 百分之1.5 面积大于90且非唯一住房 百分之3
      let rate = this.data.param.area <= 90 ? 0.01 : !this.data.param.only ? 0.015 :  0.03
      this.setData({
        ['firstHouse.deedTax']:  this.data.param.price * rate,
        ['firstHouse.maintenance']:  this.data.param.area * 38.85
      })
    }
  },

})
