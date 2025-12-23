import React, { useState, useEffect, useCallback } from "react";
import service from "../utils/request";

/**
 *
 * @param {option} options 请求配置
 * @param {string} [options.url] 请求地址
 * @param {string} [options.method] 请求方法 post/get
 * @param {Object} [options.data] 请求体
 * @param {Object} [options.config] axios额外配置
 * @param {Boolean} [options.immediate] 是否立即请求
 */
function useRequest({
  url,
  method = "GET",
  data = {},
  config = {},
  immediate = true,
}) {
  const [loading, setLoading] = useState(false);
  const [rdata, setRdata] = useState(null);
  const [error, setError] = useState(null);
  const fetchData = useCallback(
    async (newOptions = {}) => {
      //只要在函数体中用到的参与数据流的都应该出现在依赖项列表中

      //新参数优先
      const finalUrl = newOptions.url || url;
      const finalMethod = newOptions.method || method;
      //请求的参数 请求方法是get时  axios的配置是params post时 axios的配置是data
      const finalData = newOptions.data || data;
      const finalConfig = { ...config, ...newOptions.config };
      //校验是否有url
      if (!finalUrl) {
        setError("请求地址url不能为空");
        return;
      }
      try {
        setLoading(true);
        //重置错误状态
        setError(null);
        const requestConfig = {
          url: finalUrl,
          method: finalMethod,
          ...finalConfig,
        };
        //区分get请求和post请求
        if (["GET"].includes(finalMethod.toUpperCase())) {
          requestConfig.params = finalData;
        } else {
          requestConfig.data = finalData;
        }
        const rdata = await service(requestConfig);
        setRdata(rdata.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [url, method, data, config]
  );
  useEffect(() => {
    //默认只要调用此自定义hook就会请求接口
    if (immediate) {
      fetchData();
    }
    return () => {};
  }, [fetchData, immediate]);
  return {
    loading,
    error,
    fetchData,
    rdata,
  };
}

export default useRequest;
