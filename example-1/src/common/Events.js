/**
 * 全局回调事件控制器
 */
let events = {};

/**
 * 注册一个事件回调，name=事件名称，handler=事件处理器
 * tao_bp
 */
export const registerEvent = (name, handler) => {
    const listeners = events[name];
    if (!listeners) {
        events[name] = [];
    }
    events[name].push(handler);
}

/**
 * 移除一个事件调用
 */
export const unregisterEvent = (name, handler) => {
    const listeners = events[name];
    events[name] = listeners.filter(
        v => v !== handler
    );
}

/**
 * 向已注册的事件发送回调事件
 */
export const dispatchEvent = (name, params) => {
    const listeners = events[name];
    console.log(events)
    if (listeners && listeners.length > 0) {
        for (let i = 0; i < listeners.length; i++) {
            listeners[i](params);
        }
    }
}