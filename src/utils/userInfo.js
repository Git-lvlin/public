
import jsBridge from '@/utils/jsBridge';

export const goToApp = (baseUrl, router, param, bridge) => {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      url: `${baseUrl}${router}${param}`,
    }
  }
  const zero = JSON.stringify(data);
  bridge.callHandler(
    'router',
    zero,
  )
}

export const savePicShare = (src, bridge) => {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      imgSrc: `${src}`,
    }
  }
  const zero = JSON.stringify(data);
  bridge.callHandler(
    'savePicShare',
    zero,
  )
}

export const setNavigationBarRightContent = (url, num, bridge) => {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      link: `${url}`,
      color: '#EE7D30',
      content: `已邀${num}人＞`
    }
  }
  const zero = JSON.stringify(data);
  bridge.callHandler(
    'setNavigationBarRightContent',
    zero,
  )
}

export const setNavigationBar = (backgroundColor='', {type='share', imageUrl=`https://dev-yeahgo.oss-cn-shenzhen.aliyuncs.com/publicMobile/common/share-icon.png`, data, title='', url='', color="#EE7D30", num=0}, {titleLabelColor, font, text}) => {
  
  if (type!=='invitation') {
    data = {
      link: url,
      color: color,
      content: `已邀${num}人＞`
    }
  }
  const data = {
    code: 0,
    msg: 'success',
    data: {
      navigatorBar: {
        backgroundColor: backgroundColor,
        rightButton: {
          type: type,
          imageUrl: imageUrl,
          title: title,
          data: data
        },
        titleLabel: {
          color: titleLabelColor,
          font: font,
          text: text,
        }
      }
    }
  }
  const param = JSON.stringify(data);
  jsBridge.callHandler(
    'setting',
    param,
  )
}



export const judgeVersionIsNew = (v) => {
  const breakPointVersion = 103
  if (v.includes('-')) {
    const numVersion = v.split('-')[0];
    const version = numVersion.replace(/\./g, '')
    return version > breakPointVersion
  }
  const version = v.replace(/\./g, '')
  return version > breakPointVersion
}

export const judgeVersionIsNewShare = (v) => {
  const breakPointVersion = 199
  if (v.includes('-')) {
    const numVersion = v.split('-')[0];
    const version = numVersion.replace(/\./g, '')
    return version > breakPointVersion
  }
  const version = v.replace(/\./g, '')
  return version > breakPointVersion
}