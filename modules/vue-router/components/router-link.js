const routerLink = {
  name: 'routerLink',
  render(h) {
    return h(
      this.tag,
      {
        on: {
          click: this.handleClick
        },
      }
      ,
      this.$slots.default
    )
  },
  props: {
    to: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
  },
  methods: {
    handleClick() {
      this.$router.push(this.to)
    }
  }
}

export default routerLink