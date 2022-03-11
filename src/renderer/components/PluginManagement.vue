<template>
  <div class="plugins">
    <h1>Plugins</h1> 
    <div class="plugins-section">
      <h2>Needs Update</h2>
      <div v-for="(plugin, index) in updatePlugins" :key="index" class="plugin needs-update">
        <div class="plugin-name">{{ plugin.name }}</div>
        <div class="plugin-version"> {{ plugin.installedVersion }} -> {{ plugin.newVersion }}</div>
        <a class="plugin-update button" href="">Update</a>
        <a class="plugin-relate-notes" :href="plugin.releaseNotes">Release Notes</a>
      </div>
    </div>
    
    <div class="plugins-section">
      <h2>Installed</h2>
      <div v-for="(plugin, index) in installedPlugins" :key="index" class="plugin installed">
        <div class="plugin-name">{{ plugin.name }}</div>
        <div class="plugin-version"> {{ plugin.installedVersion }}</div>
        <a class="plugin-info" :href="plugin.readme">Info</a>
      </div>
    </div>

    <div class="plugins-section">
      <h2>Update Options</h2>
      <div class="plugins-config">
        <div class="config-option">
          Automatic Patch Updates
          <label class="switch">
            <input v-model="config.patchUpdates" type="checkbox">
            <span  class="slider round"></span>
          </label>
        </div>

        <div class="config-option">
          Update Notifications
          <label class="switch">
            <input v-model="config.updateNotifications" type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default {
  props: {
    updatePlugins: {
      type: Array,
      default: () => ([
        {name: "PHP", installedVersion: "v0.5.2", newVersion: "v0.5.3", releaseNotes: "someURL"},
        {name: "Drupal", installedVersion: "v0.5.1", newVersion: "v0.5.4", releaseNotes: "someURL"},
        {name: "Laravel", installedVersion: "v0.5.0", newVersion: "v0.5.3", releaseNotes: "someURL"},
      ]),
    },
    installedPlugins: {
      type: Array,
      default: () => ([
        {name: "LAMP", installedVersion: "v0.5.2", readme: "someURL"},
        {name: "Postgres", installedVersion: "v0.5.1", readme: "someURL"},
        {name: "MariaDB", installedVersion: "v0.5.0",  readme: "someURL"},
        {name: "WordPress", installedVersion: "v0.5.0", readme: "someURL"},
      ]),
    },
    config: {
      type: Object,
      default: () => ({
        patchUpdates: true,
        updateNotifications: true
      })
    }
  }
}

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;700;800&display=swap');

// More things
$pink: #ed3f7a;
$background-dark: #261D2D;
$background-light: #fff;
$text-dark: #eeedef;


$space-grey: #49424E;
html {
  background: radial-gradient(122.92% 80.31% at 63.14% 4.75%, #412B6B 0%, #261D2D 100%);
  color: $text-dark;
  a {
    color: $text-dark;
  }
}

.plugins-config {
  display: flex;
  align-items: center;
  .config-option {
    margin: 1rem;
  }
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
  &.round {
    border-radius: 34px;
    &:before {
      border-radius: 50%;
    } 
  }
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}


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
    .button {
        padding: 0rem 2rem;
        border-radius: 42px;
        background: $pink;
        color: #fff;
        font-size: 1rem;
        font-weight: bold;
        display: inline-block;
        line-height: 2rem;
        height: 2rem;
        margin: 0rem;
        border: none;
        text-decoration: none;
    }
    .plugin-info {
      justify-content: flex-end;
      flex-basis: 18rem;
      display: flex;
    }
  }
}
</style>
