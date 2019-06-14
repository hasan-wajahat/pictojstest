import { shallowMount } from '@vue/test-utils'
import TextAsset from '@/components/TextAsset.vue'

describe('TextAsset.vue', () => {
  it('renders text correctly', () => {
    const wrapper = shallowMount(TextAsset);
    expect(wrapper.text()).toMatchSnapshot();
  })
  
  it('button emits proper event', () => {
    const wrapper = shallowMount(TextAsset);
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toMatchSnapshot();
  })
})
