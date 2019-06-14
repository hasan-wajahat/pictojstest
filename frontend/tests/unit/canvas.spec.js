import { shallowMount } from '@vue/test-utils'
import Canvas from '@/components/Canvas.vue'

const ASSETS = [
  {
    "url": "http://localhost:8000/images/uploads-1462948498227.png",
    "type": "image",
    "id": 1560493937920,
    "left": 184,
    "top": 174
  },
  {
    "type": "text",
    "text": "testing text",
    "id": 1560493940607,
    "left": 228,
    "top": 204
  }
];

describe('Canvas.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Canvas, {
      propsData: {
        assets: ASSETS
      }
    });
  })

  it('renders container', () => {
    expect(wrapper.find('div').exists()).toBeTruthy();
  })

  it('renders correct number of images and text', () => {
    expect(wrapper.findAll('img').length).toBe(1);
    expect(wrapper.findAll('textarea').length).toBe(1);
  })

  it('can delete asset', () => {
    wrapper.find('.delete-button').trigger('click');
    expect(wrapper.emitted()).toMatchSnapshot();
  })

  it('can save assets', () => {
    wrapper.find('.save-button').trigger('click');
    expect(wrapper.emitted()).toMatchSnapshot();
  })
})
