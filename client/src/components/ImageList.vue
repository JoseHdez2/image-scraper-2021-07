<template>
    <div class="card text-center m-3 overflow-auto">
      <h3 class="card-header">Image List</h3>
      <input v-model="domainFilter" placeholder="Domain">
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
        items: {{ domainFilter }}
      </div>
    </div>
</template>

<script>
import { domain } from 'process';
export default {
    name: 'ImageList',
    data() {
      return {
        perPage: 5,
        currentPage: 1,
        totalItems: 0,
        items: [],
        domainFilter: null,
        awaitingSearch: false
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
      async fetchData(domainFilter) {
        let url = `api/images?page=${this.currentPage}`
        if(domainFilter) {
          url += `&domain=${domainFilter}`
        }
        this.items = await fetch(url)
          .then(res => {
            // this.totalItems = parseInt(res.headers.get('x-total-count'), 10)
            return res.json();
          })
          .then(json => {
            this.totalItems = json.meta.totalItems;
            this.items = json.items;
            console.log(this.items);
          })
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
      },
      domainFilter: function (domainFilter) {
        if (!this.awaitingSearch) {
          setTimeout(() => {
            this.fetchData(domainFilter);
            this.awaitingSearch = false;
          }, 1000); // 1 sec delay
        }
        this.awaitingSearch = true;
      },
    }
};
</script>
