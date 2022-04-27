<template>
  <div class="back">
    <div class="lottery">
      <audio :src="mus" loop autoplay ref="MusicPlay"></audio>
      <div class="current">{{ current }}</div>

      <div>
        <button class="button start" v-if="!timer" @click="start">开始</button>
        <button class="button stop" v-if="timer" @click="stop">停止</button>
        <button class="button clear" @click="clearp">清空获奖人员</button>
      </div>
      <div class="table" v-if="history.length > 0">
        <tr v-for="(item, index) in history" :key="index" class="tr">
          <td class="lucky">幸运{{ index + 1 }}号</td>
          <td>{{ item }}</td>
        </tr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nianji_lotter",
  data() {
    return {
      numbers: [],
      current: "",
      timer: null,
      history: [],
      clicknum: 0,
      class1: [
        "陈语橙",
        "姜含笑",
        "林诗涵",
        "王思涵",
        "吴璠",
        "吴哲芸",
        "杨子萱",
        "姚奕",
        "余思琦",
        "张朔帆",
        "郑清爽",
        "郑卓妍",
        "黄睿晨",
        "蒋智航",
        "黎硕",
        "廖博远",
        "卢宝轩",
        "吕鑫磊",
        "欧阳高琦",
        "邱宇轩",
        "宋思源",
        "王毅皓",
        "谢昊卿",
        "喻梓瑞",
        "朱俊豪",
      ],
      class2: [
        "陈瑶",
        "陈雨茜",
        "范梓伊",
        "高菲洏",
        "郭钰涵",
        "黄佳冬",
        "李诗涵",
        "林佳怡",
        "缪琪乐",
        "倪乐怡",
        "乔锐涵",
        "沈思旋",
        "王婧赟",
        "王欣瑜",
        "陈佳航",
        "葛文恒",
        "郭航飞",
        "蒋俊浩",
        "金星宇",
        "潘宋豪",
        "孙仕鹏",
        "吴俊豪",
        "朱安盛",
        "庄正浩",
      ],
      class3: [
        "包恺妍",
        "曾子涵",
        "李铭惠",
        "刘忻雨",
        "刘紫易",
        "卢彦婕",
        "孟萌涵",
        "潘奕程",
        "钱泓豆",
        "汪乐怡",
        "王紫宜",
        "吴灏妍",
        "余婉伊",
        "程果",
        "高艺恒",
        "高振宇",
        "李家豪",
        "李忠轩",
        "马佳豪",
        "秦睿潇",
        "王家新",
        "王一飞",
        "王轶群",
        "严徐涵",
        "詹和玮",
      ],
      class4: [
        "陈欣怡",
        "陈雨萱",
        "程雨嘉",
        "黄禾和",
        "江哲涵",
        "潘梓萱",
        "沈熙妍",
        "舒煜煜",
        "王仪可",
        "吴湘芸",
        "徐慧瑄",
        "徐雨菲",
        "杨翠",
        "杨璐",
        "陈玄裕",
        "李泽豪",
        "刘嘉锐",
        "潘董俊",
        "施锦程",
        "谢守烜",
        "谢子航",
        "徐贶",
        "余子轩",
      ],
      selectClass: [0, 0, 0, 0],
      // mus:'../../static/sing.mp3'
      mus: "../../static/sing.mp3",
      // mus:'../assets/sing.mp3'
    };
  },
  computed: {
    neverWin() {
      let newlist = this.numbers.filter(
        (item) => !this.history.some((historyItem) => historyItem === item)
      );
      if (this.selectClass[0] >= 2)
        newlist = newlist.filter((item) => this.class1.indexOf(item) == -1);
      if (this.selectClass[1] >= 2)
        newlist = newlist.filter((item) => this.class2.indexOf(item) == -1);
      if (this.selectClass[2] >= 2)
        newlist = newlist.filter((item) => this.class3.indexOf(item) == -1);
      if (this.selectClass[3] >= 2)
        newlist = newlist.filter((item) => this.class4.indexOf(item) == -1);
      // let a=[1,2,3,4],b=[1,2]
      // console.log(a.filter((item)=>b.indexOf(item)==-1))
      console.log("当前", newlist);
      return newlist;
    },
  },
  methods: {
    random(minNum, maxNum) {
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
    },
    start() {
      // this.playAudio()
      this.$refs.MusicPlay.play();
      this.$refs.MusicPlay.volume = 0.2;
      if (this.neverWin.length < 1) {
        this.$refs.MusicPlay.pause();
        alert("人数已达上限，请清空中奖纪录!");
        return;
      }
      this.timer = setInterval(this.refresh, 100);
    },
    stop() {
      this.$refs.MusicPlay.pause();
      clearInterval(this.timer);
      this.timer = null;
      this.saveHistory();
    },
    refresh() {
      this.current = this.neverWin[this.random(0, this.neverWin.length - 1)];
    },
    saveHistory() {
      console.log(this.current);
      this.panDuanClass(this.current);
      this.history.push(this.current);
      localStorage.setItem("history", JSON.stringify(this.history));
    },
    readNumbers() {
      localStorage.clear();
      const numStr = localStorage.getItem("numbers");
      if (numStr) this.numbers = numStr.split("\n").filter((item) => !!item);
      if (this.numbers.length === 0) {
        alert("抽奖池为空! 请到右上角设置中添加!");
        this.numbers = [
          "陈语橙",
          "姜含笑",
          "林诗涵",
          "王思涵",
          "吴璠",
          "吴哲芸",
          "杨子萱",
          "姚奕",
          "余思琦",
          "张朔帆",
          "郑清爽",
          "郑卓妍",
          "黄睿晨",
          "蒋智航",
          "黎硕",
          "廖博远",
          "卢宝轩",
          "吕鑫磊",
          "欧阳高琦",
          "邱宇轩",
          "宋思源",
          "王毅皓",
          "谢昊卿",
          "喻梓瑞",
          "朱俊豪",
          "陈瑶",
          "陈雨茜",
          "范梓伊",
          "高菲洏",
          "郭钰涵",
          "黄佳冬",
          "李诗涵",
          "林佳怡",
          "缪琪乐",
          "倪乐怡",
          "乔锐涵",
          "沈思旋",
          "王婧赟",
          "王欣瑜",
          "陈佳航",
          "葛文恒",
          "郭航飞",
          "蒋俊浩",
          "金星宇",
          "潘宋豪",
          "孙仕鹏",
          "吴俊豪",
          "朱安盛",
          "庄正浩",
          "包恺妍",
          "曾子涵",
          "李铭惠",
          "刘忻雨",
          "刘紫易",
          "卢彦婕",
          "孟萌涵",
          "潘奕程",
          "钱泓豆",
          "汪乐怡",
          "王紫宜",
          "吴灏妍",
          "余婉伊",
          "程果",
          "高艺恒",
          "高振宇",
          "李家豪",
          "李忠轩",
          "马佳豪",
          "秦睿潇",
          "王家新",
          "王一飞",
          "王轶群",
          "严徐涵",
          "詹和玮",
          "陈欣怡",
          "陈雨萱",
          "程雨嘉",
          "黄禾和",
          "江哲涵",
          "潘梓萱",
          "沈熙妍",
          "舒煜煜",
          "王仪可",
          "吴湘芸",
          "徐慧瑄",
          "徐雨菲",
          "杨翠",
          "杨璐",
          "陈玄裕",
          "李泽豪",
          "刘嘉锐",
          "潘董俊",
          "施锦程",
          "谢守烜",
          "谢子航",
          "徐贶",
          "余子轩",
        ];
      }
    },
    readHistory() {
      const history = localStorage.getItem("history");
      if (history) this.history = JSON.parse(history);
    },
    clearp() {
      this.history = [];
      this.selectClass = [0, 0, 0, 0];
    },
    panDuanClass(stu) {
      var a1 = this.class1.findIndex((value) => value == stu);
      if (a1 != -1) this.selectClass[0]++;
      var a2 = this.class2.findIndex((value) => value == stu);
      if (a2 != -1) this.selectClass[1]++;
      var a3 = this.class3.findIndex((value) => value == stu);
      if (a3 != -1) this.selectClass[2]++;
      var a4 = this.class4.findIndex((value) => value == stu);
      if (a4 != -1) this.selectClass[3]++;
      console.log(this.selectClass);
    },
  },
  mounted() {
    this.readNumbers();
    this.readHistory();
    this.current = this.numbers[0]
      .split("")
      .map(() => "*")
      .join("");
  },
};
</script>

<style>
.back {
  background-image: url("../assets/xinnian.png");
  height: 98vh;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.table {
  width: 1000px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  /* align-items:center; */
  flex-wrap: wrap;
  color: rgb(172, 31, 55);
  font-size: 50px;
}
.current {
  margin: 30px;
  width: 700px;
  border: 5px solid brown;
  font-size: 150px;
}
.lottery {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 180px;
}
.button {
  height: 70px;
  width: 200px;
  background: brown;
  color: white;
  border: 1px solid rgb(172, 31, 55);
  font-size: 30px;
  border-radius: 20px;
  margin: 20px;
}
.stop {
  background: rgb(231, 191, 10);
  border: 1px solid rgb(231, 191, 10);
}
.tr {
  margin: 10px 10px;
}
td {
  width: 200px;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.lucky {
  font-size: 30px;
}
</style>