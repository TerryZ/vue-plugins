// import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import { textTruncate } from '@/components/v-dialogs/utils/helper'

describe('v-dialogs 核心模块', () => {
  it('textTruncate(text, 10) 函数的文本切割结果应为 "这是一段用于演示的文..."', () => {
    const title = '这是一段用于演示的文本内容'
    expect(textTruncate(title, 10)).equal('这是一段用于演示的文...')
  })
})
