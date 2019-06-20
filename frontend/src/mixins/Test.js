export default {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      // eslint-disable-next-line
      console.log('hello from mixin!')
    }
  }
}