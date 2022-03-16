<template>
  <div class="plugins">
    <h1>Updates</h1>
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="Updates Available"
        name="first"
      >
        <div
          v-for="(plugin, index) in updatePlugins"
          :key="index"
          class="plugin needs-update"
        >
          <el-link class="plugin-name">
            {{ plugin.name }}
          </el-link>
          <div class="plugin-version">
            {{ plugin.installedVersion }} -> {{ plugin.newVersion }}
          </div>
          <el-button :icon="Upload">
            Update
          </el-button>
          <el-link
            class="plugin-relate-notes"
            :href="plugin.releaseNotes"
          >
            Release Notes
          </el-link>
        </div>
        <el-button type="primary">
          Update All
        </el-button>
      </el-tab-pane>
      <el-tab-pane
        label="Updated Recently"
        name="second"
      >
        <div
          v-for="(plugin, index) in installedPlugins"
          :key="index"
          class="plugin installed"
        >
          <el-link
            :href="plugin.readme"
            class="plugin-name"
          >
            {{ plugin.name }}
          </el-link>
          <div class="plugin-version">
            {{ plugin.installedVersion }}
          </div>
          <el-link
            class="plugin-info"
            :href="plugin.readme"
          >
            Docs
          </el-link>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {Upload} from '@element-plus/icons-vue';


export default {
  props: {
    updatePlugins: {
      type: Array,
      default: () => ([
        {name: 'Lando CLI', installedVersion: 'v3.6.3', newVersion: 'v3.6.4', releaseNotes: 'someURL'},
        {name: 'PHP', installedVersion: 'v0.5.2', newVersion: 'v0.5.3', releaseNotes: 'someURL'},
        {name: 'Drupal', installedVersion: 'v0.5.1', newVersion: 'v0.5.4', releaseNotes: 'someURL'},
        {name: 'Laravel', installedVersion: 'v0.5.0', newVersion: 'v0.5.3', releaseNotes: 'someURL'},
      ]),
    },
    installedPlugins: {
      type: Array,
      default: () => ([
        {name: 'LAMP', installedVersion: 'v0.5.2', readme: 'someURL'},
        {name: 'Postgres', installedVersion: 'v0.5.1', readme: 'someURL'},
        {name: 'MariaDB', installedVersion: 'v0.5.0', readme: 'someURL'},
        {name: 'WordPress', installedVersion: 'v0.5.0', readme: 'someURL'},
      ]),
    },
    activeName: {
      type: String,
      default: 'first',
    },
  },
};

</script>

<style lang="scss">

.plugins {
  padding: 2rem;
  font-family: 'Lexend';
  h2 {
    border-bottom: 4px solid rgba(238, 237, 239, 0.3);
    margin-bottom: 0rem;
    padding-bottom: .5rem;
  }
  .plugins-section {
    margin: 3rem 0rem;
  }
  .plugin {
    display: flex;
    gap: 2rem;
    flex-basis: 5rem;
    align-items: center;
    border-bottom: 1px solid rgba(238, 237, 239, 0.3);
    padding: 1rem;
    .plugin-name {
      width: 5rem;
    }

    .plugin-info {
      justify-content: flex-end;
      flex-basis: 18rem;
      display: flex;
    }
  }
}
</style>
