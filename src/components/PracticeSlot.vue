<template>
  <div>
    <div class="header"></div>
    <slot name="header"></slot>
    <div class="body">
      <h1>Title</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ipsam
        magnam inventore rerum ratione.
      </p>
      <slot></slot>
    </div>

    <div class="footer">
        <slot name="footer"></slot>
    </div>
  </div>
</template>
