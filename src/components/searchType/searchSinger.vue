<template>
  <div class="search-singer-container">
    <ul>
      
    </ul>
  </div>
</template>

<script>
/**
 * A module that define searchSinger a type of searchType
 * @exports searchSinger
 * @author oyh(Reusjs)
 */
export default {
  name: 'searchSinger',
  props: {
    singerList: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/searchSinger";
</style>