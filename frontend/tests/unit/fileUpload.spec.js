import { shallowMount } from '@vue/test-utils'
import FileUpload from '@/components/FileUpload.vue'

describe('FileUpload.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(FileUpload)
  })

  it('renders file input', () => {
    expect(wrapper.findAll('input').exists()).toBeTruthy()
  })

  it('preview image is hidden by default', () => {
    expect(wrapper.find('.preview-image').exists()).toBeFalsy();
  })

  describe('file added', () => {
    beforeEach(() => {
      wrapper.setData({
        file: 'test',
        filePreview: 'test'
      });
    })

    it('preview image is visible now', () => {
      expect(wrapper.find('.preview-image').exists()).toBeTruthy();
    })

    // having trouble mocking api call so test is incomplete
  })
})
