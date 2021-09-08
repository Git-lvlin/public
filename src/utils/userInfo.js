
export const getUserInfo = () => {
  return new Promise((resolve) => {
    this.$bridge.callHandler(
      'userInfo',
      {},
      ({code, data}) => {
        if (code === 0) {
          resolve(data)
        }
      },
    )
  })
}

export const goToApp = (baseUrl, router, param) => {
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

export const judgeVersionIsNew = () => {
  let version;
  if (this.$store.state.appInfo.appVersion.includes('-')) {
    version = this.$store.state.appInfo.appVersion.split('-')[0].replace(/\./g, '')
    console.log('非生产环境', version)
  } else {
    version = this.$store.state.appInfo.appVersion.replace(/\./g, '')
    console.log('生产环境', version)
  }
  return version > 104
}