export const data = [
    {
      id: '202507131', // 工单号
      partyAName: 'xxxxxx', // 甲方主体名称
      uploadTime: '2025-07-15', //提交时间
      partyAUserName: '甲方经办人姓名', //甲方经办人姓名
      partyAUserPhone: '甲方经办人电话',// 甲方经办人电话
      confirmTime: '2025-07-15', //确认时间
      partyBName:'苏州中鑫新能源有限公司', //乙方主体名称
      partyBUserName: '董小燕', // 乙方经办人姓名
      partyBUserPhone: '13814857279', // 乙方经办人电话
      partyBPhone: '0512-69997006', // 乙方电话
      partyAContractId: '1213412312312', // 甲方合同编号
      partyBContractId: '1213412312312', // 乙方合同编号
      contractConfirmTime: '2025-07-15', //合同签订日期
  
      partyANumber: '', // 甲方统一社会信用代码
      partyAAddress: '', // 甲方公司住所
      partyALeaderName: '' ,//甲方法人
      partyABankName: '', // 甲方开户银行
      partyABankAccount: '', // 甲方开户账号
      partyAUserEmail: '', // 甲方经办人联系邮箱
      partyAUsedElectric: [
        {
          address: '地址A',
          addressNumber: 'xxx'
        },
        {
          address: '地址B',
          addressNumber: 'xxx'
        }
      ], // 甲方用电地址（可多个） 甲方用电地址对应户号（可多个）
      
      partyAAddress: '', // 甲方公司住所
      contractStartTime: '2025-07-15', //交易开始时间
      contractEndTime: '2025-07-15', // 交易结束时间
      totalElectric: '10000', //合计电量
      packageType: '', //套餐类型
      packageName: '绿电固定价格', // 套餐名称 (绿电固定价格 or 比例分成 or 价差浮动) 
      packageInfo: {
        
      }, // 不同结构
      month: '', //月份
      monthUsedElectric: '', // 分月用电量
      // 用电量正负偏差
      // 用电量超出正偏差比例
      // 用电量正偏差外价格
      // 用电量超出负偏差比例
      // 用电量负偏差外价格
      // 是否约定执行标准用电曲线
      // 用电曲线修改期限
      // 用电曲线正负偏差
      // 用电曲线超出正偏差比例
      // 用电量正偏差外价格
      // 用电曲线超出负偏差比例
      // 用电曲线负偏差外价格
      // 其他补充约定
      // 乙方解约赔偿
      // 乙方无法执行赔偿
      // 乙方未结算赔偿
      // 甲方解约赔偿（30日前）
      // 甲方解约赔偿（30日内）
      // 甲方解约赔偿（执行中）
      // 协商不成约定方式
      backupType: 1, // 双方备案方式(1 or 2)
      backupParty: '乙', // 备案方（如备案方式2，可选甲或乙，默认乙））
      contractInfo: '', // 正本合同
      executeContract: '', // 双方各执合同
      partyASignTime: '2025-07-15', // 甲方签订日期
      partyBSignTime: '2025-07-15', // 乙方签订日期
      orderTime: '2025-07-15', // 零售平台下单时间
      orderAddress: '上海', //签约地点
    },
    // {
    //     id: '202507182', // 工单号
    //     partyAName: '甲方主体名称1', // 甲方主体名称
    //     uploadTime: '2025-07-15', //提交时间
    //     partyAUserName: '甲方经办人姓名', //甲方经办人姓名
    //     partyAUserPhone: '甲方经办人电话',// 甲方经办人电话
    //     confirmTime: '2025-07-15', //确认时间
    //     partyBName:'苏州中鑫新能源有限公司', //乙方主体名称
    //     partyBUserName: '董小燕', // 乙方经办人姓名
    //     partyBUserPhone: '13814857279', // 乙方经办人电话
    //     partyBPhone: '0512-69997006', // 乙方电话
    //     partyAContractId: '2231231231', // 甲方合同编号
    //     partyBContractId: '111141231211111', // 乙方合同编号
    //     contractConfirmTime: '2025-07-15', //合同签订日期
    
    //     partyANumber: '', // 甲方统一社会信用代码
    //     partyAAddress: '', // 甲方公司住所
    //     partyALeaderName: '' ,//甲方法人
    //     partyABankName: '', // 甲方开户银行
    //     partyABankAccount: '', // 甲方开户账号
    //     partyAUserEmail: '', // 甲方经办人联系邮箱
    //     partyAUsedElectric: [
    //       {
    //         address: '地址A',
    //         addressNumber: 'xxx'
    //       },
    //       {
    //         address: '地址B',
    //         addressNumber: 'xxx'
    //       }
    //     ], // 甲方用电地址（可多个） 甲方用电地址对应户号（可多个）
        
    //     partyAAddress: '', // 甲方公司住所
    //     contractStartTime: '2025-07-15', //交易开始时间
    //     contractEndTime: '2025-07-15', // 交易结束时间
    //     totalElectric: '10000', //合计电量
    //     packageType: '', //套餐类型
    //     packageName: '绿电固定价格', // 套餐名称 (绿电固定价格 or 比例分成 or 价差浮动) 
    //     packageInfo: {
    
    //     }, // 不同结构
    //     month: '', //月份
    //     monthUsedElectric: '', // 分月用电量
    //     // 用电量正负偏差
    //     // 用电量超出正偏差比例
    //     // 用电量正偏差外价格
    //     // 用电量超出负偏差比例
    //     // 用电量负偏差外价格
    //     // 是否约定执行标准用电曲线
    //     // 用电曲线修改期限
    //     // 用电曲线正负偏差
    //     // 用电曲线超出正偏差比例
    //     // 用电量正偏差外价格
    //     // 用电曲线超出负偏差比例
    //     // 用电曲线负偏差外价格
    //     // 其他补充约定
    //     // 乙方解约赔偿
    //     // 乙方无法执行赔偿
    //     // 乙方未结算赔偿
    //     // 甲方解约赔偿（30日前）
    //     // 甲方解约赔偿（30日内）
    //     // 甲方解约赔偿（执行中）
    //     // 协商不成约定方式
    //     backupType: 1, // 双方备案方式(1 or 2)
    //     backupParty: '乙', // 备案方（如备案方式2，可选甲或乙，默认乙））
    //     contractInfo: '', // 正本合同
    //     executeContract: '', // 双方各执合同
    //     partyASignTime: '2025-07-15', // 甲方签订日期
    //     partyBSignTime: '2025-07-15', // 乙方签订日期
    //     orderTime: '2025-07-15', // 零售平台下单时间
    //     orderAddress: '上海', //签约地点
    // },
    // {
    // id: '202507183', // 工单号
    // partyAName: '甲方主体名称1', // 甲方主体名称
    // uploadTime: '2025-07-15', //提交时间
    // partyAUserName: '甲方经办人姓名', //甲方经办人姓名
    // partyAUserPhone: '甲方经办人电话',// 甲方经办人电话
    // confirmTime: '2025-07-15', //确认时间
    // partyBName:'苏州中鑫新能源有限公司', //乙方主体名称
    // partyBUserName: '董小燕', // 乙方经办人姓名
    // partyBUserPhone: '13814857279', // 乙方经办人电话
    // partyBPhone: '0512-69997006', // 乙方电话
    // partyAContractId: '8888777722', // 甲方合同编号
    // partyBContractId: '111111111', // 乙方合同编号
    // contractConfirmTime: '2025-07-15', //合同签订日期

    // partyANumber: '', // 甲方统一社会信用代码
    // partyAAddress: '', // 甲方公司住所
    // partyALeaderName: '' ,//甲方法人
    // partyABankName: '', // 甲方开户银行
    // partyABankAccount: '', // 甲方开户账号
    // partyAUserEmail: '', // 甲方经办人联系邮箱
    // partyAUsedElectric: [
    //     {
    //     address: '地址A',
    //     addressNumber: 'xxx'
    //     },
    //     {
    //     address: '地址B',
    //     addressNumber: 'xxx'
    //     }
    // ], // 甲方用电地址（可多个） 甲方用电地址对应户号（可多个）
    
    // partyAAddress: '', // 甲方公司住所
    // contractStartTime: '2025-07-15', //交易开始时间
    // contractEndTime: '2025-07-15', // 交易结束时间
    // totalElectric: '10000', //合计电量
    // packageType: '', //套餐类型
    // packageName: '绿电固定价格', // 套餐名称 (绿电固定价格 or 比例分成 or 价差浮动) 
    // packageInfo: {

    // }, // 不同结构
    // month: '', //月份
    // monthUsedElectric: '', // 分月用电量
    // // 用电量正负偏差
    // // 用电量超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电量超出负偏差比例
    // // 用电量负偏差外价格
    // // 是否约定执行标准用电曲线
    // // 用电曲线修改期限
    // // 用电曲线正负偏差
    // // 用电曲线超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电曲线超出负偏差比例
    // // 用电曲线负偏差外价格
    // // 其他补充约定
    // // 乙方解约赔偿
    // // 乙方无法执行赔偿
    // // 乙方未结算赔偿
    // // 甲方解约赔偿（30日前）
    // // 甲方解约赔偿（30日内）
    // // 甲方解约赔偿（执行中）
    // // 协商不成约定方式
    // backupType: 1, // 双方备案方式(1 or 2)
    // backupParty: '乙', // 备案方（如备案方式2，可选甲或乙，默认乙））
    // contractInfo: '', // 正本合同
    // executeContract: '', // 双方各执合同
    // partyASignTime: '2025-07-15', // 甲方签订日期
    // partyBSignTime: '2025-07-15', // 乙方签订日期
    // orderTime: '2025-07-15', // 零售平台下单时间
    // orderAddress: '上海', //签约地点
    // },
    // {
    // id: '202507124', // 工单号
    // partyAName: '甲方主体名称1', // 甲方主体名称
    // uploadTime: '2025-07-15', //提交时间
    // partyAUserName: '甲方经办人姓名', //甲方经办人姓名
    // partyAUserPhone: '甲方经办人电话',// 甲方经办人电话
    // confirmTime: '2025-07-15', //确认时间
    // partyBName:'苏州中鑫新能源有限公司', //乙方主体名称
    // partyBUserName: '董小燕', // 乙方经办人姓名
    // partyBUserPhone: '13814857279', // 乙方经办人电话
    // partyBPhone: '0512-69997006', // 乙方电话
    // partyAContractId: '666666342', // 甲方合同编号
    // partyBContractId: '123125664343', // 乙方合同编号
    // contractConfirmTime: '2025-07-15', //合同签订日期

    // partyANumber: '', // 甲方统一社会信用代码
    // partyAAddress: '', // 甲方公司住所
    // partyALeaderName: '' ,//甲方法人
    // partyABankName: '', // 甲方开户银行
    // partyABankAccount: '', // 甲方开户账号
    // partyAUserEmail: '', // 甲方经办人联系邮箱
    // partyAUsedElectric: [
    //     {
    //     address: '地址A',
    //     addressNumber: 'xxx'
    //     },
    //     {
    //     address: '地址B',
    //     addressNumber: 'xxx'
    //     }
    // ], // 甲方用电地址（可多个） 甲方用电地址对应户号（可多个）
    
    // partyAAddress: '', // 甲方公司住所
    // contractStartTime: '2025-07-15', //交易开始时间
    // contractEndTime: '2025-07-15', // 交易结束时间
    // totalElectric: '10000', //合计电量
    // packageType: '', //套餐类型
    // packageName: '绿电固定价格', // 套餐名称 (绿电固定价格 or 比例分成 or 价差浮动) 
    // packageInfo: {

    // }, // 不同结构
    // month: '', //月份
    // monthUsedElectric: '', // 分月用电量
    // // 用电量正负偏差
    // // 用电量超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电量超出负偏差比例
    // // 用电量负偏差外价格
    // // 是否约定执行标准用电曲线
    // // 用电曲线修改期限
    // // 用电曲线正负偏差
    // // 用电曲线超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电曲线超出负偏差比例
    // // 用电曲线负偏差外价格
    // // 其他补充约定
    // // 乙方解约赔偿
    // // 乙方无法执行赔偿
    // // 乙方未结算赔偿
    // // 甲方解约赔偿（30日前）
    // // 甲方解约赔偿（30日内）
    // // 甲方解约赔偿（执行中）
    // // 协商不成约定方式
    // backupType: 1, // 双方备案方式(1 or 2)
    // backupParty: '乙', // 备案方（如备案方式2，可选甲或乙，默认乙））
    // contractInfo: '', // 正本合同
    // executeContract: '', // 双方各执合同
    // partyASignTime: '2025-07-15', // 甲方签订日期
    // partyBSignTime: '2025-07-15', // 乙方签订日期
    // orderTime: '2025-07-15', // 零售平台下单时间
    // orderAddress: '上海', //签约地点
    // },
    // {
    // id: '202507155', // 工单号
    // partyAName: '甲方主体名称1', // 甲方主体名称
    // uploadTime: '2025-07-15', //提交时间
    // partyAUserName: '甲方经办人姓名', //甲方经办人姓名
    // partyAUserPhone: '甲方经办人电话',// 甲方经办人电话
    // confirmTime: '2025-07-15', //确认时间
    // partyBName:'苏州中鑫新能源有限公司', //乙方主体名称
    // partyBUserName: '董小燕', // 乙方经办人姓名
    // partyBUserPhone: '13814857279', // 乙方经办人电话
    // partyBPhone: '0512-69997006', // 乙方电话
    // partyAContractId: '99999181823', // 甲方合同编号
    // partyBContractId: '111111111', // 乙方合同编号
    // contractConfirmTime: '2025-07-15', //合同签订日期

    // partyANumber: '', // 甲方统一社会信用代码
    // partyAAddress: '', // 甲方公司住所
    // partyALeaderName: '' ,//甲方法人
    // partyABankName: '', // 甲方开户银行
    // partyABankAccount: '', // 甲方开户账号
    // partyAUserEmail: '', // 甲方经办人联系邮箱
    // partyAUsedElectric: [
    //     {
    //     address: '地址A',
    //     addressNumber: 'xxx'
    //     },
    //     {
    //     address: '地址B',
    //     addressNumber: 'xxx'
    //     }
    // ], // 甲方用电地址（可多个） 甲方用电地址对应户号（可多个）
    
    // partyAAddress: '', // 甲方公司住所
    // contractStartTime: '2025-07-15', //交易开始时间
    // contractEndTime: '2025-07-15', // 交易结束时间
    // totalElectric: '10000', //合计电量
    // packageType: '', //套餐类型
    // packageName: '绿电固定价格', // 套餐名称 (绿电固定价格 or 比例分成 or 价差浮动) 
    // packageInfo: {

    // }, // 不同结构
    // month: '', //月份
    // monthUsedElectric: '', // 分月用电量
    // // 用电量正负偏差
    // // 用电量超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电量超出负偏差比例
    // // 用电量负偏差外价格
    // // 是否约定执行标准用电曲线
    // // 用电曲线修改期限
    // // 用电曲线正负偏差
    // // 用电曲线超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电曲线超出负偏差比例
    // // 用电曲线负偏差外价格
    // // 其他补充约定
    // // 乙方解约赔偿
    // // 乙方无法执行赔偿
    // // 乙方未结算赔偿
    // // 甲方解约赔偿（30日前）
    // // 甲方解约赔偿（30日内）
    // // 甲方解约赔偿（执行中）
    // // 协商不成约定方式
    // backupType: 1, // 双方备案方式(1 or 2)
    // backupParty: '乙', // 备案方（如备案方式2，可选甲或乙，默认乙））
    // contractInfo: '', // 正本合同
    // executeContract: '', // 双方各执合同
    // partyASignTime: '2025-07-15', // 甲方签订日期
    // partyBSignTime: '2025-07-15', // 乙方签订日期
    // orderTime: '2025-07-15', // 零售平台下单时间
    // orderAddress: '上海', //签约地点
    // },
    // {
    // id: '2025073256', // 工单号
    // partyAName: '甲方主体名称1', // 甲方主体名称
    // uploadTime: '2025-07-15', //提交时间
    // partyAUserName: '甲方经办人姓名', //甲方经办人姓名
    // partyAUserPhone: '甲方经办人电话',// 甲方经办人电话
    // confirmTime: '2025-07-15', //确认时间
    // partyBName:'苏州中鑫新能源有限公司', //乙方主体名称
    // partyBUserName: '董小燕', // 乙方经办人姓名
    // partyBUserPhone: '13814857279', // 乙方经办人电话
    // partyBPhone: '0512-69997006', // 乙方电话
    // partyAContractId: '111111111', // 甲方合同编号
    // partyBContractId: '111111111', // 乙方合同编号
    // contractConfirmTime: '2025-07-15', //合同签订日期

    // partyANumber: '', // 甲方统一社会信用代码
    // partyAAddress: '', // 甲方公司住所
    // partyALeaderName: '' ,//甲方法人
    // partyABankName: '', // 甲方开户银行
    // partyABankAccount: '', // 甲方开户账号
    // partyAUserEmail: '', // 甲方经办人联系邮箱
    // partyAUsedElectric: [
    //     {
    //     address: '地址A',
    //     addressNumber: 'xxx'
    //     },
    //     {
    //     address: '地址B',
    //     addressNumber: 'xxx'
    //     }
    // ], // 甲方用电地址（可多个） 甲方用电地址对应户号（可多个）
    
    // partyAAddress: '', // 甲方公司住所
    // contractStartTime: '2025-07-15', //交易开始时间
    // contractEndTime: '2025-07-15', // 交易结束时间
    // totalElectric: '10000', //合计电量
    // packageType: '', //套餐类型
    // packageName: '绿电固定价格', // 套餐名称 (绿电固定价格 or 比例分成 or 价差浮动) 
    // packageInfo: {

    // }, // 不同结构
    // month: '', //月份
    // monthUsedElectric: '', // 分月用电量
    // // 用电量正负偏差
    // // 用电量超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电量超出负偏差比例
    // // 用电量负偏差外价格
    // // 是否约定执行标准用电曲线
    // // 用电曲线修改期限
    // // 用电曲线正负偏差
    // // 用电曲线超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电曲线超出负偏差比例
    // // 用电曲线负偏差外价格
    // // 其他补充约定
    // // 乙方解约赔偿
    // // 乙方无法执行赔偿
    // // 乙方未结算赔偿
    // // 甲方解约赔偿（30日前）
    // // 甲方解约赔偿（30日内）
    // // 甲方解约赔偿（执行中）
    // // 协商不成约定方式
    // backupType: 1, // 双方备案方式(1 or 2)
    // backupParty: '乙', // 备案方（如备案方式2，可选甲或乙，默认乙））
    // contractInfo: '', // 正本合同
    // executeContract: '', // 双方各执合同
    // partyASignTime: '2025-07-15', // 甲方签订日期
    // partyBSignTime: '2025-07-15', // 乙方签订日期
    // orderTime: '2025-07-15', // 零售平台下单时间
    // orderAddress: '上海', //签约地点
    // },
    // {
    // id: '20212071157', // 工单号
    // partyAName: '甲方主体名称1', // 甲方主体名称
    // uploadTime: '2025-07-15', //提交时间
    // partyAUserName: '甲方经办人姓名', //甲方经办人姓名
    // partyAUserPhone: '甲方经办人电话',// 甲方经办人电话
    // confirmTime: '2025-07-15', //确认时间
    // partyBName:'苏州中鑫新能源有限公司', //乙方主体名称
    // partyBUserName: '董小燕', // 乙方经办人姓名
    // partyBUserPhone: '13814857279', // 乙方经办人电话
    // partyBPhone: '0512-69997006', // 乙方电话
    // partyAContractId: '998161253', // 甲方合同编号
    // partyBContractId: '111111111', // 乙方合同编号
    // contractConfirmTime: '2025-07-15', //合同签订日期

    // partyANumber: '', // 甲方统一社会信用代码
    // partyAAddress: '', // 甲方公司住所
    // partyALeaderName: '' ,//甲方法人
    // partyABankName: '', // 甲方开户银行
    // partyABankAccount: '', // 甲方开户账号
    // partyAUserEmail: '', // 甲方经办人联系邮箱
    // partyAUsedElectric: [
    //     {
    //     address: '地址A',
    //     addressNumber: 'xxx'
    //     },
    //     {
    //     address: '地址B',
    //     addressNumber: 'xxx'
    //     }
    // ], // 甲方用电地址（可多个） 甲方用电地址对应户号（可多个）
    
    // partyAAddress: '', // 甲方公司住所
    // contractStartTime: '2025-07-15', //交易开始时间
    // contractEndTime: '2025-07-15', // 交易结束时间
    // totalElectric: '10000', //合计电量
    // packageType: '', //套餐类型
    // packageName: '绿电固定价格', // 套餐名称 (绿电固定价格 or 比例分成 or 价差浮动) 
    // packageInfo: {

    // }, // 不同结构
    // month: '', //月份
    // monthUsedElectric: '', // 分月用电量
    // // 用电量正负偏差
    // // 用电量超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电量超出负偏差比例
    // // 用电量负偏差外价格
    // // 是否约定执行标准用电曲线
    // // 用电曲线修改期限
    // // 用电曲线正负偏差
    // // 用电曲线超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电曲线超出负偏差比例
    // // 用电曲线负偏差外价格
    // // 其他补充约定
    // // 乙方解约赔偿
    // // 乙方无法执行赔偿
    // // 乙方未结算赔偿
    // // 甲方解约赔偿（30日前）
    // // 甲方解约赔偿（30日内）
    // // 甲方解约赔偿（执行中）
    // // 协商不成约定方式
    // backupType: 1, // 双方备案方式(1 or 2)
    // backupParty: '乙', // 备案方（如备案方式2，可选甲或乙，默认乙））
    // contractInfo: '', // 正本合同
    // executeContract: '', // 双方各执合同
    // partyASignTime: '2025-07-15', // 甲方签订日期
    // partyBSignTime: '2025-07-15', // 乙方签订日期
    // orderTime: '2025-07-15', // 零售平台下单时间
    // orderAddress: '上海', //签约地点
    // },
    // {
    // id: '202507158', // 工单号
    // partyAName: '甲方主体名称1', // 甲方主体名称
    // uploadTime: '2025-07-15', //提交时间
    // partyAUserName: '甲方经办人姓名', //甲方经办人姓名
    // partyAUserPhone: '甲方经办人电话',// 甲方经办人电话
    // confirmTime: '2025-07-15', //确认时间
    // partyBName:'苏州中鑫新能源有限公司', //乙方主体名称
    // partyBUserName: '董小燕', // 乙方经办人姓名
    // partyBUserPhone: '13814857279', // 乙方经办人电话
    // partyBPhone: '0512-69997006', // 乙方电话
    // partyAContractId: '111111111', // 甲方合同编号
    // partyBContractId: '111111111', // 乙方合同编号
    // contractConfirmTime: '2025-07-15', //合同签订日期

    // partyANumber: '', // 甲方统一社会信用代码
    // partyAAddress: '', // 甲方公司住所
    // partyALeaderName: '' ,//甲方法人
    // partyABankName: '', // 甲方开户银行
    // partyABankAccount: '', // 甲方开户账号
    // partyAUserEmail: '', // 甲方经办人联系邮箱
    // partyAUsedElectric: [
    //     {
    //     address: '地址A',
    //     addressNumber: 'xxx'
    //     },
    //     {
    //     address: '地址B',
    //     addressNumber: 'xxx'
    //     }
    // ], // 甲方用电地址（可多个） 甲方用电地址对应户号（可多个）
    
    // partyAAddress: '', // 甲方公司住所
    // contractStartTime: '2025-07-15', //交易开始时间
    // contractEndTime: '2025-07-15', // 交易结束时间
    // totalElectric: '10000', //合计电量
    // packageType: '', //套餐类型
    // packageName: '绿电固定价格', // 套餐名称 (绿电固定价格 or 比例分成 or 价差浮动) 
    // packageInfo: {

    // }, // 不同结构
    // month: '', //月份
    // monthUsedElectric: '', // 分月用电量
    // // 用电量正负偏差
    // // 用电量超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电量超出负偏差比例
    // // 用电量负偏差外价格
    // // 是否约定执行标准用电曲线
    // // 用电曲线修改期限
    // // 用电曲线正负偏差
    // // 用电曲线超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电曲线超出负偏差比例
    // // 用电曲线负偏差外价格
    // // 其他补充约定
    // // 乙方解约赔偿
    // // 乙方无法执行赔偿
    // // 乙方未结算赔偿
    // // 甲方解约赔偿（30日前）
    // // 甲方解约赔偿（30日内）
    // // 甲方解约赔偿（执行中）
    // // 协商不成约定方式
    // backupType: 1, // 双方备案方式(1 or 2)
    // backupParty: '乙', // 备案方（如备案方式2，可选甲或乙，默认乙））
    // contractInfo: '', // 正本合同
    // executeContract: '', // 双方各执合同
    // partyASignTime: '2025-07-15', // 甲方签订日期
    // partyBSignTime: '2025-07-15', // 乙方签订日期
    // orderTime: '2025-07-15', // 零售平台下单时间
    // orderAddress: '上海', //签约地点
    // },
    // {
    // id: '202507159', // 工单号
    // partyAName: '甲方主体名称1', // 甲方主体名称
    // uploadTime: '2025-07-15', //提交时间
    // partyAUserName: '甲方经办人姓名', //甲方经办人姓名
    // partyAUserPhone: '甲方经办人电话',// 甲方经办人电话
    // confirmTime: '2025-07-15', //确认时间
    // partyBName:'苏州中鑫新能源有限公司', //乙方主体名称
    // partyBUserName: '董小燕', // 乙方经办人姓名
    // partyBUserPhone: '13814857279', // 乙方经办人电话
    // partyBPhone: '0512-69997006', // 乙方电话
    // partyAContractId: '111111111', // 甲方合同编号
    // partyBContractId: '111111111', // 乙方合同编号
    // contractConfirmTime: '2025-07-15', //合同签订日期

    // partyANumber: '', // 甲方统一社会信用代码
    // partyAAddress: '', // 甲方公司住所
    // partyALeaderName: '' ,//甲方法人
    // partyABankName: '', // 甲方开户银行
    // partyABankAccount: '', // 甲方开户账号
    // partyAUserEmail: '', // 甲方经办人联系邮箱
    // partyAUsedElectric: [
    //     {
    //     address: '地址A',
    //     addressNumber: 'xxx'
    //     },
    //     {
    //     address: '地址B',
    //     addressNumber: 'xxx'
    //     }
    // ], // 甲方用电地址（可多个） 甲方用电地址对应户号（可多个）
    
    // partyAAddress: '', // 甲方公司住所
    // contractStartTime: '2025-07-15', //交易开始时间
    // contractEndTime: '2025-07-15', // 交易结束时间
    // totalElectric: '10000', //合计电量
    // packageType: '', //套餐类型
    // packageName: '绿电固定价格', // 套餐名称 (绿电固定价格 or 比例分成 or 价差浮动) 
    // packageInfo: {

    // }, // 不同结构
    // month: '', //月份
    // monthUsedElectric: '', // 分月用电量
    // // 用电量正负偏差
    // // 用电量超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电量超出负偏差比例
    // // 用电量负偏差外价格
    // // 是否约定执行标准用电曲线
    // // 用电曲线修改期限
    // // 用电曲线正负偏差
    // // 用电曲线超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电曲线超出负偏差比例
    // // 用电曲线负偏差外价格
    // // 其他补充约定
    // // 乙方解约赔偿
    // // 乙方无法执行赔偿
    // // 乙方未结算赔偿
    // // 甲方解约赔偿（30日前）
    // // 甲方解约赔偿（30日内）
    // // 甲方解约赔偿（执行中）
    // // 协商不成约定方式
    // backupType: 1, // 双方备案方式(1 or 2)
    // backupParty: '乙', // 备案方（如备案方式2，可选甲或乙，默认乙））
    // contractInfo: '', // 正本合同
    // executeContract: '', // 双方各执合同
    // partyASignTime: '2025-07-15', // 甲方签订日期
    // partyBSignTime: '2025-07-15', // 乙方签订日期
    // orderTime: '2025-07-15', // 零售平台下单时间
    // orderAddress: '上海', //签约地点
    // },
    // {
    // id: '2025071510', // 工单号
    // partyAName: '甲方主体名称1', // 甲方主体名称
    // uploadTime: '2025-07-15', //提交时间
    // partyAUserName: '甲方经办人姓名', //甲方经办人姓名
    // partyAUserPhone: '甲方经办人电话',// 甲方经办人电话
    // confirmTime: '2025-07-15', //确认时间
    // partyBName:'苏州中鑫新能源有限公司', //乙方主体名称
    // partyBUserName: '董小燕', // 乙方经办人姓名
    // partyBUserPhone: '13814857279', // 乙方经办人电话
    // partyBPhone: '0512-69997006', // 乙方电话
    // partyAContractId: '111111111', // 甲方合同编号
    // partyBContractId: '111111111', // 乙方合同编号
    // contractConfirmTime: '2025-07-15', //合同签订日期

    // partyANumber: '', // 甲方统一社会信用代码
    // partyAAddress: '', // 甲方公司住所
    // partyALeaderName: '' ,//甲方法人
    // partyABankName: '', // 甲方开户银行
    // partyABankAccount: '', // 甲方开户账号
    // partyAUserEmail: '', // 甲方经办人联系邮箱
    // partyAUsedElectric: [
    //     {
    //     address: '地址A',
    //     addressNumber: 'xxx'
    //     },
    //     {
    //     address: '地址B',
    //     addressNumber: 'xxx'
    //     }
    // ], // 甲方用电地址（可多个） 甲方用电地址对应户号（可多个）
    
    // partyAAddress: '', // 甲方公司住所
    // contractStartTime: '2025-07-15', //交易开始时间
    // contractEndTime: '2025-07-15', // 交易结束时间
    // totalElectric: '10000', //合计电量
    // packageType: '', //套餐类型
    // packageName: '绿电固定价格', // 套餐名称 (绿电固定价格 or 比例分成 or 价差浮动) 
    // packageInfo: {

    // }, // 不同结构
    // month: '', //月份
    // monthUsedElectric: '', // 分月用电量
    // // 用电量正负偏差
    // // 用电量超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电量超出负偏差比例
    // // 用电量负偏差外价格
    // // 是否约定执行标准用电曲线
    // // 用电曲线修改期限
    // // 用电曲线正负偏差
    // // 用电曲线超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电曲线超出负偏差比例
    // // 用电曲线负偏差外价格
    // // 其他补充约定
    // // 乙方解约赔偿
    // // 乙方无法执行赔偿
    // // 乙方未结算赔偿
    // // 甲方解约赔偿（30日前）
    // // 甲方解约赔偿（30日内）
    // // 甲方解约赔偿（执行中）
    // // 协商不成约定方式
    // backupType: 1, // 双方备案方式(1 or 2)
    // backupParty: '乙', // 备案方（如备案方式2，可选甲或乙，默认乙））
    // contractInfo: '', // 正本合同
    // executeContract: '', // 双方各执合同
    // partyASignTime: '2025-07-15', // 甲方签订日期
    // partyBSignTime: '2025-07-15', // 乙方签订日期
    // orderTime: '2025-07-15', // 零售平台下单时间
    // orderAddress: '上海', //签约地点
    // },
    // {
    // id: '2025071511', // 工单号
    // partyAName: '甲方主体名称1', // 甲方主体名称
    // uploadTime: '2025-07-15', //提交时间
    // partyAUserName: '甲方经办人姓名', //甲方经办人姓名
    // partyAUserPhone: '甲方经办人电话',// 甲方经办人电话
    // confirmTime: '2025-07-15', //确认时间
    // partyBName:'苏州中鑫新能源有限公司', //乙方主体名称
    // partyBUserName: '董小燕', // 乙方经办人姓名
    // partyBUserPhone: '13814857279', // 乙方经办人电话
    // partyBPhone: '0512-69997006', // 乙方电话
    // partyAContractId: '111111111', // 甲方合同编号
    // partyBContractId: '111111111', // 乙方合同编号
    // contractConfirmTime: '2025-07-15', //合同签订日期

    // partyANumber: '', // 甲方统一社会信用代码
    // partyAAddress: '', // 甲方公司住所
    // partyALeaderName: '' ,//甲方法人
    // partyABankName: '', // 甲方开户银行
    // partyABankAccount: '', // 甲方开户账号
    // partyAUserEmail: '', // 甲方经办人联系邮箱
    // partyAUsedElectric: [
    //     {
    //     address: '地址A',
    //     addressNumber: 'xxx'
    //     },
    //     {
    //     address: '地址B',
    //     addressNumber: 'xxx'
    //     }
    // ], // 甲方用电地址（可多个） 甲方用电地址对应户号（可多个）
    
    // partyAAddress: '', // 甲方公司住所
    // contractStartTime: '2025-07-15', //交易开始时间
    // contractEndTime: '2025-07-15', // 交易结束时间
    // totalElectric: '10000', //合计电量
    // packageType: '', //套餐类型
    // packageName: '绿电固定价格', // 套餐名称 (绿电固定价格 or 比例分成 or 价差浮动) 
    // packageInfo: {

    // }, // 不同结构
    // month: '', //月份
    // monthUsedElectric: '', // 分月用电量
    // // 用电量正负偏差
    // // 用电量超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电量超出负偏差比例
    // // 用电量负偏差外价格
    // // 是否约定执行标准用电曲线
    // // 用电曲线修改期限
    // // 用电曲线正负偏差
    // // 用电曲线超出正偏差比例
    // // 用电量正偏差外价格
    // // 用电曲线超出负偏差比例
    // // 用电曲线负偏差外价格
    // // 其他补充约定
    // // 乙方解约赔偿
    // // 乙方无法执行赔偿
    // // 乙方未结算赔偿
    // // 甲方解约赔偿（30日前）
    // // 甲方解约赔偿（30日内）
    // // 甲方解约赔偿（执行中）
    // // 协商不成约定方式
    // backupType: 1, // 双方备案方式(1 or 2)
    // backupParty: '乙', // 备案方（如备案方式2，可选甲或乙，默认乙））
    // contractInfo: '', // 正本合同
    // executeContract: '', // 双方各执合同
    // partyASignTime: '2025-07-15', // 甲方签订日期
    // partyBSignTime: '2025-07-15', // 乙方签订日期
    // orderTime: '2025-07-15', // 零售平台下单时间
    // orderAddress: '上海', //签约地点
    // }
]


export const response = 
{
  "success": true,
  "message": "合同列表获取成功",
  "data": [
    {
      "basic_info":{
        "contract_id": 1,
        "contract_current_status": "editing",
        "created_at": "2025-07-25T10:30:00.000000",
        "updated_at": "2025-07-26T10:30:00.000000",
        "created_by": "admin",
        "updated_by": "admin",
        "is_active": true
        },
      "contract_content":{
        "work_order_number": "202507250001",
        "confirmation_method": "数字证书",
        "party_a_contract_no": "A202507001",
        "party_b_contract_no": "B202507001",
        "submission_time": "2025-07-28T10:30:00.000000",
        "confirmation_time":  "2025-07-28T10:30:00.000000",

        "contract_sign_date": "2025-07-28",
        "party_a_sign_date": "2025-07-28",
        "party_b_sign_date": "2025-07-25",
        "order_time": "2025-07-25T10:30:00.000000",
        "sign_location": "苏州市工业园区",
        
        "additional_terms": "其他补充约定条款",
        "dispute_resolution_method": "option2",
        "filing_method": "option2",
        "filing_party": "乙",
        

        "party_b_termination_before30": 10,
        "party_b_termination_other": 30,
        "party_b_termination_active": 0.5,
        "party_a_termination_before30": 5,
        "party_a_termination_in30": 5,
        "party_a_termination_active": 1,
        "original_copies": 2,
        "duplicate_copies": 1,
      
        
        "party_a": {
          "party_a_id": 1,
          "company_name": "示例电力公司有限公司",
          "credit_code": "91320000MA1234567X",
          "company_address": "江苏省苏州市工业园区示例路123号",
          "legal_person": "李四",

          "depository_bank": "中国银行苏州分行",
          "bank_account_no": "1234567890123456789",
          
          "contact_email": "zhangsan@example.com",
          "contact_person": "张三",
          "contact_phone": "13800138000",

          "power_supply_info": [
            {
              "ps_id": 1,
              "power_supply_address": "江苏省苏州市工业园区厂房1号",
              "power_supply_number": "F123456"
            },
            {
              "ps_id": 2,
              "power_supply_address": "江苏省苏州市工业园区厂房2号",
              "power_supply_number": "F123456"
            }
          ],
          "is_active": true,
          "created_at": "2025-07-25T09:00:00.000000",
          "updated_at": "2025-07-25T09:00:00.000000",
          "created_by": "admin",
          "updated_by": "admin"
        },
        
        "party_b": {
          "party_b_id": 1,
          "config_name": "默认配置",

          "company_name": "苏州中鑫新能源有限公司",
          "credit_code": "91320594MA1MJ5815U",
          "company_address": "江苏省苏州工业园区工商行政管理局",
          "legal_person": "蔡剑俊",

          "contact_person": "董小燕",
          "contact_phone": "13814857279",
          "contact_email": "zhangsan@example.com",

          "depository_bank": "苏州建设银行苏州工业园区股份有限公司苏州工业园区支行",
          "bank_account_no": "32250198883600000649",

          
          "is_active": true,
          "is_default": true,
          "created_at": "2025-07-25T09:00:00.000000",
          "updated_at": "2025-07-25T09:00:00.000000",
          "created_by": "admin",
          "updated_by": "admin"
        },
        
        "electricity_quote": {
          "quote_type": "绿电固定价格",
          "quote_type_id": 1,
          "quote_details": {
            "fixed_price_ratio": 100,
            "market_transaction_price": 0.23,
            "price_limit": 0.57,
            "green_electricity_price": 0.46
          },

          "trade_start_time": "2025-08-01",
          "trade_end_time": "2025-12-31",
          "total_electricity": 120000.0,
          "monthly_electricity":{
            "2025-08": 24000.0,
            "2025-09": 24000.0,
            "2025-10": 24000.0,
            "2025-11": 24000.0,
            "2025-12": 24000.0
          },
          "electricity_deviation": 5,
          "positive_deviation_ratio": 5,
          "positive_deviation_price": 0.78,
          "negative_deviation_ratio": 5,
          "negative_deviation_price": 0.48,
          "standard_curve_method": false,
          "curve_modify_days": 30,
          "curve_deviation": 5,
          "curve_positive_ratio": 10,
          "curve_positive_price": 0.78,
          "curve_negative_ratio": 10,
          "curve_negative_price": 0.78
        }
      
      }
    },
    {
      "basic_info":{
        "contract_id": 4,
        "contract_current_status": "editing",
        "created_at": "2025-07-25T10:30:00.000000",
        "updated_at": "2025-07-26T10:30:00.000000",
        "created_by": "admin",
        "updated_by": "admin",
        "is_active": true
        },
      "contract_content":{
        "work_order_number": "202507250001",
        "confirmation_method": "数字证书",
        "party_a_contract_no": "A202507001",
        "party_b_contract_no": "B202507001",
        "submission_time": "2025-07-28T10:30:00.000000",
        "confirmation_time":  "2025-07-28T10:30:00.000000",

        "contract_sign_date": "2025-07-28",
        "party_a_sign_date": "2025-07-28",
        "party_b_sign_date": "2025-07-25",
        "order_time": "2025-07-25T10:30:00.000000",
        "sign_location": "苏州市工业园区",
        
        "additional_terms": "其他补充约定条款",
        "dispute_resolution_method": "option2",
        "filing_method": "option2",
        "filing_party": "乙",

        "party_b_termination_before30": 10,
        "party_b_termination_other": 30,
        "party_b_termination_active": 0.5,
        "party_a_termination_before30": 5,
        "party_a_termination_in30": 5,
        "party_a_termination_active": 1,
        "original_copies": 2,
        "duplicate_copies": 1,
        
        "party_a": {
          "party_a_id": 1,
          "company_name": "示例电力公司有限公司",
          "credit_code": "91320000MA1234567X",
          "company_address": "江苏省苏州市工业园区示例路123号",
          "legal_person": "李四",

          "depository_bank": "中国银行苏州分行",
          "bank_account_no": "1234567890123456789",
          
          "contact_email": "zhangsan@example.com",
          "contact_person": "张三",
          "contact_phone": "13800138000",

          "power_supply_info": [
            {
              "ps_id": 1,
              "power_supply_address": "江苏省苏州市工业园区厂房1号",
              "power_supply_number": "F123456"
            },
            {
              "ps_id": 2,
              "power_supply_address": "江苏省苏州市工业园区厂房2号",
              "power_supply_number": "F123456"
            }
          ],
          "is_active": true,
          "created_at": "2025-07-25T09:00:00.000000",
          "updated_at": "2025-07-25T09:00:00.000000",
          "created_by": "admin",
          "updated_by": "admin"
        },
        
        "party_b": {
          "party_b_id": 1,
          "config_name": "默认配置",

          "company_name": "苏州中鑫新能源有限公司",
          "credit_code": "91320594MA1MJ5815U",
          "company_address": "江苏省苏州工业园区工商行政管理局",
          "legal_person": "蔡剑俊",

          "contact_person": "董小燕",
          "contact_phone": "13814857279",
          "contact_email": "zhangsan@example.com",

          "depository_bank": "苏州建设银行苏州工业园区股份有限公司苏州工业园区支行",
          "bank_account_no": "32250198883600000649",

          
          "is_active": true,
          "is_default": true,
          "created_at": "2025-07-25T09:00:00.000000",
          "updated_at": "2025-07-25T09:00:00.000000",
          "created_by": "admin",
          "updated_by": "admin"
        },
        
        "electricity_quote": {
          "quote_type": "比例分成",
          "quote_type_id": 2,
          "quote_details": {
            "elec_cons_prop": 100,
            "dist_ref_price": 0.34,
            "avg_trans_price_prop": 20,
            "party_a_prop_below_long_term": 20,
            "party_b_prop_below_long_term": 10,
            "party_a_prop_above_long_term": 24,
            "party_b_prop_above_long_term": 25,
            "party_a_prop_below_monthly_bid": 20,
            "party_b_prop_below_monthly_bid": 10,
            "party_a_prop_above_monthly_bid": 30,
            "party_b_prop_above_monthly_bid": 40,
            "party_a_prop_below_agent_proc": 10,
            "party_b_prop_below_agent_proc": 15,
            "party_a_prop_above_agent_proc": 16,
            "party_b_prop_above_agent_proc": 20,
            "party_a_prop_below_intra_month": 10,
            "party_b_prop_below_intra_month": 10,
            "party_a_prop_above_intra_month": 20,
            "party_b_prop_above_intra_month": 20,
            "long_term_trans_limit": 0.34,
            "monthly_bid_limit": 0.34,
            "agent_proc_limit": 0.34,
            "intra_month_list_limit": 0.34,
            "green_elec_price": 0.34
          },

          "trade_start_time": "2025-08-01",
          "trade_end_time": "2025-12-31",
          "total_electricity": 120000.0,
          "monthly_electricity":{
            "2025-08": 24000.0,
            "2025-09": 24000.0,
            "2025-10": 24000.0,
            "2025-11": 24000.0,
            "2025-12": 24000.0
          },
          "electricity_deviation": 5,
          "positive_deviation_ratio": 5,
          "positive_deviation_price": 0.78,
          "negative_deviation_ratio": 5,
          "negative_deviation_price": 0.48,
          "standard_curve_method": false,
          "curve_modify_days": 30,
          "curve_deviation": 5,
          "curve_positive_ratio": 10,
          "curve_positive_price": 0.78,
          "curve_negative_ratio": 10,
          "curve_negative_price": 0.78
        }
      
      }
    },
    {
      "basic_info":{
        "contract_id": 3,
        "contract_current_status": "editing",
        "created_at": "2025-07-25T10:30:00.000000",
        "updated_at": "2025-07-26T10:30:00.000000",
        "created_by": "admin",
        "updated_by": "admin",
        "is_active": true
        },
      "contract_content":{
        "work_order_number": "202507250001",
        "confirmation_method": "数字证书",
        "party_a_contract_no": "A202507001",
        "party_b_contract_no": "B202507001",
        "submission_time": "2025-07-28T10:30:00.000000",
        "confirmation_time":  "2025-07-28T10:30:00.000000",

        "contract_sign_date": "2025-07-28",
        "party_a_sign_date": "2025-07-28",
        "party_b_sign_date": "2025-07-25",
        "order_time": "2025-07-25T10:30:00.000000",
        "sign_location": "苏州市工业园区",
        
        "additional_terms": "其他补充约定条款",
        "dispute_resolution_method": "option2",
        "filing_method": "option2",
        "filing_party": "乙",

        "party_b_termination_before30": 10,
        "party_b_termination_other": 30,
        "party_b_termination_active": 0.5,
        "party_a_termination_before30": 5,
        "party_a_termination_in30": 5,
        "party_a_termination_active": 1,
        "original_copies": 2,
        "duplicate_copies": 1,
        
        "party_a": {
          "party_a_id": 1,
          "company_name": "示例电力公司有限公司",
          "credit_code": "91320000MA1234567X",
          "company_address": "江苏省苏州市工业园区示例路123号",
          "legal_person": "李四",

          "depository_bank": "中国银行苏州分行",
          "bank_account_no": "1234567890123456789",
          
          "contact_email": "zhangsan@example.com",
          "contact_person": "张三",
          "contact_phone": "13800138000",

          "power_supply_info": [
            {
              "ps_id": 1,
              "power_supply_address": "江苏省苏州市工业园区厂房1号",
              "power_supply_number": "F123456"
            },
            {
              "ps_id": 2,
              "power_supply_address": "江苏省苏州市工业园区厂房2号",
              "power_supply_number": "F123456"
            }
          ],
          "is_active": true,
          "created_at": "2025-07-25T09:00:00.000000",
          "updated_at": "2025-07-25T09:00:00.000000",
          "created_by": "admin",
          "updated_by": "admin"
        },
        
        "party_b": {
          "party_b_id": 1,
          "config_name": "默认配置",

          "company_name": "苏州中鑫新能源有限公司",
          "credit_code": "91320594MA1MJ5815U",
          "company_address": "江苏省苏州工业园区工商行政管理局",
          "legal_person": "蔡剑俊",

          "contact_person": "董小燕",
          "contact_phone": "13814857279",
          "contact_email": "zhangsan@example.com",

          "depository_bank": "苏州建设银行苏州工业园区股份有限公司苏州工业园区支行",
          "bank_account_no": "32250198883600000649",

          
          "is_active": true,
          "is_default": true,
          "created_at": "2025-07-25T09:00:00.000000",
          "updated_at": "2025-07-25T09:00:00.000000",
          "created_by": "admin",
          "updated_by": "admin"
        },
        
        "electricity_quote": {
          "quote_type": "价差浮动",
          "quote_type_id": 3,
          
          "quote_details": {
            "price_diff_fluc_ratio": 100,
            "long_term_trans_ratio": 80,
            "long_term_trans_avg_price": 0.45,
            "monthly_bid_ratio": 30,
            "monthly_bid_clear_price": 0.50,
            "agent_proc_ratio": 50,
            "agent_avg_price": 0.78,
            "long_term_trans_limit": 0.50,
            "monthly_bid_limit": 0.50,
            "agent_proc_limit": 0.50,
            "intra_month_limit": 0.50,
            "green_elec_price": 0.45
          },

          "trade_start_time": "2025-08-01",
          "trade_end_time": "2025-12-31",
          "total_electricity": 120000.0,
          "monthly_electricity":{
            "2025-08": 24000.0,
            "2025-09": 24000.0,
            "2025-10": 24000.0,
            "2025-11": 24000.0,
            "2025-12": 24000.0
          },
          "electricity_deviation": 5,
          "positive_deviation_ratio": 5,
          "positive_deviation_price": 0.78,
          "negative_deviation_ratio": 5,
          "negative_deviation_price": 0.48,
          "standard_curve_method": false,
          "curve_modify_days": 30,
          "curve_deviation": 5,
          "curve_positive_ratio": 10,
          "curve_positive_price": 0.78,
          "curve_negative_ratio": 10,
          "curve_negative_price": 0.78
        }
      }
    }
  ],
  "total": 1,
  "page": 1,
  "page_size": 20,
  "total_pages": 1,
  "timestamp": "2025-07-25T12:00:00.000000"
}
