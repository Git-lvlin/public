const App = {};

const isWeixin = () => { // 判断是否是微信
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') !== -1;
};

// App登录token
App.token = '';

export default App;
