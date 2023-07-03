<template>
  <header>
    <h1>E-movie</h1>
    <div class="header__search">
      <input type="text">
      <font-awesome-icon class="input__search-icon" icon="magnifying-glass"/>
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/">Accueil</router-link>
        </li>
        <li>
          <router-link to="/popular">Popular</router-link>
        </li>
        <li>
          <router-link to="/top-rated">Watchlist</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>


<style lang="scss" scoped>
header {
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: #222222;

  .header__search {
    width: 60%;
    border: solid 1px #e5e5e5;
    display: flex;
    align-items: center;
    margin: 0 1.5rem;
    padding: 0 0.5rem;
    border-radius: 9px;

    input {
      outline: none;
      height: 40px;
      border: none;
      background: none;
      width: 100%;
      color: #fff;
    }

    .input__search-icon {
      color: #e5e5e5;
    }
  }

  nav {
    ul {
      display: flex;
      list-style: none;

      li {
        margin: .5rem;

        a {
          color: #fff;
        }
      }
    }
  }
}
</style>
