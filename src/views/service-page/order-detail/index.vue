<template>
  <div class="order-container">
    <template v-if="orderDetail.orderType">
      <div class="title">订单详情</div>
      <div class="order-step">
        <el-steps :active="stepActive" align-center finish-status="success" process-status="finish">
          <el-step
            v-for="item in orderDetail.nodeList"
            v-bind:key="item.event"
            :title="item.event"
            :description="item.eventTime"
          />
        </el-steps>
      </div>
      <div class="order-content">
        <el-tabs v-model="tabActive" type="border-card">
          <el-tab-pane label="订单信息" name="order">
            <div class="order-box">
              <el-row :gutter="10">
                <el-col :span="8">
                  <div class="info-item">
                    <span class="font-bold">订单类型：</span>
                    {{orderDetail.orderTypeStr}}商品
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="info-item">
                    <span class="font-bold">订单号：</span>
                    {{orderDetail.orderSn}}
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="info-item">
                    <span class="font-bold">下单时间：</span>
                    {{orderDetail.createTime}}
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="info-item">
                    <span class="font-bold">下单用户：</span>
                    {{orderDetail.buyerNickname}}
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="info-item">
                    <span class="font-bold">用户手机号：</span>
                    {{orderDetail.buyerPhone}}
                  </div>
                </el-col>
                <template>
                  <el-col :span="8">
                    <div class="info-item">
                      <span class="font-bold">支付时间：</span>
                      {{orderDetail.payTime}}
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="info-item">
                      <span class="font-bold">支付方式：</span>
                      {{orderDetail.payTypeStr}}
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="info-item">
                      <span class="font-bold">支付流水号：</span>
                      {{orderDetail.paySn}}
                    </div>
                  </el-col>
                </template>
                <template ></template>
                <el-col :span="8">
                  <div class="info-item">
                    <span class="font-bold">卖家留言：</span>
                    {{orderDetail.note || '无'}}
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="info-item">
                    <span class="font-bold">所属供应商/店铺ID：</span>
                    {{orderDetail.storeNo}}
                  </div>
                </el-col>
              </el-row>
              <div class="good-table-box">
                <el-table
                  :data="orderDetail.goodsInfo"
                  border
                  :span-method="spanMethod"
                  style="width: 100%"
                >
                  <el-table-column
                    label="商品信息"
                    width="300"
                    key="info"
                  >
                    <template slot-scope="scope">
                      <div class="flex_middle" @click="onToDetail(scope.row)">
                        <el-image
                          class="flex_fix"
                          style="width: 100px; height: 100px"
                          :src="scope.row.skuImageUrl"
                          fit="cover" 
                        />
                        <div class="row-good-title">
                          <div>{{ scope.row.goodsName }}</div>
                          <div>SKUID：{{ scope.row.skuId }}</div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="skuName"
                    label="规格"
                    width="120"
                    key="sku"
                  />
                  <el-table-column
                    label="单价"
                    width="120"
                    key="price"
                  >
                    <template slot-scope="scope">¥{{scope.row.skuSalePrice / 100}}</template>
                  </el-table-column>
                  <el-table-column
                    prop="skuNum"
                    label="数量"
                    width="60"
                    key="num"
                  />
                  <el-table-column
                    label="优惠"
                    width="120"
                    key="coupon"
                  >
                    <template>优惠券 -¥{{orderDetail.couponAmount}}</template>
                  </el-table-column>
                  <el-table-column
                    label="金额"
                    key="amount"
                  >
                    <template>
                      <div>商品总价 ¥{{orderDetail.goodsTotalAmount / 100}}</div>
                      <div>运费 ¥{{orderDetail.shippingFeeAmount / 100}}</div>
                      <div>用户实付 <span class="red-text">¥{{orderDetail.payAmount / 100}}</span></div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="订单状态"
                    width="120"
                    key="state"
                  >
                    <template>
                      <div class="order-state">{{orderDetail.statusStr}}</div>
                      <span class="order-label-text">{{orderDetail.orderTypeStr}}商品</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="flex_middle order-address">
                  <div class="order-address-text">收货人：{{orderDetail.consignee}}</div>
                  <div class="order-address-text">电话：{{orderDetail.phone}}</div>
                  <div class="order-address-text">自提地址/地址：{{orderDetail.fullAddress}}</div>
                  <!-- <div
                    class="blue-link"
                    @click="doCopy"
                    v-clipboard:copy="message"
                    v-clipboard:success="doCopy"
                    v-clipboard:error="doCopyError"
                  >复制</div> -->
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="物流信息" name="logistics">
            <div class="logistics-box">
              <div class="flex_middle logistics-address">
                <div class="order-address-text">收货人：{{orderDetail.consignee}}</div>
                <div class="order-address-text">电话：{{orderDetail.phone}}</div>
                <div class="order-address-text">自提地址/地址：{{orderDetail.fullAddress}}</div>
              </div>
              <div class="logistics-list">
                <div
                  class="logistics-item"
                  v-for="(item, index) in orderDetail.logisticsList"
                  v-bind:key="item.id"
                >
                  <div class="logistics-item-row">包裹{{index + 1}}</div>
                  <div class="logistics-item-row">
                    <span>快递公司：{{item.expressName}}</span>
                    <span>运单编号：{{item.shippingCode}}</span>
                  </div>
                  <div class="logistics-item-row">
                    <span>物流进度：{{item.lastStatus}}</span>
                    <span class="blue-link" @click="onOpenOrCloseDrawer(index)">查看更多</span>
                  </div>
                </div>
                <div class="logistics-item" v-if="!orderDetail.logisticsList || !orderDetail.logisticsList.length">暂无物流信息</div>
              </div>
            </div>
            <el-drawer
              title="物流明细"
              :visible.sync="showDrawer"
              :size="450"
              direction="rtl"
            >
              <div class="logistics-detail">
                <el-timeline>
                  <el-timeline-item
                    v-for="(item, index) in packageData.deliveryList"
                    :key="index"
                    :type="index == 0 ? 'primary' : undefined"
                    :size="index == 0 ? 'large' : undefined"
                    :timestamp="item.time">
                    {{item.content}}
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-drawer>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <el-empty v-if="noData" :image-size="200" :description="noData || '哎呀，没有找到数据！'"></el-empty>
  </div>
</template>

<script>
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import VueClipboard from 'vue-clipboard2'
import { getImgUrl } from '@/utils/tools';
import orderApi from '@/apis/order'
import { ORDER_TYPE } from '@/constant/common'

Vue.use(ElementUI);
Vue.use(VueClipboard);

export default {
  data() {
    return {
      orderDetail: {
        logisticsList: []
      },
      noData: '',
      stepActive: -1,
      // order logistics,
      tabActive: 'order',
      message: '复制文案',
      showDrawer: false,
      packageData: [],
    };
  },
  mounted() {
    const {
      query,
    } = this.$router.history.current;
    if(query.id) {
      // 1483650435852873730
      this.getOrderDetail(query.id);
    } else {
      this.noData = '暂无数据';
    }
  },
  methods: {
    getImgUrl,
    // 获取订单详情
    getOrderDetail(id) {
      orderApi.getOrderDetail({ id }).then(res => {
        if(res.code == 0 && res.success) {
          let data = res.data;
          console.log(data);
          data.nodeList.forEach(item => {
            if(!!item.eventTime) {
              this.stepActive++;
            } else {
              return ;
            }
          });
          this.orderDetail = data;
        } else {
          console.log(res)
          this.noData = res.msg;
        }
      });
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if((columnIndex == 4 || columnIndex == 5) && rowIndex == 0) {
        return [this.orderDetail.goodsInfo.length, 1];
      } else if(columnIndex == 4 || columnIndex == 5) {
        return [0, 0]
      }
    },
    onToDetail(good) {
      const {
        objectId,
        activityId,
        orderType,
        skuId,
        spuId,
      } = good;
      this.$router.push({
        path: '/web/service-page/good-detail',
        query: {
          objectId,
          activityId,
          orderType,
          skuId,
          spuId,
        }
      });
    },
    onOpenOrCloseDrawer(index) {
      this.showDrawer = !this.showDrawer;
      this.packageData = this.orderDetail.logisticsList[index];
    },
    doCopy(e) {
      e.action == 'copy' && e.text && this.$message({
        message: '复制成功！',
      });
    },
    doCopyError(e) {
      e.action == 'copy' && this.$message.error('复制失败，请重试或手动复制！');
    },
  },
};
</script>

<style lang="scss" scoped>
  .order-container {
    width: 100%;
    height: 100vh;
    background: #fff;
  }

  .title {
    font-size: 18PX;
    font-weight: 600;
    padding: 30PX 0 0 30PX;
  }

  .order-step {
    padding: 30PX 0;
  }
  .step-title {
    font-size: 14PX;
    font-weight: 600;
    margin-bottom: 6PX;
  }
  .step-time {
    font-size: 12PX;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .font-bold {
    font-weight: bold;
  }

  .order-content {
    padding: 0 30PX;
  }

  .info-item {
    font-size: 14PX;
    margin-bottom: 10PX;
  }

  .good-info-title {
    font-size: 12PX;
  }

  .row-good-title {
    padding-left: 10PX;
    word-wrap:break-word;
  }
  .red-text {
    color: red;
  }

  .order-state {
    font-weight: 600;
    font-size: 14PX;
    margin-bottom: 15PX;
  }
  .order-label-text {
    font-size: 12PX;
    color: #fff;
    line-height: 12PX;
    padding: 2PX;
    background: #F59A23;
    border-radius: 2PX;
  }
  .order-address {
    font-size: 14PX;
    padding: 10PX;
    border-right: 1PX solid #EBEEF5;
    border-bottom: 1PX solid #EBEEF5;
    border-left: 1PX solid #EBEEF5;
  }
  .order-address-text {
    margin-right: 30PX;
  }
  .blue-link {
    color: rgb(21, 170, 240);
    cursor: pointer;
    user-select: none;
  }

  .logistics-box {
    font-size: 14PX;
  }
  .logistics-address {
    padding-top: 5PX;
    padding-bottom: 15PX;
    border-bottom: 1PX solid #ccc;
  }
  .logistics-item {
    padding: 15PX 0;
  }
  .logistics-item:not(:last-child) {
    border-bottom: 1PX solid #ccc;
  }
  .logistics-item-row {
    margin-bottom: 5PX;
  }
  .logistics-item-row span{
    margin-right: 40PX;
  }

  .logistics-detail {
    padding: 0 20PX;
  }
</style>
