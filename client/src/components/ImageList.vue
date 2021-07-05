<template>
    <div class="card text-center m-3 overflow-auto">
      <h3 class="card-header">Image List</h3>
      <b-table
        id="my-table"
        :items="items"
        :per-page="0"
        :current-page="currentPage"
        small
      ></b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalItems"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>

      <div class="card-footer pb-0 pt-3">
        <p class="mt-3">Page {{ `${currentPage} of ${pages}` }} ( {{ rows }} images )</p>
      </div>
    </div>
</template>

<script>
// an example array of items to be paged
let items = [...Array(150).keys()].map(i => ({ id: (i+1), domain: `d${(i+1)}`, url: `u${(i+1)}` }));

export default {
    name: 'ImageList',
    data() {
      return {
        perPage: 5,
        currentPage: 1,
        totalItems: 0,
        items: items
      }
    },
    mounted() {
      this.fetchData().catch(error => {
        console.error(error)
      })
    },
    computed: {
      rows() {
        return this.totalItems;
      },
      pages() {
        return Math.ceil(this.rows / this.perPage);
      }
    },
    methods: {
      async fetchData() {
        this.items = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${this.currentPage}&_limit=${this.perPage}`)
          .then(res => {
            this.totalItems = parseInt(res.headers.get('x-total-count'), 10)

            return res.json()
          })
          .then(items => items)
      },
      // onPaginationChange(page) {

      //   fetch(`api/images?page=${page}`)
      //     .then(response => response.json())
      //     .then(
      //       data => { this.items = this.items.splice(); }, 
      //       error => { console.error(error); }
      //     );
      // }
    },
    watch: {
      currentPage: {
        handler: function(value) {
          this.fetchData().catch(error => {
            console.error(error)
          })
        }
      }
    }
};
</script>
