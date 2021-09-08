
export const goToApp = (baseUrl, router, param, bridge) => {
  const data = {
    code: 0,
    msg: 'success',
    data: {
      url: `${baseUrl}${router}${param}`,
    }
  }
  const zero = JSON.stringify(data);
  console.log('zero', zero)
  console.log('bridge', bridge)
  bridge.callHandler(
    'router',
    zero,
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