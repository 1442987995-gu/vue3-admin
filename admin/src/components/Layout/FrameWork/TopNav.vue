<template>
     <div class="Top">
        <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="">
        <div class="trangle"></div>
     </div>
</template>
  
<script>
  export default {
      name:'TopNav'
  }
</script>
  
<style scoped>
.Top{
    width: 100vw;
    height: 50px;
    box-shadow: 0px  2px 3px 0px rgba(196, 192, 192, 0.2);
    position: relative;
    display: flex;
    align-items: center;
}
img{
    position: absolute;
    left: 1010px;
    width: 40px;
    height:40px;
    border-radius: 10px;
}
.trangle{
    width:0;
    height:0;
    border-top: 5px solid rgb(36, 236, 113);
    border-bottom: 5px solid rgb(255, 255, 255);
    border-left: 5px solid white;
    border-right: 5px solid white;
    position: absolute;
    left: 1060px;
    top:35px;
}
</style>