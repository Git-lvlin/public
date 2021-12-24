


export const shareGoToNewShare = (inviteCode, token, state, router) => {
  console.log('this.$store.state.appInfo', state.appInfo)
  const ua = window.navigator.userAgent.toLowerCase();
  let isWeixin = 0
  if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_'){
    isWeixin = 1
  }
  console.log('isWeixin', isWeixin)
  if (isWeixin || (!token && !state.appInfo.isApp)) {
    router.push({
      path: '/web/new-share',
      query: {
        inviteCode: inviteCode
      },
    });
    return
  }
}