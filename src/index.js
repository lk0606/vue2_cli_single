/**
 *
 * @param a {string}
  * @param b {string}
 */
export default function add(a, b) {
    let i = a.length - 1
    let j = b.length - 1

    let carry = 0 // 进位
    let ret = '' // 结果

    while (i>=0 || j>=0) {
        let x = 0 // a 的位数值 9 9 9
        let y = 0 // b 的位数值 1
        let sum

        if(i>=0) {
            x = a[i] - '0' // a 的 i 位 转换为数字
            i --
        }
        if(j>=0) {
            y = b[j] - '0' // b 的 j 位 转换为数字
            j --
        }

        sum = x + y + carry
        if(sum>=10) {
            carry = 1
            sum -= 10
        } else {
            carry = 0
        }

        // 1- 0 + '' 产生进位
        ret = sum + ret
    }

    if(carry) {
        ret = carry + ret
    }

    return ret
}
console.log(add('99', '1'))

// add('999', '1')