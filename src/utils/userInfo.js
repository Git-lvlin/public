
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

export const getUserInfo = (bridge) => {
  return new Promise((resolve) => {
    bridge.callHandler('getUserInfo',{},(res) => {
      const d = JSON.parse(res)
      resolve(d.data)
    })
  })
}