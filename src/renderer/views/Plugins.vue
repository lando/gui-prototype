<template>
  <div class="plugins">
    <h1>Plugins</h1>
    <el-tabs
      v-model="activeName"
      class="plugin-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="Installed"
        name="first"
      >
        <el-row
          v-for="(row, index) in installedRows"
          :key="index"
        >
          <el-col
            v-for="plugin in row"
            :key="plugin.name"
            class="plugin"
            @click="goToPlugin(plugin)"
          >
            <img :src="plugin.image">
            <h3>{{ plugin.name }}</h3>
            <div class="plugin-last-updated">
              Last Updated: {{ plugin.lastUpdated }}
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane
        label="Marketplace"
        name="second"
      >
        <el-input
          v-model="marketsearch"
          v-on:input="querySearch"
          placeholder="Search"
        />
        <el-row
            v-for="(row, index) in availableRows"
            :key="index"
          >
          <el-col
            v-for="plugin in row"
            :key="plugin.name"
            class="plugin"
            @click="goToPlugin(plugin)"
          >
            <el-row>
              <img :src="plugin.image">
              <el-button>Install</el-button>
            </el-row>
            <h3>{{ plugin.name }}</h3>
            <div class="plugin-last-updated">
              Last Updated: {{ plugin.lastUpdated }}
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {_} from 'lodash';
import router from '../router.js';

const activeName = ref('first');
const marketsearch = ref('');
const installedPlugins = ref([
  {
    // MVP plugin.yml
    name: 'PHP',
    image: 'https://www.php.net/images/logos/new-php-logo.svg',
    description: '##THIS IS MARKDOWN. PHP is a popular scripting language that is especially suited for web development. It is often served by either apache or nginx. You can easily add it to your Lando app by adding an entry to the services top-level config in your Landofile.',
    releaseNotesUrl: 'https://URL/to/CHANGELOG.yml',
    // MVP package.json
    installedVersion: '0.5.2',
    repositoryUrl: 'https://github.com/lando/php',
    teaser: 'Runs PHP for your web applications.',
    author: 'Lando System, Inc.',
    contributors: [],
    // MVP Local User Data
    lastUpdated: '2022-01-23T18:25:43.511Z',
    // MVP Remote Sources (NPM)
    newestVersion: '0.5.2',
    // Future
    githubStars: 304, // Ability to start the project from dashboard? Auth-ed with GitHub?
    totalInstalls: 20303, // Get from NPM?
    sponsors: [],
    tags: ['Services', 'PHP'],
  },
]);

const availablePlugins = ref([
  {
    // MVP plugin.yml
    name: 'PHP',
    image: 'https://www.php.net/images/logos/new-php-logo.svg',
    description: '##THIS IS MARKDOWN. PHP is a popular scripting language that is especially suited for web development. It is often served by either apache or nginx. You can easily add it to your Lando app by adding an entry to the services top-level config in your Landofile.',
    releaseNotesUrl: 'https://URL/to/CHANGELOG.yml',
    // MVP package.json
    installedVersion: '0.5.2',
    repositoryUrl: 'https://github.com/lando/php',
    teaser: 'Runs PHP for your web applications.',
    author: 'Lando System, Inc.',
    contributors: [],
    // MVP Local User Data
    lastUpdated: '2022-01-23T18:25:43.511Z',
    // MVP Remote Sources (NPM)
    newestVersion: '0.5.2',
    // Future
    githubStars: 304, // Ability to start the project from dashboard? Auth-ed with GitHub?
    totalInstalls: 20303, // Get from NPM?
    sponsors: [],
    tags: ['Services', 'PHP'],
  },
  {
    // MVP plugin.yml
    name: 'Apache',
    image: 'https://www.apache.org/logos/res/httpd/default.png',
    description: '##THIS IS MARKDOWN. PHP is a popular scripting language that is especially suited for web development. It is often served by either apache or nginx. You can easily add it to your Lando app by adding an entry to the services top-level config in your Landofile.',
    releaseNotesUrl: 'https://URL/to/CHANGELOG.yml',
    // MVP package.json
    installedVersion: '0.5.2',
    repositoryUrl: 'https://github.com/lando/php',
    teaser: 'Runs PHP for your web applications.',
    author: 'Lando System, Inc.',
    contributors: [],
    // MVP Local User Data
    lastUpdated: '2022-01-23T18:25:43.511Z',
    // MVP Remote Sources (NPM)
    newestVersion: '0.5.2',
    // Future
    githubStars: 304, // Ability to start the project from dashboard? Auth-ed with GitHub?
    totalInstalls: 20303, // Get from NPM?
    sponsors: [],
    tags: ['Services', 'PHP'],
  },
  {
    // MVP plugin.yml
    name: 'Drupal',
    image: 'https://www.drupal.org/files/drupal-wordmark.png',
    description: '##THIS IS MARKDOWN. PHP is a popular scripting language that is especially suited for web development. It is often served by either apache or nginx. You can easily add it to your Lando app by adding an entry to the services top-level config in your Landofile.',
    releaseNotesUrl: 'https://URL/to/CHANGELOG.yml',
    // MVP package.json
    installedVersion: '0.5.2',
    repositoryUrl: 'https://github.com/lando/php',
    teaser: 'Runs PHP for your web applications.',
    author: 'Lando System, Inc.',
    contributors: [],
    // MVP Local User Data
    lastUpdated: '2022-01-23T18:25:43.511Z',
    // MVP Remote Sources (NPM)
    newestVersion: '0.5.2',
    // Future
    githubStars: 304, // Ability to start the project from dashboard? Auth-ed with GitHub?
    totalInstalls: 20303, // Get from NPM?
    sponsors: [],
    tags: ['Services', 'PHP'],
  },
]);
const filteredPlugins = ref([]);

// Chunk plugins into rows.
const availableRows = computed(() => {
  if (filteredPlugins.value.length > 0) {
    return _.chunk(filteredPlugins.value, 2);
  } else {
    return _.chunk(availablePlugins.value, 2);
  }
});
const installedRows = computed(() => {
  return _.chunk(installedPlugins.value, 2);
});

const querySearch = (queryString) => {
  console.log(queryString);
  const results = queryString
    ? availablePlugins.value.filter((plugin) => plugin.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
    : availablePlugins.value;
  // call callback function to return suggestions
  filteredPlugins.value = results;
}

const updatePluginList = (results) => {

}

const goToPlugin = plugin => {
  const url = '/plugins/' + _.camelCase(plugin.name);
  router.push(url);
};

</script>

<style lang="scss" scoped>
.plugins {
  width: 100%;
  max-width: 1000px;
  margin-right: 2rem;
  .el-input {
    max-width: 20rem;
  }
  .plugin {
    font-size: 1rem;
    border: 1px solid var(--el-border-color);
    border-radius: 10px;
    padding: 1rem;
    margin: 1rem 1rem 0 0;
    max-width: 300px;
    cursor: pointer;
    img {
      width: 100px;
    }
    h3 {
      margin: 0rem;
      font-size: 1rem;
    }
    .plugin-last-updated {
      font-size: .8rem;
    }
    .el-row {
      gap: 3rem;
      align-items: center;
    }
  }
  .el-tab-pane {
    min-width: 500px;
  }
}
</style>
