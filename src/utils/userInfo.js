
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
  const breakPointVersion = 104
  if (v.includes('-')) {
    const numVersion = v.split('-')[0];
    const version = numVersion.replace(/\./g, '')
    return version > breakPointVersion
  }
  const version = v.replace(/\./g, '')
  return version > breakPointVersion
}