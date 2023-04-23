export class Message {
  constructor (cid, mid, idx) {
    this.cid = cid
    this.mid = mid
    this.idx = idx
  }

  static fromString (str) {
    const [cid, mid, idx] = str.split(':')
    return new Message(cid, mid, idx)
  }

  toString () {
    return `${this.cid}:${this.mid}:${this.idx}`
  }
}
