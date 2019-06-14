import { shallowMount } from '@vue/test-utils'
import HomePage from '@/components/HomePage.vue'
import ImageList from "@/components/ImageList";
import FileUpload from "@/components/FileUpload";
import Canvas from "@/components/Canvas";
import TextAsset from "@/components/TextAsset";

// hack method to mock fetch
// need to fix mock
global.fetch = () => Promise.resolve({
    json: () => {}
})

describe('HomePage.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(HomePage);
  })

  it('renders container', () => {
    expect(wrapper.find('div')).toBeTruthy();
  })

  it('renders all components', () => {
    expect(wrapper.find(ImageList)).toBeTruthy();
    expect(wrapper.find(FileUpload)).toBeTruthy();
    expect(wrapper.find(Canvas)).toBeTruthy();
    expect(wrapper.find(TextAsset)).toBeTruthy();
  })

  it('file upload adds to images', () => {
    const testImage = 'test.png';
    wrapper.find(FileUpload).vm.$emit('file-upload', testImage);
    expect(wrapper.vm.images).toEqual([testImage]);
  })

  it('can add text assets', () => {
    const testAsset = {text: '', id: 1};
    wrapper.find(TextAsset).vm.$emit('add-text', testAsset);
    expect(wrapper.vm.assets).toMatchSnapshot();
  })

  it('can add image assets', () => {
    const testAsset = {url: 'test.png', id: 2};
    wrapper.find(ImageList).vm.$emit('asset-click', testAsset);
    expect(wrapper.vm.assets).toMatchSnapshot();
  })

  describe('asset added', () => {
    beforeEach(() => {
      const testAsset = {text: '', id: 1};
      wrapper.find(TextAsset).vm.$emit('add-text', testAsset);
    })

    it('updates values when asset is moved', () => {
      const update = {
        id: 1, 
        offsetValues: {left: 10, top: 10}
      }
      wrapper.find(Canvas).vm.$emit('asset-moved', update);
      expect(wrapper.vm.assets).toMatchSnapshot();
    })

    it('can delete asset', () => {
      wrapper.find(Canvas).vm.$emit('delete-asset', 0);
      expect(wrapper.vm.assets).toEqual([]);
    })
  })
})
