import Types from '../types';
import {_projectModels,doCallBack,handleData } from '../ActionUtil';
import ArrayUtil from '../../src/util/ArrayUtil';
import Utils from '../../src/util/Utils';

const API_URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const CANCEL_TOKENS = [];

/**
 * 发起搜索
 * @param inputKey 搜索key
 * @param pageSize
 * @param token 与该搜索关联的唯一token
 * @param favoriteDao
 * @param recommendKeys
 * @param callBack
 * @returns {function(*=)}
 */
export function onSearch(inputKey,pageSize,recommendKeys,callBack,token) {
    return dispatch => {
        dispatch({type: Types.SEARCH_REFRESH});
        fetch(genFetchUrl(inputKey)).then(response => {//如果任务取消，则不作任何处理
            console.log("in8in")
            return hasCancel(token) ? null : response.json();
        }).then(responseData => {
            console.log("888")
            if (hasCancel(token,true)) {//如果任务取消，则不做任何处理
                console.log('user cancel');
                return;
            }
            if(!responseData || !responseData.items || responseData.items.length === 0) {
                dispatch({type: Types.SEARCH_FAIL,message: `没找到关于${inputKey}的内容`})
                doCallBack(callBack,`没找到关于${inputKey}的项目`);
                return;
            }
            let items = responseData.items;
            console.log("items1",JSON.stringify(items))
            handleData(Types.SEARCH_REFRESH_SUCCESS,dispatch,"",{data: items},pageSize,{
                inputKey
            });
        }).catch(e => {
            console.log(e);
            dispatch({type: Types.SEARCH_FAIL,error: e})
        })
    }
}


 /**
  * 取消一个异步任务
  * @param token
  * @returns {function(*)}
  */
 export function onSearchCancel(token) {
     return dispatch => {
        CANCEL_TOKENS.push(token);
        dispatch({type: Types.SEARCH_CANCEL});
     }
 }

 /**
  * 加载更多
  * @param pageIndex 第几页
  * @param pageSize 每页展示条数
  * @param dataArray 原始数据
  * @param favoriteDao
  * @param callBack 回调函数，可以通过回调函数来向调用页面通信；比如异常信息展示，没有更多等待
  * @returns {function(*)}
  */
 export function onLoadMoreSearch(pageIndex,pageSize,dataArray=[],callBack) {
     return dispatch => {
         setTimeout(() => {//模拟网络请求
            if ((pageIndex-1) >= dataArray.length) {//已加载完全部数据
                if (typeof callBack === 'function') {
                    callBack('别扯了没有了')
                }
                dispatch({
                    type:Types.SEARCH_LOAD_MORE_FAIL,
                    error: 'no more',
                    pageIndex: --pageIndex
                })
            } else {
                //本次和载入的最大数量
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                _projectModels(dataArray.slice(0,max),data => {
                    dispatch({
                        type: Types.SEARCH_LOAD_MORE_SUCCESS,
                        pageIndex,
                        projectModels: data,
                    })
                })
            }
         },500)
     }
 }




  function genFetchUrl(key) {
      return API_URL + key + QUERY_STR;
  }

  /**
   * 检查token是否已经取消
   * @param token
   * @param isRemove
   * @returns {boolean}
   */
  function hasCancel(token,isRemove) {
      console.log("op")
      if (CANCEL_TOKENS.includes(token)) {
        isRemove && ArrayUtil.remove(CANCEL_TOKENS, token);
          return true;
      }
      return false;
  }