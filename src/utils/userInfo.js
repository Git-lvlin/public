
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