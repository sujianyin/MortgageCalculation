const app = getApp();
Page({
  data: {
    // 房屋类型
    houseType: [{
      name: '新房',
      value: 0,
      checked: 'true'
    },
      {
        name: '二手房',
        value: 1,
      }
    ],
    // 住宅类型
    residenceType: ['普通住宅', '非普通住宅'],
    // 房屋持有时间
    holdingTime: ['不满2年', '满2年', '满5年'],
    holdingIndex: 0,
    // 首套住房
    isFirstHouse: [{
      name: '是',
      value: 0,
      checked: 'true'
    },{
      name: '否',
      value: 1,
    }],
    // 唯一住房
    only: ['家庭唯一', '非家庭唯一'],
    // 新房
    firstHouse: {
      only: 0,    // 唯一住房
      area: null,    // 面积
      price: null,   // 总价
    },
    secondHouse: {
      houseChoose: 0, // 房屋类型
      residenceType: 0, // 住宅类型
      holdingTime: 0,   // 房屋持有时间
      firstHouse: 0, // 首套住房
      only: 0,    // 唯一住房
      area: null,    // 面积
      oldPrice: null,   // 上次成交价
      newPrice: null, //   本次购入价



    }
  },
  // 新房唯一住房
  getFirstHouseOnlyTab(e){
    this.setData({
      [`firstHouse.only`]: e.detail.value - 0
    })
  },
  // 新房面积
  getFirstHouseArea(e){
    this.setData({
      [`firstHouse.area`]: e.detail.value
    })
  },
  // 新房总价
  getFirstHousePrice(e){
    this.setData({
      [`firstHouse.price`]: e.detail.value
    })
  },

  // 唯一住房
  getOnly(e){
    this.setData({
      [`secondHouse.only`]: e.detail.value - 0
    })
  },
  // 房屋类型
  getHouseTypeTab(e) {
    let houseChoose = e.detail.value - 0;
    this.setData({
      [`secondHouse.houseChoose`]: houseChoose
    })
  },
  // 住宅类型
  getResidenceTypeTab(e){
    this.setData({
      [`secondHouse.residenceType`]: e.detail.value - 0
    })
  },
  // 持有时间
  getHoldingTimeTab(e){
    let holdingTime = e.detail.value - 0;
    this.setData({
      [`secondHouse.holdingTime`]: holdingTime
    })
  },
  // 首套住房
  getFirstHouseTab(e){
    let firstHouse = e.detail.value - 0;
    this.setData({
      [`secondHouse.firstHouse`]: firstHouse
    })
  },

  // 面积
  getArea(e){
    this.setData({
      [`secondHouse.area`]: e.detail.value
    })
  },
  // 上次成交价
  getOldPrice(e){
    this.setData({
      [`secondHouse.oldPrice`]: e.detail.value
    })
  },
  // 本次购入价
  getNewPrice(e){
    this.setData({
      [`secondHouse.newPrice`]: e.detail.value
    })
  },
  // 跳转至结果页
  onSendTab(e){
    // 如果是新房
    if(this.data.secondHouse.houseChoose === 0){
      if(!this.data.firstHouse.area){
          wx.showToast({
            title: '请输入面积',
            icon: 'none',
            duration: 2000
          })
          return
      }
      if(!this.data.firstHouse.price){
        wx.showToast({
          title: '请输入价格',
          icon: 'none',
          duration: 2000
        })
        return
      }
      console.log(this.data.firstHouse)
      wx.navigateTo({
        url: `../taxesdetail/taxesdetail?param=${JSON.stringify(this.data.firstHouse)}`
      })
    }else{
      if(!this.data.secondHouse.area){
        wx.showToast({
          title: '请输入建筑面积',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if(!this.data.secondHouse.oldPrice){
        wx.showToast({
          title: '请输入上次成交价',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if(!this.data.secondHouse.newPrice){
        wx.showToast({
          title: '请输入本次购入价',
          icon: 'none',
          duration: 2000
        })
        return
      }
      wx.navigateTo({
        url: `../taxesdetail/taxesdetail?param=${JSON.stringify(this.data.secondHouse)}`
      })
    }

  },
  // 跳转至税费
  jumpMortgage(e){
    wx.navigateTo({
      url: '../calculator/calculator'
    })
  }
})
