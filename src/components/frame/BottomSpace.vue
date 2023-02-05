<template>
    <div class='bottom'>
        <footer class='copyright'>
            <span>©2018-{{ fullYear }} fobogchod </span>
            <span>&nbsp;</span>
            <a href='http://beian.miit.gov.cn' target='_blank' rel='noopener noreferrer'>
                <i></i>
                <span>皖ICP备18020875号</span>
            </a>
        </footer>
    </div>
</template>

<script>

export default {
    data() {
        return {
            fullYear: new Date().getFullYear()
        }
    }
}
</script>

<style lang='scss' scoped>
.bottom {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  .copyright {
    min-height: 40px;
    line-height: 40px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;

    a {
      color: rgba(0, 0, 0, 0.45);
      text-decoration: none;

      i {
        display: inline-block;
        width: 14px;
        height: 16px;
        margin-right: 6px;
        background: url(https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/icon-police.png?v=md5) 0 0 no-repeat;
        vertical-align: middle;
        margin-top: -4px;
      }
    }

    a:hover {
      color: #222
    }
  }
}
</style>
