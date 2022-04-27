<template>
  <div>
    <div><h1>谁是幸运儿</h1></div>
    <div class="hello">
      <div class="menu">
        <el-row>
          <el-col :span="13">
            <div class="select">
              <span>请选择班级：</span>
              <el-select
                v-model="value"
                placeholder="请选择"
                @change="changeClass"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select></div
          ></el-col>
          <el-col :span="3" :offset="3">
            <el-button type="success" @click="startRun">开始</el-button></el-col
          >
          <el-col :span="3">
            <!-- <el-button type="primary" icon="el-icon-setting"
            >设置</el-button
          > -->
            <el-button size="primary" type="primary">设置</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="main">
        <el-row>
          <el-col :span="20" :offset="2" class="mainStu">
            <div
              v-for="(item, index1) in stulist"
              :key="index1"
              class="stu"
              :class="index1 == index ? 'activity' : 'stu'"
            >
              {{ item.stu }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import cherryJSON from "../../static/stu_list.json";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      options: [],
      value: "",
      stulist: [],
      index: -1, // 当前转动到哪个位置，起点位置
      count: 0, // 总共有多少个位置
      timer: 0, // 每次转动定时器
      speed: 200, // 初始转动速度
      times: 0, // 转动次数
      cycle: 30, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: -1, // 中奖位置
      click: true,
    };
  },
  created() {
    // 班级去重
    // let classList = [];
    // cherryJSON.stulist.forEach((e) => {
    //   classList.push(e.classNum);
    // });
    // classList = Array.from(new Set(classList))
    // console.log(classList)
    this.value = "初一（1）班";
    // 默认筛选1班
    let result = cherryJSON.stulist.filter(function (item) {
      return item.classNum == "初一（1）班";
    });
    this.stulist = result;
    this.options = cherryJSON.classList;
    this.count = result.length;
  },

  methods: {
    changeClass() {
      // console.log(this.value);
      let s = this.value;
      let result = cherryJSON.stulist.filter(function (item) {
        return item.classNum == s;
      });
      this.stulist = result;
      this.index = -1;
      this.count = result.length;
      // console.log(this.count)
    },
    startRun() {
      if (!this.click) {
        return;
      }
      this.speed = 200;
      this.click = false;
      this.startRoll();
    },
    // 开始转动
    startRoll() {
      this.times += 1; // 转动次数
      this.oneRoll(); // 转动过程调用的每一次转动方法，这里是第一次调用初始化

      // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
      if (this.times > this.cycle + 10 && this.prize === this.index) {
        clearTimeout(this.timer); // 清除转动定时器，停止转动
        this.prize = -1;
        this.times = 0;
        this.click = true;
      } else {
        if (this.times < this.cycle) {
          this.speed -= 10; // 加快转动速度
        } else if (this.times === this.cycle) {
          // 随机获得一个中奖位置
          // const index = parseInt(Math.random() * this.count, 0) || 0;
          const index = Math.floor(Math.random() * this.count);
          this.prize = index;
          if (this.prize > this.count - 1) {
            this.prize = this.count - 1;
          }
          // console.log(`中奖位置${this.prize}`);
        } else if (
          this.times > this.cycle + 10 &&
          ((this.prize === 0 && this.index === this.count - 1) ||
            this.prize === this.index + 1)
        ) {
          this.speed += 110;
        } else {
          this.speed += 20;
        }

        if (this.speed < 40) {
          this.speed = 40;
        }
        this.timer = setTimeout(this.startRoll, this.speed);
      }
    },
    // 每一次转动
    oneRoll() {
      let index = this.index; // 当前转动到哪个位置
      // console.log(`当前转到哪个位置${index}`);
      const count = this.count; // 总共有多少个位置
      index += 1;
      if (index > count - 1) {
        index = 0;
      }
      this.index = index;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1 {
  font-size: 50px;
}
.hello {
  width: 60%;
  border: 1px solid #fc3;
  background-color: #fc3;
  margin: 10px auto;
}
.menu {
  margin: 10px auto;
}
.main {
  margin: 10px;
  margin-bottom: 20px;
}
.mainStu {
  /* width: 90%; */
  border: 1px solid rgb(247, 246, 243);
  background-color: rgb(247, 246, 243);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* flex-direction:column; */
}
.stu {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #caccc5;
  background-color: #ccc;
  font-weight: 500;
  width: 140px;
  height: 60px;
  text-align: center;
  font-size: 25px;
  margin: 10px 10px;
  border-radius: 5%;
}
.activity {
  background-color: #a5dff9;
  border: 5px solid #fc3;
  box-shadow: 4px 4px 2px #373f41;
}
</style>
