export class Message {
  constructor (cid, mid, idx) {
    this.cid = cid
    this.mid = +mid
    this.idx = +idx
  }

  validate() {
    if (this.cid === null) { throw Error(`cid malformed: ${this.cid}`)}
    if (this.mid === null || typeof(this.mid) !== 'number') { throw Error(`mid malformed: ${this.mid}`)}
    if (this.idx === null || typeof(this.mid) !== 'number') { throw Error(`idx malformed: ${this.idx}`)}
  }

  static fromString (str) {
    const [cid, mid, idx] = str.split(':')
    return new Message(cid, mid, idx)
  }

  toString () {
    return `${this.cid}:${this.mid}:${this.idx}`
  }
}
