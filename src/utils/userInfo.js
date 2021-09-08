
export const getUserInfo = () => {
  return new Promise((resolve) => {
    console.log('bridge-start')
    this.$bridge.callHandler(
      'getUserInfo',
      {},
      ({code, data}) => {
        console.log('code', code, data)
        if (code === 0) {
          resolve(data)
        }
      },
    )
  })
}

export const goToApp = (baseUrl, router, param={}) => {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      url: `${baseUrl}${router}`,
      ...param,
    }
  }
  this.$bridge.callHandler(
    'router',
    data,
  )
}

export const judgeVersionIsNew = (v) => {
  console.log('appVersion', v)
  const breakPointVersion = 103
  if (v.includes('-')) {
    const numVersion = v.split('-')[0];
    console.log('numVersion', numVersion)
    const version = numVersion.replace(/\./g, '')
    console.log('非生产环境', version)
    return version > breakPointVersion
  }
  const version = v.replace(/\./g, '')
  console.log('生产环境', version)
  return version > breakPointVersion
}