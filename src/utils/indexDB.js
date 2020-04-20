/**
 * @author xiewenqiang | 2020/4/20
 * @description IndexDB 工具
 */

class IndexDB {
  _name = null // DB 的名称
  _indexRequest = null // 
  _indexDB = null // 表实例
  _storeName = null // 表名称
  _keyPath = null // 主键
  _transaction = null // 访问权限
  constructor(name, storeName, keyPath, transaction) {
    this._name = name
    this._storeName = storeName
    this._keyPath = keyPath
    this._transaction = transaction || 'readwrite'
    this.init()
  }
  get name() {
    return this._name
  }
  get storeName() {
    return this._storeName
  }
  get keyPath() {
    return this._keyPath
  }
  // 初始化创建indexDB的内容
  init() {
    this._indexRequest = window.indexedDB.open(this._name)
    return new Promise((resolve, reject) => {
      this._indexRequest.onerror = () => {
        reject({code: 1, msg: 'Local db fail.'})
      }
      this._indexRequest.onsuccess = () => {
        this._indexDB = this._indexRequest.request
        resolve({code: 0, msg: 'Local db success'})
      }
      // 创建和更新表是同一个
      this._indexRequest.onupgradeneeded = (event) => {
        this._indexDB = event.target.request // upgrade db
        if (!this._indexDB.objectStoreName.contains(this._storeName)) {
          this._indexDB.createObjectStore(this._storeName, { keyPath: this._keyPath })
        }
      }
    })
  }

  /**
   * 往数据库中添加一项 每个操作都是一个事务 affair
   * @param {*} object 
   * @param {*} index
   */
  add(object, index) {
    const affair = this._getTable().add(object)
    return new Promise((resolve, reject) => {
      affair.onsuccess = () => {
        resolve(true)
      }
      affair.onerror = () => {
        reject(false)
      }
    })                            
  }

  has(key) {
    const affair = this._getTable().get(key)
    return new Promise((resolve, reject) => {
      affair.onsuccess = () => {
        if (affair.result) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
      affair.onerror = () => {
        reject(new Error('事务错误。'))
      }
    })
  }

  get(key) {
    const affair= this._getTable().get(key)
    return new Promise((resolve, reject) => {
      affair.onsuccess = () => {
        if (affair.result) {
          resolve(affair.result)
        } else {
          resolve(null)
        }
      }
      affair.onerror = () => {
        reject(new Error('查询事务错误。'))
      }
    })
  }

  update(object) {
    let affair = this._getTable().put(object)
    return new Promise((resolve, reject) => {
      affair.onsuccess = () => {
        resolve(true)
      }
      affair.onerror = () => {
        reject(false)
      }
    })
  }

  remove(key) {
    let affair = this._getTable().delete(key)
    return new Promise((resolve, reject) => {
      affair.onsuccess = () => {
        resolve(true)
      }
      affair.onerror = () => {
        reject(false)
      }
    })
  }

  /**
   * @description 获取表
   */
  _getTable() {
    return this._indexDB.transaction([this._storeName], this._transaction).objectStore(this._storeName)
  }

}