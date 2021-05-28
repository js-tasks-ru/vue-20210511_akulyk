<template>
  <div id="app" class="page container">
    <div class="wrapper bg-grey">
      <header class="header">
        <nav>
          <ul>
            <li>
              <router-link to="/page-a">/page-a</router-link>
            </li>
            <li>
              <router-link to="/page-b">/page-b</router-link>
            </li>
            <li>
              <router-link to="/page-unknown">/page-unknown</router-link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <router-view/>
      </main>
      <footer class="footer">
        <div class="container">
          © 2021. learn.javascript.ru <a href="https://learn.javascript.ru/courses/vue">Vue.js Course</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style></style>
