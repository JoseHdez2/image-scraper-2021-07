<template>
    <div class="card text-center m-3 overflow-auto">
      <h3 class="card-header">Image List</h3>
      <div class="filter-row">
        <div style="width: 100px">
          <b-spinner v-if="domainFilterHasChanged" variant="primary" label="Spinning"></b-spinner>
        </div>
        <input style="height: 2em; width: 50%" v-model="domainFilter" v-debounce:1s="setDomainFilter" placeholder="Domain">
      </div>
      <b-pagination
        class="pagination"
        v-model="currentPage"
        :total-rows="totalItems"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
      <b-table
        id="my-table"
        :fields="fields"
        :items="items"
        :per-page="0"
        :current-page="currentPage"
        small
      ></b-table>
      <b-pagination
        class="pagination"
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
import { domain } from 'process';
export default {
    name: 'ImageList',
    data() {
      return {
        perPage: 50,
        currentPage: 1,
        totalItems: 0,
        fields: [
          { key: 'id', label: 'ID' },
          { key: 'url', label: 'Url' },
          { key: 'domain', label: 'Domain' },
        ],
        items: [],
        domainFilter: null,
        domainFilterHasChanged: false
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
        let url = `api/images?page=${this.currentPage}&limit=${this.perPage}`
        if(this.domainFilter) {
          url += `&domain=${this.domainFilter}`
        }
        this.domainFilterHasChanged = false;
        await fetch(url)
          .then(res => {
            // this.totalItems = parseInt(res.headers.get('x-total-count'), 10)
            return res.json();
          })
          .then(json => {
            this.totalItems = json.meta.totalItems;
            this.items = json.items;
            // this.items = json.items.map(it => {
            //   const item = {id: it.id, domain: it.domain, url: it.url}
            //   return item;
            // });
            console.log(this.items);
          })
      },
      setDomainFilter() {
        this.fetchData().catch(error => {
          console.error(error)
        })
      }
    },
    watch: {
      currentPage: {
        handler: function(value) {
          this.fetchData().catch(error => {
            console.error(error)
          })
        }
      },
      domainFilter: {
        handler: function(value) {
          this.domainFilterHasChanged = true;
        }
      }
    }
};
</script>

<style scoped>
  .domain-filter {
    width: 50%;
  }
  .filter-row {
    margin: 5px auto;
    display: flex; 
    flex-direction: row
  }
  .pagination {
    margin: 5px auto;
  }
</style>