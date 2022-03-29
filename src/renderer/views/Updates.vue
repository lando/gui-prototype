<template>
  <div class="updates">
    <h1>Updates</h1>
    <el-tabs
      v-model="activeName"
      class="plugin-tabs"
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
            {{ plugin.installedVersion }} -> {{ plugin.newestVersion }}
          </div>
          <el-button :icon="Upload" @click="applyUpdate" v-if="plugin.name == 'Desktop App'">
            Update App
          </el-button>
          <el-button :icon="Upload" v-else>
            Update Plugin
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
            {{ plugin.installedVersion }} (Updated {{ plugin.lastUpdated }})
          </div>
          <el-link
            class="plugin-info"
            :href="plugin.repositoryUrl"
          >
            Docs
          </el-link>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {dayjs} from 'dayjs';
const {ipcRenderer} = window;

// Set Current App version
ipcRenderer.receive('renderer-app-version', data => {
  setAppVersion(data.version);
});
const appVersion = ref(null);
const setAppVersion = version => {
  appVersion.value = version;
};

// Check for Updates
ipcRenderer.send('check-for-updates');
ipcRenderer.receive('renderer-no-update', () => {
  console.log('App is up to date.');
});
ipcRenderer.receive('renderer-update-available', data => {
  console.log('Updated needed');
  console.log(data);
  setNewestVersion(data.version);
});
const newestVersion = ref(null);
const setNewestVersion = version => {
  newestVersion.value = version;
};

// Apply updates via click
function applyUpdate() {
  ipcRenderer.send('apply-update');
}

const updatePlugins = ref([
  {name: 'Desktop App', installedVersion: appVersion, newestVersion: newestVersion, releaseNotesUrl: 'someURL'},
  {name: 'Lando CLI', installedVersion: 'v3.6.3', newestVersion: 'v3.6.4', releaseNotesUrl: 'someURL'},
  {name: 'PHP', installedVersion: 'v0.5.2', newestVersion: 'v0.5.3', releaseNotesUrl: 'someURL'},
  {name: 'Drupal', installedVersion: 'v0.5.1', newestVersion: 'v0.5.4', releaseNotesUrl: 'someURL'},
  {name: 'Laravel', installedVersion: 'v0.5.0', newestVersion: 'v0.5.3', releaseNotesUrl: 'someURL'},
]);

const installedPlugins = ref([
  {name: 'LAMP', installedVersion: 'v0.5.2', repositoryUrl: 'someURL', lastUpdated: '2022-01-23T18:25:43.511Z'},
  {name: 'Postgres', installedVersion: 'v0.5.1', repositoryUrl: 'someURL', lastUpdated: '2022-02-03T18:25:43.511Z'},
  {name: 'MariaDB', installedVersion: 'v0.5.0', repositoryUrl: 'someURL', lastUpdated: '2022-03-09T18:25:43.511Z'},
  {name: 'WordPress', installedVersion: 'v0.5.0', repositoryUrl: 'someURL', lastUpdated: '2022-03-09T18:25:43.511Z'},
]);

const activeName = ref('first');

</script>

<style lang="scss" scoped>

.updates {
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
