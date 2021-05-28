const App = {};

const isWeixin = () => { // 判断是否是微信
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') !== -1;
};

// 是否是App打开
App.isApp = !!window.Android || (window.webkit && window.webkit.messageHandlers
  && window.webkit.messageHandlers.CHAT && !isWeixin());

// App类型
// eslint-disable-next-line no-nested-ternary
App.appType = window.Android ? 'android' : ((window.webkit && window.webkit.messageHandlers) ? 'ios' : '');

// App登录token
App.token = '';

// 执行对应App的方法
App.execute = (...args) => {
  // eslint-disable-next-line prefer-rest-params
  let executeStr = '';
  if (args.length > 0 && window.Android) {
    executeStr = `Android.${args[0]}(@)`;
  } else if (args.length > 0 && window.webkit && window.webkit.messageHandlers) {
    executeStr = `window.webkit.messageHandlers.${args[0]}.postMessage([@])`;
  } else {
    console.log('请在App调用方法');
    return;
  }
  if (args.length > 1) {
    for (let i = 1; i < args.length; i += 1) {
      executeStr = executeStr.replace('@', `args[${i}],@`);
    }
    executeStr = executeStr.replace(',@', '');
  } else {
    executeStr = executeStr.replace('@', '');
  }
  // eslint-disable-next-line no-eval
  eval(executeStr);
};

// 给App绑定执行方法
App.bind = (funName, callback) => {
  // eslint-disable-next-line no-multi-assign
  App[funName] = window[funName] = (...args) => {
    callback(args);
  };
};

// 获取App登录token
App.getToken = (callback) => {
  App.bind('set_token', callback);
  return App.execute('GETTOKEN');
};

// 打开App新的页面
App.toPage = (newUrl) => {
  if (App.appType === 'android') {
    window.Android.TO_NEW_PAGE(newUrl);
  } else {
    window.webkit.messageHandlers.TO_NEW_PAGE.postMessage([newUrl]);
  }
};

// 打开订单列表
App.toOrder = (type) => {
  if (App.appType === 'android') {
    window.Android.ORDER(type);
  } else {
    window.webkit.messageHandlers.ORDER.postMessage([type]);
  }
};

App.BACK_NEWPAGE = (url) => {
  if (App.appType === 'android') {
    window.Android.BACK_NEWPAGE(url);
  } else {
    window.webkit.messageHandlers.BACK_NEWPAGE.postMessage([url]);
  }
};

// 关闭页面
App.onKeyDown = () => App.execute('onKeyDown');

App.toChat = () => {
  if (App.appType === 'android') {
    window.Android.CHAT('1202730', '宾购直营店');
  } else {
    window.webkit.messageHandlers.CHAT.postMessage(['1202730', '宾购直营店']);
  }
};

export default App;
