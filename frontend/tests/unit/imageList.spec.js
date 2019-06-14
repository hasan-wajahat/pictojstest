import { shallowMount } from '@vue/test-utils'
import ImageList from '@/components/ImageList.vue'

const IMAGES = ['first', 'second'];

describe('ImageList.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(ImageList, {
      propsData: {
        images: IMAGES
      }
    });
  })

  it('renders correct number of images', () => {
    expect(wrapper.findAll('img').length).toEqual(IMAGES.length);
  })

  it('passes correct source to image', () => {
    expect(wrapper.find('img').attributes('src')).toBe(IMAGES[0]);
  })
  
  it('button emits proper event', () => {
    wrapper.find('li').trigger('click');
    expect(wrapper.emitted()).toMatchSnapshot();
  })
})
