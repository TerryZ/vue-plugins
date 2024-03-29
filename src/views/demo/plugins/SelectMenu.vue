<template>
  <div class="card p-5">
    <h1>
      v-selectmenu
      <button
        type="button"
        class="btn btn-outline-secondary btn-sm"
        @click="$router.push({path: '/demo'});"
      >
        Back to List
      </button>
    </h1>

    <hr>

    <h2>Basic</h2>
    <h5 class="mt-3">
      Disabled
    </h5>
    <p>
      <button
        class="btn btn-danger me-3"
        @click="available = !available"
      >
        Toggle available(v-if)
      </button>
      <button
        class="btn btn-outline-secondary"
        @click="disabled = !disabled"
      >
        Toggle disabled
      </button>
    </p>
    <p>
      <v-selectmenu
        :data="listData"
        :disabled="disabled"
        @values="values"
        v-if="available"
      />
    </p>

    <h5 class="mt-5">
      Menu display direction
    </h5>
    <div class="row">
      <div class="col-md-4">
        <v-selectmenu
          :data="menu"
          type="regular"
          align="left"
        >
          <button
            type="button"
            class="btn btn-secondary"
          >
            Align left
          </button>
        </v-selectmenu>
      </div>
      <div class="col-md-4">
        <v-selectmenu
          :data="menu"
          type="regular"
          align="center"
        >
          <button
            type="button"
            class="btn btn-secondary"
          >
            Align center
          </button>
        </v-selectmenu>
      </div>
      <div class="col-md-4">
        <v-selectmenu
          :data="menu"
          type="regular"
          align="right"
        >
          <button
            type="button"
            class="btn btn-secondary"
          >
            Align right
          </button>
        </v-selectmenu>
      </div>
    </div>

    <h5 class="mt-5">
      Embedded menu
    </h5>
    <div class="row">
      <div class="col-md-6">
        <p>Regular menu with slot</p>
        <p>
          <button
            type="button"
            class="btn btn-secondary me-3"
            @click="changeData"
          >
            Menu with header
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="toMultipleLevel"
          >
            Multiple level
          </button>
        </p>
        <v-selectmenu
          :data="dynamic"
          type="regular"
          :embed="true"
        >
          <!-- custom menu caller -->
          <button
            type="button"
            class="btn btn-default"
          >
            SelectMenu
          </button>
          <!-- use slot to custom rendering menu row -->
          <template #row="{ row }">
            <span>
              <fa-icon
                class="fa-lg me-2"
                :icon="row.icon.split(',')"
                v-if="row.icon"
              />
              <span v-html="row.content" />
            </span>
          </template>
        </v-selectmenu>
      </div>
      <div class="col-md-6">
        <p>Advanced menu with slot and custom width</p>
        <v-selectmenu
          :data="groupData"
          :embed="true"
          :multiple="true"
          :width="250"
          key-field="id"
          v-model="value2"
        >
          <template #row="{ row }">
            {{ row.name }} {{ row.desc }}
          </template>
        </v-selectmenu>
      </div>
    </div>

    <h5 class="mt-5">
      Custom dropdown container width
    </h5>
    <p>
      <v-selectmenu
        :data="groupData"
        :width="300"
      />
    </p>

    <h5 class="mt-5">
      Mouse right click to call the menu
    </h5>
    <v-selectmenu
      :data="menu"
      type="regular"
      :full-width="true"
      :right-click="true"
    >
      <div
        class="jumbotron text-center"
        style="margin: 0;"
      >
        <h1><i class="fa fa-fw fa-mouse-pointer" /> mouse right click to call</h1>
      </div>
    </v-selectmenu>

    <h2 class="mt-5">
      Regular
    </h2>
    <h5 class="mt-3">
      Regular menu
    </h5>
    <p>
      <v-selectmenu
        :data="menu"
        type="regular"
        @show="showLog"
        @hide="hideLog"
      >
        <!-- use slot to custom rendering menu row -->
        <template #row="{ row }">
          <span>
            <fa-icon
              class="fa-lg me-2"
              :icon="row.icon.split(',')"
              v-if="row.icon"
            />
            <span v-html="row.content" />
          </span>
        </template>
      </v-selectmenu>
    </p>

    <h5 class="mt-5">
      Regular menu with header bar
    </h5>
    <p>
      <v-selectmenu
        :data="menu"
        type="regular"
        title="Menu with header"
      />
    </p>

    <h5 class="mt-5">
      Regular menu with group
    </h5>
    <p>
      <v-selectmenu
        :data="groupMenu"
        type="regular"
      />
    </p>

    <h5 class="mt-5">
      Regular menu with multiple level
    </h5>
    <p>
      <v-selectmenu
        :data="multiLevel"
        type="regular"
      >
        <template v-slot="{ show, disabled }">
          <button
            type="button"
            class="btn btn-primary"
          >
            SelectMenu (show: <b v-text="show" />, disabled: <b v-text="disabled" />)
          </button>
        </template>
      </v-selectmenu>
    </p>

    <h2 class="mt-5">
      Advanced
    </h2>
    <h5 class="mt-3">
      Advanced menu
    </h5>
    <pre class="p-4 bg-light">{{ JSON.stringify(value1, null, 4) }}</pre>
    <p>
      <v-selectmenu
        :data="listData"
        v-model="value1"
      />
    </p>

    <h5 class="mt-5">
      Advanced menu with slot
    </h5>
    <p>
      <v-selectmenu
        :data="listData"
        :max-selected="3"
        :multiple="true"
      >
        <template #row="{ row }">
          <div v-html="`${row.name} (${row.desc})`" />
        </template>
      </v-selectmenu>
    </p>

    <h5 class="mt-5">
      Advanced menu with group type
    </h5>
    <pre class="p-4 bg-light">{{ JSON.stringify(value2, null, 4) }}</pre>
    <p>
      <v-selectmenu
        :data="groupData"
        :max-selected="3"
        :multiple="true"
        key-field="id"
        v-model="value2"
      />
    </p>

    <br><br>

    <!--
    <h5>鼠标移动呼出菜单</h5>
    <v-selectmenu :data="menu" type="regular" :move="true" >
      <div class="jumbotron text-center" style="margin: 0;width: 1000px;">
        <h1><i class="fa fa-fw fa-arrows"></i> mouse move to call</h1>
      </div>
    </v-selectmenu>
    <br><br>
    -->
  </div>
</template>

<script>
import nbaTeams from '@test/sample/nba-teams'
import {
  regularBase,
  regularWithHeader,
  regularMultipleLevel,
  regularGroup
} from '@test/sample/menu/regular'
import { advancedGroup } from '@test/sample/menu/advanced'

export default {
  methods: {
    doSome () {
      // console.log(this.value1);
      this.$dlg.alert('you can do anything in callback!')
    },
    showLog () {
      console.log('show')
    },
    hideLog () {
      console.log('hide')
    },
    values (data) {
      console.log(data)
    },
    changeData () {
      this.dynamic = this.headerMenu
    },
    toMultipleLevel () {
      this.dynamic = this.multiLevel
    }
  },
  data () {
    return {
      value1: '7',
      value2: '3,5,17',
      dynamic: [],
      disabled: false,
      available: true,
      groupData: advancedGroup,
      listData: nbaTeams,
      menu: regularBase,
      headerMenu: regularWithHeader,
      multiLevel: regularMultipleLevel,
      groupMenu: regularGroup
    }
  },
  mounted () {
    this.dynamic = regularBase
  }
}
</script>
