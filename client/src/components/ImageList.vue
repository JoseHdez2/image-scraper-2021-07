<template>
    <div class="card text-center m-3 overflow-auto">
      <h3 class="card-header">Image List</h3>
      <b-table
        id="my-table"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        small
      ></b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        @input="onPaginationChange"
      ></b-pagination>

      <div class="card-footer pb-0 pt-3">
        <p class="mt-3">Page {{ `${currentPage} of ${pages}` }} ( {{ rows }} images )</p>
      </div>
        <!-- <h3 class="card-header">Vue.js Pagination Tutorial & Example</h3>
        <div class="card-body">
            <div v-for="item in pageOfItems" :key="item.id">{{item.name}}</div>
        </div>
        <div class="card-footer pb-0 pt-3">
            <jw-pagination :items="exampleItems" @changePage="onChangePage"></jw-pagination>
        </div> -->
    </div>
</template>

<script>
// an example array of items to be paged
const items = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));

            // fetch(`api/images`)
            //   .then(response => response.json())
            //   .then(
            //     data => { items = data; alert(JSON.stringify(items)) }, 
            //     error => { console.error(error); console.dir(error); }
            //   );

export default {
    name: 'ImageList',
    data() {
      return {
        perPage: 5,
        currentPage: 1,
        items: items
      }
    },
    computed: {
      rows() {
        return this.items.length
      },
      pages() {
        return this.items.length / this.perPage
      }
    },
    onPaginationChange(page) {
      alert(page);
    }
};
</script>
